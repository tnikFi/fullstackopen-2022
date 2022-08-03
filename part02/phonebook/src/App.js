import { useState } from 'react'

const Person = ({ person }) => <p>{person.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const nameInputHandler = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const newNameHandler = e => {
    e.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newNameHandler}>
        <div>
          name: <input value={newName} onChange={nameInputHandler} />
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