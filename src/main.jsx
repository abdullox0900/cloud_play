import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import './i18n/i18n.js'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
)
