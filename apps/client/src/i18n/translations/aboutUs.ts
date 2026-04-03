import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const aboutUs = {
  [Language.EN]: {
    [TranslationKeys.ABOUT_US_TITLE]: 'NOVA DEVELOPMENT TEAM',

    [TranslationKeys.ABOUT_US_INTRO_P1]:
      'Four developers, one monorepo, and a lot of decisions made the hard way.',
    [TranslationKeys.ABOUT_US_INTRO_P2]:
      'What started as an empty repo turned into a real-time game with custom architecture and zero frameworks.',

    [TranslationKeys.ABOUT_US_HIGHLIGHTS_TITLE]: 'What we built',
    [TranslationKeys.ABOUT_US_HIGHLIGHTS_LIST]: `
• Monorepo with frontend and backend
• Pure TypeScript — no frameworks, no shortcuts
• Real-time gameplay via WebSocket
• Custom architecture (ComponentsAPI, StateAPI)
`,

    [TranslationKeys.ABOUT_US_MIKHAIL_TITLE]: 'Mikhail Vavilin (Lead)',
    [TranslationKeys.ABOUT_US_MIKHAIL_LIST]: `
• Application architecture design
• Monorepo setup (Turborepo)
• Routing implementation in pure TypeScript
• Game concept design
• Design system (Figma, Tailwind)
• Deployment (Render, Vercel)
• Code review & team coordination
`,

    [TranslationKeys.ABOUT_US_SERGEY_TITLE]: 'Sergey Elsukov (Backend)',
    [TranslationKeys.ABOUT_US_SERGEY_LIST]: `
• Backend with Express + Socket.IO
• Authentication (JWT, login/register)
• PostgreSQL & Docker setup
• Data validation (zod)
• Game room management
• Socket message typing
• CORS & server monitoring
`,

    [TranslationKeys.ABOUT_US_ELENA_TITLE]: 'Elena Valiullina (Frontend)',
    [TranslationKeys.ABOUT_US_ELENA_LIST]: `
• Registration page (multiple iterations)
• Form validation
• JWT & session storage handling
• Backend API integration
• UI/UX and visual design
• Adapting to evolving architecture
`,

    [TranslationKeys.ABOUT_US_ANDREY_TITLE]: 'Andrey Zharkikh (Frontend)',
    [TranslationKeys.ABOUT_US_ANDREY_LIST]: `
• ComponentsAPI (10+ components)
• BaseComponent decomposition (Facade / SRP)
• StateAPI implementation (Redux-like)
• Reactive approach (afterware)
• Middleware for StateAPI
• i18n implementation
• Frontend tooling (Husky, lint-staged)
`,
  },

  [Language.RU]: {
    [TranslationKeys.ABOUT_US_TITLE]: 'NOVA DEVELOPMENT TEAM',

    [TranslationKeys.ABOUT_US_INTRO_P1]:
      'Четыре разработчика, один монорепозиторий и десятки решений, принятых не самым простым способом.',
    [TranslationKeys.ABOUT_US_INTRO_P2]:
      'От пустого репозитория до real-time игры с собственной архитектурой и без единого фреймворка.',

    [TranslationKeys.ABOUT_US_HIGHLIGHTS_TITLE]: 'Что мы построили',
    [TranslationKeys.ABOUT_US_HIGHLIGHTS_LIST]: `
• Монорепозиторий с frontend и backend
• Чистый TypeScript — без фреймворков
• Real-time взаимодействие через WebSocket
• Собственная архитектура (ComponentsAPI, StateAPI)
`,

    [TranslationKeys.ABOUT_US_MIKHAIL_TITLE]: 'Mikhail Vavilin (Lead)',
    [TranslationKeys.ABOUT_US_MIKHAIL_LIST]: `
• Проектирование архитектуры приложения
• Настройка монорепозитория (Turborepo)
• Реализация роутинга на чистом TypeScript
• Проработка концепции игры
• Дизайн системы (Figma, Tailwind)
• Деплой (Render, Vercel)
• Code review и координация команды
• Разработка фронтенда Lobby: создание комнаты, присоединение по ID, поиск по названию, вступление из списка комнат
• Разработка фронтенда Game: компоненты лог-чата, таймеров, счета, информации об игроках, игровая доска с карточками, модальные окна (ввод ответа, оценка ответа, результаты игры)
`,

    [TranslationKeys.ABOUT_US_SERGEY_TITLE]: 'Sergey Elsukov (Backend)',
    [TranslationKeys.ABOUT_US_SERGEY_LIST]: `
• Backend на Express + Socket.IO
• Реализация авторизации (JWT, login/register)
• Работа с PostgreSQL и Docker
• Валидация данных (zod)
• Менеджер игровых комнат
• Типизация socket-сообщений
• CORS и мониторинг сервера
`,

    [TranslationKeys.ABOUT_US_ELENA_TITLE]: 'Elena Valiullina (Frontend)',
    [TranslationKeys.ABOUT_US_ELENA_LIST]: `
• Реализация страницы регистрации (несколько итераций)
• Валидация форм
• Работа с JWT и session storage
• Интеграция с backend API
• UI/UX и визуальный дизайн
• Адаптация под evolving архитектуру
`,

    [TranslationKeys.ABOUT_US_ANDREY_TITLE]: 'Andrey Zharkikh (Frontend)',
    [TranslationKeys.ABOUT_US_ANDREY_LIST]: `
• Разработка ComponentsAPI (10+ компонентов)
• Декомпозиция BaseComponent (Facade / SRP)
• Реализация StateAPI (аналог Redux)
• Переход на реактивную модель (afterware)
• Middleware для StateAPI
• i18n (переключение языков)
• Инфраструктура фронтенда (Husky, lint-staged)
`,
  },
};

export default aboutUs;
