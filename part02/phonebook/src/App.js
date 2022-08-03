import { useState, useEffect } from 'react'
import contactService from './services/contacts'

import Contacts from './components/Contacts'
import NewContactForm from './components/NewContactForm'
import Message from './components/Message'

const Filter = ({ filter, filterHandler }) => <div>
	filter shown with <input value={filter} onChange={filterHandler} />
</div>

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [alert, setAlert] = useState({text: '', color: null})

	// Get the initial contact info from the server
	useEffect(() => {contactService.getAll().then(data => setPersons(data))}, [])

	const filterHandler = e => {
		e.preventDefault()
		setFilter(e.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Message message={alert.text} color={alert.color} />
			<Filter filter={filter} filterHandler={filterHandler} />
			<NewContactForm persons={persons} setPersons={setPersons} setAlert={setAlert} />
			<Contacts persons={persons} setPersons={setPersons} filter={filter} setAlert={setAlert} />
		</div>
	)
}

export default App