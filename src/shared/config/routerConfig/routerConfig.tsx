import { createBrowserRouter, type RouteProps } from 'react-router'

import { Desktop } from '@/pages/Desktop'
import { Finder } from '@/pages/Finder'

export enum AppRoutes {
  DESKTOP = 'desktop',
  NOT_FOUND = 'not_found',
  FINDER = 'finder',
  FINDER_MAIN = 'finder_main',
  FINDER_MAIN_TSHIRTS = 'finder_main_tshirts',
  FINDER_MAIN_MUSICS = 'finder_main_musics',
  FINDER_ABOUT = 'finder_about',
  FINDER_INFO = 'finder_info',
  FINDER_CONTENT = 'finder_content',
  FINDER_SCENE = 'finder_scene',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DESKTOP]: '/',
  [AppRoutes.NOT_FOUND]: '/*',
  [AppRoutes.FINDER]: '/finder',
  [AppRoutes.FINDER_MAIN]: '/finder/main',
  [AppRoutes.FINDER_MAIN_TSHIRTS]: '/finder/main/tshits',
  [AppRoutes.FINDER_MAIN_MUSICS]: '/finder/main/musics',
  [AppRoutes.FINDER_ABOUT]: '/finder/about',
  [AppRoutes.FINDER_INFO]: '/finder/info',
  [AppRoutes.FINDER_CONTENT]: '/finder/content',
  [AppRoutes.FINDER_SCENE]: '/finder/scene',
}

export const routerConfig = createBrowserRouter([
  {
    path: RoutePath.desktop,
    element: <Desktop />,
    errorElement: <div>ERROR!!!!!!!!!</div>,
    children: [
      {
        path: RoutePath.finder,
        element: <Finder />,
        children: [
          {
            path: RoutePath.finder_main,
            element: <div>finder_main</div>,
            children: [
              {
                path: RoutePath.finder_main_tshirts,
                element: <div>finder_main_tshirts</div>,
              },
              {
                path: RoutePath.finder_main_musics,
                element: <div>finder_main_musics</div>,
              },
            ],
          },
          { path: RoutePath.finder_about, element: <div>finder_about</div> },
          { path: RoutePath.finder_info, element: <div>finder_info</div> },
          { path: RoutePath.finder_content, element: <div>finder_content</div> },
          { path: RoutePath.finder_scene, element: <div>finder_scene</div> },
        ],
      },
    ],
  },
])
