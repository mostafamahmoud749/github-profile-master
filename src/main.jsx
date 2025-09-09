import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './comp/App.jsx'
import "./css/normalize.css"

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
