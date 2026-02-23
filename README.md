# Nova Codenames Game

This is an interactive multiplayer Codenames game, aimed at preparing for technical interviews frontend-developers and training hard skills (JS, TS, Algorithms). There are two modes - playing in a team as a Spymaster or a field agent and playing as a field agent with AI as a Spymaster.
Being a field agent answer the various JS/TS/Front-end questions right and earn points, being a Spymaster
help your team win. You can track your progress in your Profile.

Prototype: [Classic game Codenames](<https://en.wikipedia.org/wiki/Codenames_(board_game)>)

## Development Team

- [mvavilin](https://github.com/mvavilin) Mikhail Vavilin (Lead)
- [sergey-ado](https://github.com/sergey-ado) Sergey Elsukov (Backend-Dev)
- [Peccopa](https://github.com/Peccopa) Andrey Zharkikh (Frontend-Dev)
- [Walle908](https://github.com/Walle908) Elena Valiullina (Frontend-Dev)

## Tech Stack

- TypeScript (strict mode)
- Node.js + Express + Socket.IO
- NPM Workspaces / Shared types
- Vitest
- Husky, Commintlint, lint-staged
- Eslint
- Prettier
- Tailwind

## Setup

- Clone this repository: `git clone https://github.com/mvavilin/nova`.
- Run `npm install` to install all the dependencies.

## Usage

- Once the dependencies are installed, you can run `npm run dev` to start the application.
- You will then be able to access it at localhost:5173.

## Game Rules

### Preparation

1. Nova Codenames is a game played by 4 players.
2. Players are randomly split into two teams, red and blue.
3. One player from each team is the Spymaster, the other plays as the field agent. The roles are randomly assigned.
4. During setup, 25 cards are randomly laid out in a 5x5 grid. Each card has a word (JS/TS concepts), and cards are face-up, so all players can see all words. But what is hidden is what each card represents: 9 cards represent red agents (red squares), other 9 cards represent blue agents (blue squares), one represents the assassin (black square), the rest 6 cards are innocent bystanders (beige squares).
5. Spymasters see a “map” - the board's red/blue/black/beige colors cards. Field agents see only 25 cards with words and try to guess their own.

### Game process

1. Teams take turns.
2. Each turn, one team's Spymaster gives a hint to help their field agent guess the squares with words in their team's color, while avoiding the squares intended for enemy agents, innocent bystanders, and the assassin. A hint can only be one word and a number. The number indicates how many word squares the field agents must choose in that round, and the word itself (ideally) contains a thematic clue telling the field agent which word squares to choose. For example: "Asynchrony, 3" - means 3 words related to asynchrony.
3. The field agent clicks the card following the Spymaster's hint. If the card belongs to the player's team, the word “opens” with a question, then the Check phase is mandatory - the result (point or not) is determined by the result of the check.
4. Check: the game is paused, a pop-up opens with a question for the selected word (for example: “What is the difference from sessionStorage?”, “Data volume limit?”). Depending on the room settings:
   - Self/mutual assessment mode:
     - The player enters the answer in the field and clicks “Show answer” button.
     - Everyone sees the player's answer and the right answer.
     - Then the player and his opponents evaluate the player's answer: “Right” / “Wrong” button and a point is counted only for majority chosses “Right”.
     - If the answer is wrong a point is not counted and the turn goes to the other team.

   - AI mode: the player enters the answer by text or voice (Speech-to-Text); AI evaluates the essence of the answer and decides whether to count the point or not.

5. After completing the check, the pop-up closes, the game continues (the card is already open, the point is either counted or not).
6. If the answer is right and not all round words have been guessed yet, the player continues to guess the word (you can see remaining attempts to guess).
7. If the card belongs to other team or is an innocent bystander, it isn't opened and the turn goes to the other team.
8. If the card is an assassin card, it opens and the team immediately loses and the game finishes.

### Victory

- The first team to reveal all their words wins.
- If the team chooses an assassin card - instant loss.

## Application Structure

1. **Welcome page**: Welcomes users with game information and contains 'Login' and 'Sign in' buttons.
2. **Login page**: Contains two input fields for login and password with validation for user log in.
3. **Register page**: Contains the form with name, password, email, avatar input fields with validation for registration new users. The registration is required to access the game.
4. **Lobby page**: Contains 'Play Solo with AI' button for playing in solo mode, 'Create Room' button and the input field 'Room Code' with 'Join' button and list of rooms for playing in team mode. You can join only an available (waiting) room.
5. **Room page**: Contains a list of joined players, waiting to fill room with players.
   Once the number of players 4 is reached, the players are randomly divided into 2 teams and roles are randomly assigned. The Spymasters now have a button to start the game and the game starts after both Spymaster click on this button.
6. **Game page**: Contains the room name, game field with cards, game score, message about turn, the player's role, SpyMaster hints field with the name of current SpyMaster, “Right” / “Wrong” buttons to evaluate the player's answer and timer. Depending on the the player's role it can contain input for entering SpyMaster's hint or input for entering player answers and 'Show answer' button.

7. **Solo game page**: Game with AI as a Spymaster.
8. **Result page**: Show the results of the game: the winning and losing team, a list of participating players with their roles: the spymasters earns 1 point as a master, if the their team wins, the fiels agents earns the count of their right answers. The game results are recorded into the players’ profiles.
9. **Profile page**: Contains form with info about the player with the ability to change the password or change the avatar and statistics: number of games won as a Spymasters and points earned as field agent, the current player's level (it is determined by the combination of the results of the Spymaster and field agent roles results).
