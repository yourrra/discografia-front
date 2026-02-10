# AGENTS.md

Этот репозиторий — фронтенд (React 19 + Vite + TypeScript) с двумя моделями взаимодействия с одним и тем же сайтом:

1. **Terminal UI** — навигация по страницам и действия через терминал (xterm.js)
2. **Canvas UI** — полотно с узлами-страницами и переходами между ними (@xyflow/react)

Документация:

- Архитектура и правила: **docs/arch-rules.md**
- Бизнес-требования: **docs/requirements.md**

## Роли (условные "агенты" внутри проекта)

### Product/UX

- формирует сценарии, бизнес-требования и тексты
- следит за целостностью пользовательского опыта в обеих моделях (Terminal/Canvas)

### Frontend (React/TS)

- реализует UI, роутинг, состояния, i18n, PWA
- отвечает за доступность, производительность и типизацию

### Architecture/Tech Lead

- поддерживает архитектурные правила, границы модулей и контракты
- принимает решения по зависимостям/паттернам, следит за расширяемостью

## Базовые команды

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Fix lint: `npm run lint:fix`
- Format check: `npm run fmt`
- Format write: `npm run fmt:write`
- CSS lint: `npm run lint:css`
- CSS lint fix: `npm run lint:css:fix`

## Принципы изменения кода (Definition of Done)

- линтеры/форматирование проходят
- нет лишних сайд-эффектов (особенно в React lifecycle)
- страницы доступны в обеих моделях навигации (Terminal и Canvas)
- производительность не деградирует (пан/зум на Canvas, ввод/рендер в Terminal)

## Структура (рекомендованная)

- `src/app/` — инициализация приложения (providers, router, i18n, queryClient, pwa)
- `src/pages/` — страницы/экраны (TerminalShellPage, CanvasShellPage, etc.)
- `src/features/` — фичи (terminal/_, canvas/_, navigation/\*)
- `src/entities/` — доменные сущности (Page, Graph, Node) и их контракты
- `src/shared/` — UI primitives, утилиты, типы, константы
- `docs/` — документация (архитектура, требования, ADR при необходимости)
