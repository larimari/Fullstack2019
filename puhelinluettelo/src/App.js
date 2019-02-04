import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './filter'
import AddForm from './Form'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [hakusana, setHakusana] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault()

        let sisaltaako = true

        persons.forEach(function (person) {
            if (newName === person.name) {
                sisaltaako = false
            }
        })


        if (sisaltaako === false) {
            window.alert(`${newName} on jo luettelossa`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewNumber('')
            setNewName('')
        }

    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)

        setHakusana(event.target.value)
    }

    const lista = hakusana ?
        persons.filter((person) =>
            person.name.toLowerCase().includes(hakusana.toLowerCase())
        ) :
        persons

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <div>
                Rajaa näytettäviä:
                    <Filter handleFilterChange={handleFilterChange} />
            </div>
            <h3> Lisää uusi </h3>
            <AddForm
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numerot</h2>
            {lista.map(person =>
                <div key={person.name}>
                    {person.name} {person.number}
                </div>)}

        </div>
    )

}

export default App