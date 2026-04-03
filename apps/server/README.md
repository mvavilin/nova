# Nova Codenames server

This is the server part of the Nova-Codenames game. The server is deployed on the resource [Render.com](https://render.com/). The deployment is accessed via https://nova-codenames-server.onrender.com.

## Instructions for installing and running on a local machine

- ### Downloading

  ```
  git clone https://github.com/mvavilin/Nova-Codenames.git
  ```

  ```
  cd Nova-Codenames/apps/server
  ```

- ### Installing NPM modules

  ```
  git checkout dev
  ```

  ```
  npm install
  ```

- ### Initial installation (Performed only for the first time)

1. Install Docker if it is not installed on your local machine (Docker Desktop for Mac or Windows or Docker Engine for Linux)
2. Launch docker
3. Install the global docker package (if not already installed)

   ```
   npm install -g docker
   ```

4. Create a .env file based on the .env.example file. Change settings if necessary.

5. Create image and run container with posgres database

   ```
   docker compose up
   ```

6. Update migration for prisma

   ```
   npm run prisma:migrate
   ```

7. Generate Prisma Client

   ```
   npm run prisma:generate
   ```

- ### Running application

  ```
  npm run dev
  ```

  **!Important** Launch the app only if the initial settings have been completed

## Work with API requests

- ### Structure of the URL for request
  The request URL must have the following structure
  ```
  {BASE_URL}{Endpoint}
  ```
  When requesting a local server, the BASE_URL will be
  ```
  http://localhost:{PORT}
  ```
  and when requesting a remote server, it will be
  ```
  https://nova-codenames-server.onrender.com
  ```
  Possible endpoints are listed below.
- ### General requests

1. **Login user**<br/>

   <details>
   - **Endpoint**

   /api/auth/login
   - **Method**

     `POST`

   - **URL Params**

     None

   - **Body Params**
     ```
       {
         "email": string;
         "password": string;
       }
     ```
   - **Success response**

     **Code 200** <br/>
     **Content**

     ```
       {
         "id": string;
         "email": string;
         "username": string;
       }
     ```

     **Headers**

     ```
     "Auth_token": string;
     ```

   - **Error response**

     **Code 400 - Fields in the body are set incorrectly**<br/>
     **Code 403 - Invalid login or password**
     </details>

2. **Register user**<br/>

   <details>
   - **Endpoint**

   /api/auth/register
   - **Method**

     `POST`

   - **URL Params**

     None

   - **Body Params**
     ```
       {
         "email": string;
         "password": string;
         "username": string;
       }
     ```
   - **Success response**

     **Code 200** <br/>
     **Content**

     ```
       {
         "id": string;
         "email": string;
         "username": string;
       }
     ```

     **Headers**

     ```
     "Auth_token": string;
     ```

   - **Error response**

     **Code 400 - Fields in the body are set incorrectly**<br/>
     **Code 409 - Email is already busy**
     </details>

- ### Additional (temporary) requests

1.  **Get all users**<br/>

    <details>
    - **Endpoint**

    /api/users
    - **Method**

      `GET`

    - **URL Params**

      None

    - **Body Params**

      None

    - **Success response**

      **Code 200** <br/>
      **Content**

      ```
        [
          {
            "id": string;
            "email": string;
            "username": string;
          }
        ]
      ```

      **Headers**

      None

    - **Error response**

          None

      </details>

2.  **Create user**<br/>

    <details>
    - **Endpoint**

    /api/users/
    - **Method**

      `POST`

    - **URL Params**

      None

    - **Body Params**
      ```
        {
          "email": string;
          "password": string;
          "username": string;
        }
      ```
    - **Success response**

      **Code 201** <br/>
      **Content**

      ```
        {
          "id": string;
          "email": string;
          "username": string;
        }
      ```

      **Headers**

      None

    - **Error response**

      **Code 400 - Fields in the body are set incorrectly**<br/>
      **Code 409 - Email is already busy**
      </details>

3.  **Get one user**<br/>

    <details>
    - **Endpoint**

    /api/users/:id
    - **Method**

      `GET`

    - **URL Params**

      `id=[integer]`

    - **Body Params**

      None

    - **Success response**

      **Code 200** <br/>
      **Content**

      ```
        {
          "id": string;
          "email": string;
          "username": string;
        }
      ```

      **Headers**

      None

    - **Error response**

      **Code 400 - URL params are set incorrectly**<br/>
      **Code 404 - User not found**
      </details>

4.  **Delete user**<br/>

    <details>
    - **Endpoint**

    /api/users/:id
    - **Method**

      `DELETE`

    - **URL Params**

      `id=[integer]`

    - **Body Params**

      None

    - **Success response**

      **Code 204** <br/>
      **Content**

      ```
        {
          "id": string;
          "email": string;
          "username": string;
        }
      ```

      **Headers**

      None

    - **Error response**

      **Code 400 - URL params are set incorrectly**<br/>
      **Code 404 - User not found**
      </details>

## Work with Socket.io

- ### Installation Socket.io on the client side

1. First options: installation after authentication

```
  const auth: Tokens = {
    auth_token,
    session_token: '',
  };
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    Constants.url,
    { auth },
  );
```

The main disadvantage is that socket.io requires an authentication token during creation.

**Important!** You must specify `Socket<ServerToClientEvents, ClientToServerEvents>` to type the data that goes to the server and back

2. Second options: install during app startup and connect after authentication (recommended)

- Declare socket.io in a separate module with auto-connect blocking

```
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    Constants.url,
    { autoConnect: false },
  );
```

- After authentication, pass the socket.io tokens and start it

```
  const auth: Tokens = {
    auth_token,
    session_token: '',
  };
  socket.auth = auth;
  socket.connect();
```

- After logging out, disable socket.io

```
  socket.disconnect();
```

- ### Socket.io methods for interacting with the server

1. Register a new handler for the given event

```
  socket.on(type, (payload) => {
    // Event handler
  });
```

2. Remove listener for event

```
  socket.off(type);
```

3. Emits an event to the socket

```
  socket.emit(type, payload);
```

- ### Messages sent to the client from the server during connection and disconnection

  **Important!** The server tracks the user's actions and status via socket.io from the moment of logging to unlogging
  - **Connection errors**
    <details>
    - Authentication errors (incorrect token). Error message: `AUTH_REQUIRED`

    ```
      socket.on('connect_error', (error) => { /.../ })
    ```

    - Parallel connection attempt. Error code: `ALREADY_ONLINE`

    ```
      socket.on('error', ({ code }) => { /.../ })
    ```

    </details>

  - **Connecting / reconnecting**
    <details>
    - A message to a user who has connected or reconnected. Transmits the user's status

    ```
      {
        type: 'session:connect';
        payload: { userStatus: UserStatus; userId: string; username: string };
      }
    ```

    - Message to users in the room (game) about the user's connection/reconnection. Passes the Player object

    ```
      { type: 'session:player-connected'; payload: { player: Player } }
    ```

    </details>

  - **Disconnecting / exit**
    <details>
    - A message to users in the room (game) that the user has disconnected. The server starts a timer (1 minute) to wait for the user to reconnect. If the user manages to reconnect, the timer is reset

    ```
      { type: 'session:player-disconnected'; payload: { player: Player } }
    ```

    - A message indicating that the timer has expired and the user has not reconnected. The server assumes that the user will not return and deletes their data. If the user logs in later, they will be taken to the Lobby

    ```
      { type: 'session:player-exit'; payload: { player: Player } }
    ```

    </details>

  - **Get the status on request from the client**
    <details>
    - Request to server

    ```
      { type: 'session:ask-status' }
    ```

    - Response to the user who sent the request

    ```
      {
        type: 'session:send-status';
        payload: { userStatus: UserStatus; userId: string; username: string };
      }
    ```

    </details>

  - **Logout**
    <details>
    - Request to server

    ```
      { type: 'session:logout' }
    ```

    - Response to users in room or game

    ```
      { type: 'session:player-exit'; payload: { player: Player } }
    ```

    - Response to users in lobby

    ```
      { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
    ```

    - Response to users in room

    ```
      { type: 'room:state'; payload: { roomInfo: RoomInfo } }
    ```

    - Response to users in game

      Not added yet

    </details>

  - **The outdated content will be removed in the future**
    <details>
    - Getting a session token

    ```
      { type: 'session:token'; payload: { sessionToken: string } }
    ```

    </details>

- ### List of events sent to the server when working with rooms (stored in the @repo/shared/src/socketEvents.ts)

  **Important!** Data is not converted to JSON for transmission to and from the server
  - **Create room and join the room**
    <details>
    - Request to server

    ```
      { type: 'room:create'; payload: { settings: RoomSettings } }
    ```

    - Response to user who sent the request

    ```
      { type: 'room:state'; payload: { roomInfo: RoomInfo } }
    ```

    - Response to all users in loggy and

    ```
      { type: 'room:created'; payload: { roomPreview: RoomPreview } }
    ```

    </details>

  - **Requesting a list of all rooms**

    <details>
    - Request to server

    ```
      { type: 'room:ask-list' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
    ```

    </details>

  - **Requesting a list of rooms with a filter by name**

    <details>
    - Request to server

    ```
      { type: 'room:search'; payload: { name: string | undefined } }
    ```

    If no room name is specified, a list of all rooms is returned
    - Response to the user who sent the request

    ```
      { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
    ```

    </details>

  - **Join a room**

    <details>
    - Request to server

    ```
      { type: 'room:join'; payload: { roomId: string } }
    ```

    - Response to the user who sent the request

    ```
      { type: 'room:state'; payload: { roomInfo: RoomInfo } }
    ```

    - Response to all users in lobby

    ```
      { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
    ```

    - Response to all users in room

    ```
      { type: 'room:player-joined'; payload: { roomInfo: RoomInfo } }
    ```

    - Response in case of an error

    ```
      { type: 'error'; payload: { code: ErrorCode } }
    ```

    This request may receive a response with codes `ROOM_NOT_FOUND` and `ROOM_FULL`. The full list of error codes is listed below

    </details>

  - **Get room state**

    <details>
    - Request to server

    ```
      { type: 'room:ask-room-info' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'room:state'; payload: { roomInfo: RoomInfo } }
    ```

    </details>

  - **Leave the room**

    <details>
    - Request to server

    ```
      { type: 'room:leave' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
    ```

    - Response to all users in lobby

    ```
      { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
    ```

    - Response to all users in room

    ```
      { type: 'room:player-left'; payload: { roomInfo: RoomInfo } }
    ```

    </details>

  - **Change the player's team and role**

    <details>
    - Request to server

    ```
      { type: 'team:change'; payload: { player: Player } }
    ```

    - Response to all users in room

    ```
      { type: 'team:changed'; payload: { roomInfo: RoomInfo } }
    ```

    - After each change in the composition of the teams in the room, the server checks the number of players in the teams. If the teams are fully staffed, the server sends a message to all users in the room

    ```
      { type: 'game:start-timer' }
    ```

    - After receiving `game:start-timer` message, each user starts a countdown timer until the game begins. After 15 seconds have passed, each user sends a message

    ```
      { type: 'game:add-player' }
    ```

    </details>

- ### List of events when working with game (stored in the @repo/shared/src/socketEvents.ts)

  **Important!** Data is not converted to JSON for transmission to and from the server
  - **Start game**

    <details>
    - When receiving a `game:add-player` message, the server adds the user to the upcoming game. After each addition, the server checks the number of players in the game. If the game is full, the server sends a message with the game details to all participants in the game

    ```
      { type: 'game:start'; payload: { gameInfo: GameInfo } }
    ```

    - If the game is not full after adding a user to the game, the user will receive a `GAME_IS_NOT_FULL` error message. However, this error can be ignored and the `game:start` message can be expected

    </details>

  - **Clue state**
    <details>
    At the beginning of the turn, the server requests a clue from spymaster by sending a message
    ```
      { type: 'game:ask-clue' }
    ```

    The server starts the control timer (30 s). The spymaster starts the visualization timer in parallel.

    The spymaster sends a clue using a message

    ```
      { type: 'game:clue-give'; payload: { clue: string } }
    ```

    The server sends the received clue to the team's agents via a message

    ```
      { type: 'game:clue-given'; payload: { clue: string } }
    ```

    If the agent does not send an answer, the turn passes to another team. The spymaster receives the message

    ```
      { type: 'game:answer-timeout' }
    ```

    and all participants in the game receive

    ```
      { type: 'game:turn-changed'; payload: { team: Teams } }
    ```

    </details>

  - **Guess state**
    <details>
    At the beginning of the guessing stage, the server starts a timer (60 seconds)

    Agents select (click) cards and send a message

    ```
      { type: 'game:card-choose'; payload: { cardId: string } }
    ```

    If the player clicks on the card again, the selection is canceled. If the player clicks on the second card, the selection of the first card is canceled (not implemented).

    After selecting a player or deselecting a player, the server sends a message to all team members

    ```
      { type: 'game:card-chosen'; payload: { cardId: string; players: Player[] } }
    ```

    When the timer expires, the server removes the timer and searches for the card with the most votes. If there are more than one such card, one is selected randomly.
    - If the team's color scheme is selected, the server randomly selects an agent from the agents who voted for the card to answer the card's question. The server then sends a message to all team members

      ```
        {
          type: 'game:ask-answer';
          payload: { word: string; question: string; question_en: string; answer: boolean };
        }
      ```

      For the responding agent, the answer parameter is true, and for other team members, it is false

    - If an opponent's color card or a neutral card is selected, the turn passes to the opponent. Team members receive message

      ```
        { type: 'game:card-shown'; payload: { cardId: string; color: CardColor } }
      ```

      and the card is opened for them. Все участники игры получают сообщение

      ```
        { type: 'game:turn-changed'; payload: { team: Teams } }
      ```

    - If a bomb is selected, the game is lost. Messages are sent to all participants with the characters

      ```
        { type: 'game:card-shown'; payload: { cardId: string; color: CardColor } }
      ```

      and

      ```
        { type: 'game:game-end'; payload: { gameEndInfo: GameEndInfo } }
      ```

      The bombRevealed field in gameEndInfo will be true

    - If no cards are selected, then (not implemented)

    </details>

  - **Answer state**
    <details>

    After sending a request to answer a card question, the server starts a timer (60 seconds)

    The agent answers the card's question by sending a message to the server

    ```
      { type: 'game:answer-give'; payload: { answer: string } }
    ```

    If the server receives a user response, it sends a message to the opposing team

    ```
      {
        type: 'game:ask-check';
        payload: { answer: string; checkQuestion: CheckQuestion; check: boolean };
      }
    ```

    If the agent did not respond, the turn passes to another team. The team members receive a message

    ```
      { type: 'game:clue-timeout' }
    ```

    and all participants in the game receive

    ```
      { type: 'game:turn-changed'; payload: { team: Teams } }
    ```

    </details>

  - **Check state**
    <details>

    After receiving a card response, the server starts a timer (60 s) and sends a message to all players on the opposing team

    ```
      {
        type: 'game:ask-check';
        payload: { answer: string; checkQuestion: CheckQuestion; check: boolean };
      }
    ```

    If check is true, the player can respond (agent), and if check is false, the player cannot respond (spymaster)

    Opponent users send messages to the server to accept or reject the response

    ```
      { type: 'game:check-give'; payload: { accept: boolean } }
    ```

    When the timer expires, the server sends a message

    ```
      { type: 'game:check-timeout' }
    ```

    to the checking players and processes the opponent's messages. If no one has voted or at least one has accepted the response, the response is counted

    If the game is not over yet, the server sends a message to all game participants about the results of checking the answer to the card question

    ```
      { type: 'game:check-results'; payload: { correct: boolean } }
    ```

    and a message about queue transfer

    ```
      { type: 'game:turn-changed'; payload: { team: Teams } }
    ```

    If the team wins, the server sends a message to all game participants

    ```
      { type: 'game:check-results'; payload: { correct: boolean } }
    ```

    and

    ```
      { type: 'game:game-end'; payload: { gameEndInfo: GameEndInfo } }
    ```

    The bombRevealed field in gameEndInfo will be true

    </details>

  - **Finish state**
    <details>
    Not implemented
    </details>

  - **Get game state**
    <details>
    - Request to server

    ```
      { type: 'game:ask-game-state' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'game:state'; payload: { gameState: GameStateForClient } }
    ```

    </details>

- ### List of events sent to the server when working with profile (stored in the @repo/shared/src/socketEvents.ts)

  **Important!** Data is not converted to JSON for transmission to and from the server
  - **Moving to a profile**

    <details>
    - Request to server

    ```
      { type: 'profile:enter' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'profile:entered'; payload: { profileInfo: ProfileInfo } }
    ```

  - **Leave a profile**

    <details>
    - Request to server

    ```
      { type: 'profile:leave' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'profile:left'; payload: { roomPreviews: RoomPreview[] } }
    ```

    </details>

  - **Ask profile info**

    <details>
    - Request to server

    ```
      { type: 'profile:ask-info' }
    ```

    - Response to the user who sent the request

    ```
      { type: 'profile:entered'; payload: { profileInfo: ProfileInfo } }
    ```

    </details>

- ### Possible error codes

    <details>

  ```
    export type ErrorCode =
      | 'PLAYER_NOT_FOUND'
      | 'ROOM_NOT_FOUND'
      | 'GAME_NOT_FOUND'
      | 'ROOM_FULL'
      | 'THERE_IS_ALREADY_SPYMASTER'
      | 'THERE_ARE_ALREADY_AGENTS'
      | 'INVALID_ACTION'
      | 'AUTH_REQUIRED'
      | 'ALREADY_ONLINE'
      | 'GAME_IS_NOT_FULL'
      | 'ACTION_IS_PROHIBITED';
  ```

    </details>

- ### List of types and interfaces for transferring data to and from the server (stored in the @repo/shared/src/types folder)

  **Important!** Data is not converted to JSON for transmission to and from the server

  <details>
  - User statuses

  ```
    type UserStatus = 'IN_LOBBY' | 'IN_ROOM' | 'IN_GAME' | 'IN_PROFILE';
  ```

  - Room settings that are transmitted to the server when a room is created

  ```
    export interface RoomSettings {
      name: string;
      maxPlayers: number;
    }
  ```

  - Room statuses

  ```
    export type RoomStatus = 'waiting' | 'playing' | 'finishing';
  ```

  - Reduced information about the room for display on the Lobby page

  ```
    export interface RoomPreview {
      id: string;
      name: string;
      maxPlayers: number;
      playerCount: number;
      status: RoomStatus;
    }
  ```

  - Team types

  ```
    export type Teams = 'red' | 'blue' | 'choosing';
  ```

  - Role types

  ```
    export type Roles = 'spymaster' | 'agent' | 'choosing';
  ```

  - Card colors

  ```
    export type CardColor = 'red' | 'blue' | 'neutral' | 'bomb' | 'unknown';
  ```

  - Card statuses

  ```
    export type CardStatus = 'hidden' | 'revealed';
  ```

  - Player information for display on the Room page

  ```
    export type Player = {
      userId: string;
      username: string;
      team: Team;
      rome: Role;
    };
  ```

  - Room Information

  ```
    export interface RoomInfo {
      id: string;
      name: string;
      maxPlayers: number;
      playerCount: number;
      redPlayers: Player[];
      bluePlayers: Player[];
      choosingPlayers: Player[];
    }
  ```

  - Card

  ```
    export interface Card {
      id: string;
      word: string;
      color: CardColor;
      status: CardStatus;
    }
  ```

  - Game information

  ```
    export interface GameInfo {
      redTeam: Player[];
      blueTeam: Player[];
      currentTeam: Teams;
      cards: Card[];
    }
  ```

  - Game score

  ```
    export type Score = {
      red: number;
      blue: number;
    };
  ```

  - Game end information

  ```
    export interface GameEndInfo {
      winningTeam: Teams;
      win: boolean;
      bombRevealed: boolean;
      score: Score;
      time: number;
      redPlayerScores: PlayerScore[];
      bluePlayerScores: PlayerScore[];
    }
  ```

  - Chosen card

  ```
    export interface ChosenCard {
      cardId: string;
      players: Player[];
    }
  ```

  - Guess phase information

  ```
    export interface GuessPhaseInfo {
      chosenCards: ChosenCard[];
    }
  ```

  - Answer phase information

  ```
    export interface AnswerPhaseInfo {
      word: string;
      question: string;
      question_en: string;
    }
  ```

  - Check phase information

  ```
    export interface CheckPhaseInfo {
      word: string;
      question: string;
      question_en: string;
      referenceAnswer: string;
      referenceAnswer_en: string;
    }
  ```

  - Finish phase information

  ```
    export interface FinishPhaseInfo {
      gameEndInfo: GameEndInfo;
    }
  ```

  - Game phase information

  ```
    export interface GamePhaseInfo {
      guessPhaseInfo: GuessPhaseInfo | null;
      answerPhaseInfo: AnswerPhaseInfo | null;
      checkPhaseInfo: CheckPhaseInfo | null;
      finishPhaseInfo: FinishPhaseInfo | null;
    }
  ```

  - Game state for client during reconnect

  ```
    export type GameStateForClient = {
      id: string;
      cards: Card[];
      currentTeam: Teams;
      isSpymaster: boolean;
      redTeam: Player[];
      blueTeam: Player[];
      gamePhase: GAME_PHASE;
      gameTime: number;
      phaseTime: number;
      score: Score;
      gamePhaseInfo: GamePhaseInfo;
    };
  ```

  </details>
