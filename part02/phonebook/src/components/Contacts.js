import contactService from '../services/contacts'

const Person = ({ person, onRemove }) => <p>{person.name} {person.number} <button onClick={() => onRemove(person)}>delete</button></p>

const Contacts = ({ persons, setPersons, filter, setAlert }) => {

    const removeContactHandler = person => {
        if (!window.confirm(`Delete ${person.name}?`)) return;
        contactService
            .remove(person.id)
            .then(data => console.log(data))
        setPersons(persons.filter(p => p.id !== person.id))
        setAlert({text: `Removed ${person.name}`, color: 'red'})
    }

    return (
        <>
            <h2>Numbers</h2>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person person={person} key={person.id} onRemove={removeContactHandler} />)}
        </>
    )
}
    
export default Contacts