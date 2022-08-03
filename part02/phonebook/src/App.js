import { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244'
    }
  ])
  const [newContact, setNewContact] = useState({ name: '', number: '' })

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <Person person={person} key={person.name} />)}
    </div>
  )

}

export default App