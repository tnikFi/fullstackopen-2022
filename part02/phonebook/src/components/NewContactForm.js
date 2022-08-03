import {useState} from 'react'
import contactService from '../services/contacts'

const NewContactForm = ({persons, setPersons}) => {
    
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
                .then(data => setPersons(persons.map(person => person.id === newData.id ? newData : person)))
                setNewContact({ name: '', number: '' })
            } else {
                setNewContact({ name: '', number: '' })
            }
        } else {
            contactService
            .create(newContact)
            .then(data => setPersons(persons.concat(data)))
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