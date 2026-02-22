# Nova Codenames Game

This is an interactive multiplayer Codenames game, aimed at preparing for technical interviews frontend-developers and training hard skills (JS, TS, Algorithms). There are two modes - playing in a team as a Spymaster or a field agent and playing as a field agent with AI as a Spymaster.
Being a field agent answer the various JS/TS/Front-end questions right and earn points, being a Spymaster
help your team win. You can track your progress in your Profile.

Prototype: [Classic game Codenames](<https://en.wikipedia.org/wiki/Codenames_(board_game)>)

## Development Team

- [Mikhail Vavilin](https://github.com/mvavilin) (Lead)
- [Sergey Elsukov](https://github.com/sergey-ado) (Backend-Dev)
- [Andrey Zharkikh](https://github.com/Peccopa) (Frontend-Dev)
- [Elena Valiullina](https://github.com/Walle908) (Frontend-Dev)

<details><summary><strong>Meeting Notes</strong></summary>

- [15.02.2026]()

- [17.02.2026]()

- [20.02.2026]()

- [22.02.2026]()

</details>

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

<details><summary>Turborepo</summary>

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)

</details>
