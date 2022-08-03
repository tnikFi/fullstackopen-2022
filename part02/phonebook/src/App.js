import { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Person = ({ person, onRemove }) => <p>{person.name} {person.number} <button onClick={() => onRemove(person)}>delete</button></p>

const Contacts = ({ persons, filter, onRemove }) => <>
  <h2>Numbers</h2>
  {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person person={person} key={person.name} onRemove={onRemove} />)}
</>

const Filter = ({ filter, filterHandler }) => <div>
  filter shown with <input value={filter} onChange={filterHandler} />
</div>

const NewContactForm = ({persons, newContact, newContactHandler, nameHandler, numberHandler}) => <>
  <h2>Add a new</h2>
  <form onSubmit={newContactHandler}>
    <div>
      name: <input value={newContact.name} onChange={nameHandler} />
    </div>
    <div>
      number: <input value={newContact.number} onChange={numberHandler} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
</>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  // Get the initial contact info from the server
  useEffect(() => {contactService.getAll().then(data => setPersons(data))}, [])

  const nameInputHandler = e => {
    e.preventDefault()
    setNewContact({name: e.target.value, number: newContact.number})
  }

  const numberInputHandler = e => {
    e.preventDefault()
    setNewContact({name: newContact.name, number: e.target.value})
  }

  const newContactHandler = e => {
    e.preventDefault()
    if (persons.map(p => p.name).includes(newContact.name)) {
      alert(`${newContact.name} is already added to the phonebook`)
      setNewContact({ name: '', number: '' })
      return
    }
    contactService
      .create(newContact)
      .then(data => setPersons(persons.concat(data)))
    setNewContact({ name: '', number: '' })
  }

  const removeContactHandler = person => {
    if (!window.confirm(`Delete ${person.name}?`)) return;
    contactService
      .remove(person.id)
      .then(data => console.log(data))
    setPersons(persons.filter(p => p.id !== person.id))
  }

  const filterHandler = e => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={filterHandler} />
      <NewContactForm persons={persons} newContact={newContact} newContactHandler={newContactHandler} nameHandler={nameInputHandler} numberHandler={numberInputHandler} />
      <Contacts persons={persons} filter={filter} onRemove={removeContactHandler} />
    </div>
  )

}

export default App