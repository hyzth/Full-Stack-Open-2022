import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(data => { setPersons(data) })
  })

  const handleNotification = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const personExists = (name) => {
    return persons.some(person => person.name === name)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      handleNotification('Fields should not be empty', true)
    } else {
      const personOjbect = {
        name: newName,
        number: newNumber
      }
      if (personExists(newName)) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const id = persons.find(p => p.name === newName).id
          personService
            .update(id, personOjbect)
            .then(data => {
              setPersons(persons.map(p => p.id !== id ? p : data))
              handleNotification(`${newName} was updated`, false)
            })
            .catch(error => {
              setPersons(persons.filter(p => p.id !== id))
              handleNotification(`${newName} does not exist`, true)
            })
        }
      } else {
        personService
          .create(personOjbect)
          .then(data => {
            setPersons(persons.concat(data))
            handleNotification(`${newName} was created`, false)
          })
      }
      setNewName('')
      setNewNumber('')
    }

  }

  const deleteContact = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id))
          handleNotification(`${person.name} was deleted`)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          handleNotification(`${person.name} does not exist`, true)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter value={filter} handler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addContact}
        nameValue={newName} nameHandler={handleNameChange}
        numberValue={newNumber} numberHandler={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deleteContact} />
    </div>
  )
}

export default App