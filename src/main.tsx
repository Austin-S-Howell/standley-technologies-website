import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'

// Upright weight axis only (drops bundled italics). Subsets are unicode-range
// gated, so a visitor still only downloads the Latin woff2.
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import './styles/index.css'

import App from './App'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root not found')

createRoot(rootEl).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LazyMotion features={domAnimation}>
          <App />
        </LazyMotion>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
