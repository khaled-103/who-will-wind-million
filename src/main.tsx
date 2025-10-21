import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home'
import Game from './pages/Game'
import { SoundContextProvider } from './components/providers/SoundContextProvider'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<SoundContextProvider/>}>
          <Route index element={<Home />} />
          <Route path='/new-game' element={<Game />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </>,
)
