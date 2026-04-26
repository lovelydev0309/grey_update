import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SiteLayout from './layout/SiteLayout'
import {
  AboutPage,
  HomePage,
  IdeaDetailPage,
  IdeasPage,
  LegalPage,
  LocationsPage,
  NewsPage,
  NotFoundPage,
  PodcastsPage,
} from './pages/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'ideas', element: <IdeasPage /> },
      { path: 'ideas/:slug', element: <IdeaDetailPage /> },
      { path: 'locations', element: <LocationsPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'podcasts', element: <PodcastsPage /> },
      { path: 'legal', element: <LegalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
