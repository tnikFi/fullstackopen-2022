import { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

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
    setPersons(persons.concat(newContact))
    setNewContact({ name: '', number: '' })
  }

  const filterHandler = e => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={filter} onChange={filterHandler} />
        </div>
      <h2>Add a new</h2>
      <form onSubmit={newContactHandler}>
        <div>
          name: <input value={newContact.name} onChange={nameInputHandler} />
        </div>
        <div>
          number: <input value={newContact.number} onChange={numberInputHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person person={person} key={person.name} />)}
    </div>
  )

}

export default App