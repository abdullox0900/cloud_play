import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import './App.css'
import AddFunds from './components/AddFunds/AddFunds'
import Home from './components/Home/Home'
import MyGames from './components/MyGames/MyGames'
import Registration from './components/Registration/Registration'
import Settings from './components/Settings/Settings'
import Support from './components/Support/Support'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/add-funds' element={<AddFunds />} />
				<Route path='/my-games' element={<MyGames />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/support' element={<Support />} />
				<Route path='/logout' element={<Navigate to='/' />} />
			</Routes>
		</Router>
	)
}

export default App
