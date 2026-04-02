import type { Socket } from 'socket.io';
import type {
  CardTestResult,
  CheckResults,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import { roomManager, socketIdMap } from './sessionHandlers.ts';
import { io } from '../../app.ts';
import { logger } from '../logger/logger.ts';
import type { SocketData } from '../../types/types.ts';
import type { Game } from '../../rooms/game.ts';
import type { Teams } from '../../../../../packages/shared/src/types/room.ts';

export function setupGameHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  setupGameAddPlayerHandler(socket);
  setupClueGiveHandler(socket);
  setupCardChooseHandler(socket);
  setupAnswerGiveHandler(socket);
  setupCheckGiveHandler(socket);
  setupGameStateHandler(socket);
}

function setupGameAddPlayerHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('game:add-player', () => {
    const response = roomManager.addPlayerToGame(userId);
    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { game } = response;

      const playerIds = game.getPlayerIds();

      for (const playerId of playerIds) {
        const socketId = socketIdMap.get(playerId);
        if (socketId) {
          io.to(socketId).emit('game:start', { gameInfo: game.getGameInfo(playerId) });
          logger.emit(playerId, 'game:start', { gameInfo: game.getGameInfo(playerId) });
        }
      }

      startClueState(game);
    }
  });
}

function startClueState(game: Game): void {
  const spymasterId = game.askClue((team) => {
    if (spymasterId) {
      const socketId = socketIdMap.get(spymasterId);
      if (socketId) {
        io.to(socketId).emit('game:clue-timeout');
        logger.emit(spymasterId, 'game:clue-timeout');
      }
    }

    turnChange(game, team);

    startClueState(game);
  });

  if (spymasterId) {
    const socketId = socketIdMap.get(spymasterId);
    if (socketId) {
      io.to(socketId).emit('game:ask-clue');
      logger.emit(spymasterId, 'game:ask-clue');
    }
  }
}

function turnChange(game: Game, team: Teams): void {
  const playerIds = game.getPlayerIds();
  for (const playerId of playerIds) {
    const socketId = socketIdMap.get(playerId);
    if (socketId) {
      io.to(socketId).emit('game:turn-changed', { team });
      logger.emit(playerId, 'game:turn-changed', { team });
    }
  }
}

function setupClueGiveHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('game:clue-give', ({ clue }) => {
    const game = roomManager.getGameByUserId(userId);

    if (game) {
      const response = game.giveClue(userId, clue, (result) => {
        guessCallback(game, result);
      });
      if (!('error' in response)) {
        const { clue, agentIds } = response;
        for (const agentId of agentIds) {
          const socketId = socketIdMap.get(agentId);
          if (socketId) {
            io.to(socketId).emit('game:clue-given', { clue });
            logger.emit(agentId, 'game:clue-given', { clue });
          }
        }
      }
    }
  });
}

function guessCallback(game: Game, result: CardTestResult): void {
  const { type } = result;
  switch (type) {
    case 'own': {
      guessOwnCardCallback(game, result);
      break;
    }
    case 'alien': {
      guessAlienCardCallback(game, result);
      break;
    }
    case 'bomb': {
      guessBombCardCallback(game, result);
      break;
    }
    case 'no-change': {
      guessNoChangeCallback(game, result);
      break;
    }
  }
}

function guessOwnCardCallback(game: Game, result: CardTestResult & { type: 'own' }): void {
  const { payload } = result;
  const { userId, question, question_en, card, score, playerIds } = payload;
  const { word, color, id: cardId } = card;

  const allPlayerIds = game.getPlayerIds();
  for (const playerId of allPlayerIds) {
    const socketId = socketIdMap.get(playerId);
    if (socketId) {
      io.to(socketId).emit('game:card-shown', { cardId, color });
      logger.emit(playerId, 'game:card-shown', { cardId, color });
      io.to(socketId).emit('game:send-score', { score });
      logger.emit(playerId, 'game:send-score', { score });
    }
  }

  for (const playerId of playerIds) {
    const socketId = socketIdMap.get(playerId);
    if (socketId) {
      const answer = playerId === userId;
      io.to(socketId).emit('game:ask-answer', { word, question, question_en, answer });
      logger.emit(playerId, 'game:ask-answer', { word, question, question_en, answer });
    }
  }
  game.startAnswerPhase((team) => {
    for (const playerId of playerIds) {
      const socketId = socketIdMap.get(playerId);
      if (socketId) {
        io.to(socketId).emit('game:answer-timeout');
        logger.emit(playerId, 'game:answer-timeout');
      }
    }
    turnChange(game, team);
  });
}

function guessAlienCardCallback(game: Game, result: CardTestResult & { type: 'alien' }): void {
  const { payload } = result;
  const { spymasterId, team, cardId, color, recipients } = payload;
  for (const recipient of recipients) {
    const socketId = socketIdMap.get(recipient);
    if (socketId) {
      io.to(socketId).emit('game:card-shown', { cardId, color });
      logger.emit(recipient, 'game:card-shown', { cardId, color });
    }
  }
  const socketId = socketIdMap.get(spymasterId);
  if (socketId) {
    io.to(socketId).emit('game:ask-clue');
    logger.emit(spymasterId, 'game:ask-clue');
  }
  turnChange(game, team);
}

function guessBombCardCallback(game: Game, result: CardTestResult & { type: 'bomb' }): void {
  const { payload } = result;
  const { cardId, color, gameEndInfo, winPlayerIds } = payload;
  const playerIds = game.getPlayerIds();
  for (const playerId of playerIds) {
    const socketId = socketIdMap.get(playerId);
    if (socketId) {
      io.to(socketId).emit('game:card-shown', { cardId, color });
      logger.emit(playerId, 'game:card-shown', { cardId, color });
      const win = winPlayerIds.includes(playerId);
      io.to(socketId).emit('game:game-end', { gameEndInfo: { ...gameEndInfo, win } });
      logger.emit(playerId, 'game:game-end', { gameEndInfo: { ...gameEndInfo, win } });
    }
  }
}

function guessNoChangeCallback(game: Game, result: CardTestResult & { type: 'no-change' }): void {
  const { payload } = result;
  const { spymasterId, team, playerIds } = payload;
  const socketId = socketIdMap.get(spymasterId);
  if (socketId) {
    io.to(socketId).emit('game:ask-clue');
    logger.emit(spymasterId, 'game:ask-clue');
  }
  for (const playerId of playerIds) {
    const socketId = socketIdMap.get(playerId);
    if (socketId) {
      io.to(socketId).emit('game:check-timeout');
      logger.emit(playerId, 'game:check-timeout');
    }
  }
  turnChange(game, team);
}

function setupCardChooseHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('game:card-choose', ({ cardId }) => {
    const game = roomManager.getGameByUserId(userId);
    if (game) {
      const response = game.chooseCard(userId, cardId);
      if (!('error' in response)) {
        const { players, recipients } = response;
        for (const recipient of recipients) {
          const socketId = socketIdMap.get(recipient);
          if (socketId) {
            io.to(socketId).emit('game:card-chosen', { cardId, players });
            logger.emit(recipient, 'game:card-chosen', { cardId, players });
          }
        }
        game.startCheckPhase((results) => {
          sendResults(game, results);
        });
      }
    }
  });
}

function setupAnswerGiveHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('game:answer-give', ({ answer }) => {
    const game = roomManager.getGameByUserId(userId);
    if (game) {
      const response = game.giveAnswer(userId, answer);
      if (!('error' in response)) {
        const { answer, checkQuestion, spymasterId, playerIds } = response;
        for (const playerId of playerIds) {
          const check = playerId !== spymasterId;
          const socketId = socketIdMap.get(playerId);
          if (socketId) {
            io.to(socketId).emit('game:ask-check', { answer, checkQuestion, check });
            logger.emit(playerId, 'game:ask-check', { answer, checkQuestion, check });
          }
        }
      }
    }
  });
}

function setupCheckGiveHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('game:check-give', ({ accept }) => {
    const game = roomManager.getGameByUserId(userId);
    if (game) {
      game.giveCheck(userId, accept);
    }
  });
}

function sendResults(game: Game, results: CheckResults): void {
  const { type, payload } = results;
  if (type === 'turn-end') {
    const playerIds = game.getPlayerIds();
    const { correct, team } = payload;
    for (const playerId of playerIds) {
      const socketId = socketIdMap.get(playerId);
      if (socketId) {
        io.to(socketId).emit('game:check-results', { correct });
        logger.emit(playerId, 'game:check-results', { correct });

        io.to(socketId).emit('game:turn-changed', { team });
        logger.emit(playerId, 'game:turn-changed', { team });
      }
    }
  }

  if (type === 'game-end') {
    const playerIds = game.getPlayerIds();
    const { gameEndInfo, winPlayerIds } = payload;
    for (const playerId of playerIds) {
      const socketId = socketIdMap.get(playerId);
      if (socketId) {
        io.to(socketId).emit('game:check-results', { correct: false });
        logger.emit(playerId, 'game:check-results', { correct: false });
        const win = winPlayerIds.includes(playerId);
        io.to(socketId).emit('game:game-end', { gameEndInfo: { ...gameEndInfo, win } });
        logger.emit(playerId, 'game:game-end', { gameEndInfo: { ...gameEndInfo, win } });
      }
    }
  }
}

function setupGameStateHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('game:ask-game-state', () => {
    const game = roomManager.getGameByUserId(userId);
    if (game) {
      const gameState = game.getGameStateForClient(userId);
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('game:state', { gameState });
        logger.emit(userId, 'game:state', { gameState });
      }
    }
  });
}
