# 🎮 Nova Codenames Game

**Nova Codenames Game** – это многопользовательская игра для подготовки к техническим собеседованиям, где классическая механика Codenames сочетается с проверкой знаний по JavaScript, TypeScript и фронтенду.

Игроки делятся на две команды (красную и синюю) в формате 2×2, 3×3 или 4×4. В каждой команде один капитан дает ассоциативные подсказки, а остальные – полевые агенты, которые угадывают слова на игровом поле 5×5.

После выбора карточки своей команды наступает фаза проверки знаний: выбранный случайным образом оперативник отвечает на вопрос по концепту, а команда соперников оценивает ответ кнопками «Зачтено» или «Не зачтено». Очко засчитывается только при положительной оценке.

Игра завершается победой команды, которая первой раскроет все свои карточки-агенты. Если команда открывает карточку убийцы (бомбу), она мгновенно проигрывает. Также возможно техническое поражение при потере всех оперативников или капитана.

## 🎬 Демо-видео

[![YouTube](https://img.shields.io/badge/Демо_видео-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/Thb_HHRJmCc)

## 🚀 Деплой

[![Vercel](https://img.shields.io/badge/Nova_Codenames_Game-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nova-codenames-client.vercel.app/)

## ▶️ Запуск приложения

- Клонируйте этот репозиторий:

```
git clone https://github.com/mvavilin/nova
```

- Зайдите в папку `Nova-Codenames` и чтобы установить все зависимости, запустите:

```
npm install
```

- После установки зависимостей, запустите приложение:

```
npm run dev
```

- После этого вы сможете получить к нему доступ по адресу `localhost:5173`.

## ▶️ Запуск сервера

- Запуск сервера на локальной машине описан в файле [Nova Codenames server](https://github.com/mvavilin/Nova-Codenames/blob/main/apps/server/README.md).
  Для локальной работы с сервером следует изменить ServerUrl.DEPLOY_BASE на ServerUrl.LOCAL_BASE в файлах [form.fetcher.middleware.ts](https://github.com/mvavilin/Nova-Codenames/blob/main/apps/client/src/store/middlewares/form.fetcher.middleware.ts) и [SocketClient.ts](https://github.com/mvavilin/Nova-Codenames/blob/main/apps/client/src/api/SocketClientAPI/SocketClient.ts).

## 🛠️ Технологии

| Категория           | Технологии                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Язык**            | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                                                                                                                  |
| **Фронтенд**        | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                                                                                 |
| **Бэкенд**          | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)                                                                                                |
| **Real-time**       | ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)                                                                                                                                                                                                   |
| **База данных**     | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)                                                                                            |
| **Монорепозиторий** | ![Turbo](https://img.shields.io/badge/Turbo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white) ![NPM Workspaces](https://img.shields.io/badge/NPM_Workspaces-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                          |
| **Тестирование**    | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)                                                                                                                                                                                                              |
| **Качество кода**   | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=git&logoColor=white) |
| **Безопасность**    | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![Argon2](https://img.shields.io/badge/Argon2-FF6B6B?style=for-the-badge)                                                                                                                                   |
| **Валидация**       | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)                                                                                                                                                                                                                       |

## 👥 Команда разработки

<div align="center">

|                                     <img src="https://avatars.githubusercontent.com/mvavilin?s=120&v=4" width="100" height="100" style="border-radius: 50%;">                                     |                                    <img src="https://avatars.githubusercontent.com/sergey-ado?s=120&v=4" width="100" height="100" style="border-radius: 50%;">                                     |                                    <img src="https://avatars.githubusercontent.com/Peccopa?s=120&v=4" width="100" height="100" style="border-radius: 50%;">                                     |                                    <img src="https://avatars.githubusercontent.com/Walle908?s=120&v=4" width="100" height="100" style="border-radius: 50%;">                                    |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                        **Mikhail Vavilin**                                                                                        |                                                                                         **Sergey Elsukov**                                                                                         |                                                                                       **Andrey Zharkikh**                                                                                       |                                                                                      **Elena Valiullina**                                                                                       |
|                                                                                              _Lead_                                                                                               |                                                                                             _Backend_                                                                                              |                                                                                           _Frontend_                                                                                            |                                                                                           _Frontend_                                                                                            |
|                              [![GitHub](https://img.shields.io/badge/-mvavilin-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin)                              |                            [![GitHub](https://img.shields.io/badge/-sergey--ado-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sergey-ado)                            |                              [![GitHub](https://img.shields.io/badge/-Peccopa-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Peccopa)                              |                             [![GitHub](https://img.shields.io/badge/-Walle908-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Walle908)                             |
| [![GitHub](https://img.shields.io/badge/Дневник_Mikhail-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/tree/main/development-notes/mvavilin) | [![GitHub](https://img.shields.io/badge/Дневник_Sergey-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/tree/main/development-notes/sergey-ado) | [![GitHub](https://img.shields.io/badge/Дневник_Andrey-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/tree/main/development-notes/peccopa) | [![GitHub](https://img.shields.io/badge/Дневник_Elena-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/tree/main/development-notes/walle908) |

</div>

## 📌 Доска

[![GitHub](https://img.shields.io/badge/GitHub_Projects-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/users/mvavilin/projects/1)

<div align="center">
  <img
    src="https://github.com/user-attachments/assets/7cb3f870-751a-4fcf-9077-c9457ca3d396"
    alt="Доска проекта Nova Codenames"
    width="800"
  />
</div>

Лучшие PR (3-4 PR с содержательным code review)
Meeting Notes (ссылки на 3+ записей)

## 🔥 Лучшие пул-реквесты

[![GitHub](https://img.shields.io/badge/PR_№119-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/119)
[![GitHub](https://img.shields.io/badge/PR_№75-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/75)
[![GitHub](https://img.shields.io/badge/PR_№55-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/55)
[![GitHub](https://img.shields.io/badge/PR_№42-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/42)
[![GitHub](https://img.shields.io/badge/PR_№36-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/36)
[![GitHub](https://img.shields.io/badge/PR_№38-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/38)

## 📝 Записи встреч

[![GitHub](https://img.shields.io/badge/Все_записи_встреч-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/tree/main/meeting-notes)
[![GitHub](https://img.shields.io/badge/24.02.2026-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/blob/main/meeting-notes/meeting-notes-2026-02-24.md)
[![GitHub](https://img.shields.io/badge/03.03.2026-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/blob/main/meeting-notes/meeting-notes-2026-03-03.md)
[![GitHub](https://img.shields.io/badge/24.03.2026-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/blob/main/meeting-notes/meeting-notes-2026-03-24.md)

## 📋 Самооценка

**Pull Requests:**

[![GitHub](https://img.shields.io/badge/Mikhail_Vavilin-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/216)
[![GitHub](https://img.shields.io/badge/Elena_Valiullina-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/218)
[![GitHub](https://img.shields.io/badge/Andrey_Zharkikh-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/pull/205)

**Файлы:**

[![GitHub](https://img.shields.io/badge/self--assessment_mvavilin-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/blob/main/development-notes/mvavilin/self-assessment.md)
[![GitHub](https://img.shields.io/badge/self--assessment_peccopa-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/blob/main/development-notes/peccopa/self-assessment.md)
[![GitHub](https://img.shields.io/badge/self--assessment_walle908-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin/Nova-Codenames/blob/main/development-notes/walle908/self-assessment.md)

```

```
