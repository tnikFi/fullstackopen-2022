import {useState} from 'react'
import contactService from '../services/contacts'

const NewContactForm = ({persons, setPersons, setAlert}) => {
    
    const [newContact, setNewContact] = useState({ name: '', number: '' })

    const handleInput = key => {
        return e => {
            e.preventDefault()
            setNewContact({...newContact, [key]: e.target.value})
        }
    }

    const newContactHandler = e => {
        e.preventDefault()
        const existing = persons.find(person => person.name === newContact.name)
        if (existing) {
            if (window.confirm(`${newContact.name} is already added to the phonebook. Replace the old number with a new one?`)) {
                const newData = {...existing, number: newContact.number}
                contactService
                    .update(existing.id, newData)
                    .then(data => setPersons(persons.map(person => person.id === data.id ? data : person)))
                    .catch(error => {
                        const response = error.response

                        if (response) {
                            const message = error.response.data.error
                            const status = error.response.status
                            setAlert({text: `${message}`, color: 'red'})
                        } else {
                            setAlert({text: `Information of ${newData.name} has already been removed from the server`, color: 'red'})
                            setPersons(persons.filter(person => person !== existing))
                        }
                    })
                setAlert({text: `Updated ${newData.name}`, color: 'green'})
                setNewContact({ name: '', number: '' })
            } else {
                setNewContact({ name: '', number: '' })
            }
        } else {
            contactService
                .create(newContact)
                .then(data => {
                    setPersons(persons.concat(data))
                    setAlert({text: `Added ${newContact.name}`, color: 'green'})
                })
                .catch(error => {
                    setAlert({text: `${error.response.data.error}`, color: 'red'})
                })
            setNewContact({ name: '', number: '' })
        }
    }

    return (
        <>
            <h2>Add a new</h2>
            <form onSubmit={newContactHandler}>
                <div>
                    name: <input value={newContact.name} onChange={handleInput('name')} />
                </div>
                <div>
                    number: <input value={newContact.number} onChange={handleInput('number')} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </>
    )
}
    
export default NewContactForm