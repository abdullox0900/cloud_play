import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import { isAuthenticated, logoutUser } from './api/user'
import './App.css'
import AddFunds from './components/AddFunds/AddFunds'
import GameDetail from './components/GameDetail/GameDetail'
import Home from './components/Home/Home'
import Info from './components/Info/Info'
import Login from './components/Login/Login'
import MyGames from './components/MyGames/MyGames'
import Profile from './components/Profile/Profile'
import Registration from './components/Registration/Registration'
import Settings from './components/Settings/Settings'
import Support from './components/Support/Support'
import Toolbar from './components/Toolbar/Toolbar'

// Logout component to handle logout
const LogoutHandler = () => {
	useEffect(() => {
		logoutUser()
	}, [])

	return <Navigate to='/login' />
}

function App() {
	const { i18n } = useTranslation()
	const [isAuth, setIsAuth] = useState(isAuthenticated())

	// Check authentication status when component mounts
	useEffect(() => {
		// Set initial auth state
		setIsAuth(isAuthenticated())

		// Add event listener for storage changes (for when login/logout happens in another tab)
		const handleStorageChange = () => {
			setIsAuth(isAuthenticated())
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	// Initialize language from localStorage if available
	useEffect(() => {
		const savedLanguage = localStorage.getItem('preferredLanguage')
		if (savedLanguage) {
			i18n.changeLanguage(savedLanguage)
		}
	}, [i18n])

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/game/:id' element={<GameDetail />} />
				<Route
					path='/login'
					element={isAuth ? <Navigate to='/' /> : <Login />}
				/>
				<Route
					path='/register'
					element={isAuth ? <Navigate to='/' /> : <Registration />}
				/>
				<Route path='/registration' element={<Navigate to='/register' />} />
				<Route
					path='/add-funds'
					element={isAuth ? <AddFunds /> : <Navigate to='/login' />}
				/>
				<Route
					path='/my-games'
					element={isAuth ? <MyGames /> : <Navigate to='/login' />}
				/>
				<Route
					path='/settings'
					element={isAuth ? <Settings /> : <Navigate to='/login' />}
				/>
				<Route
					path='/support'
					element={isAuth ? <Support /> : <Navigate to='/login' />}
				/>
				<Route
					path='/profile'
					element={isAuth ? <Profile /> : <Navigate to='/login' />}
				/>
				<Route path='/info' element={<Info />} />
				<Route path='/logout' element={<LogoutHandler />} />
			</Routes>
			<Toolbar />
		</Router>
	)
}

export default App
