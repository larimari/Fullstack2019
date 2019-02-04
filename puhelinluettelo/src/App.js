import React, { useState, useEffect } from 'react'
import Filter from './filter'
import AddForm from './Form'
import personService from './services/persons'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [hakusana, setHakusana] = useState('')
    const [notification, setNotification] = useState({ text: null })


    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
        /*axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })*/

    }, [])

    const Notification = (props) => {
        if (props.message.text === null) {
            return null
        } else {
            return (
                <div className={props.message.style}>
                    {props.message.text}
                </div>
            )
        }
    }

    const addName = (event) => {
        event.preventDefault()
        let sisaltaako = true

        persons.forEach(function (person) {
            if (newName === person.name) {
                sisaltaako = false
            }
        })

        const human = persons.filter(h => h.name === newName)


        if (sisaltaako === false) {

            const changedPerson = { ...human, number: newNumber }
            console.log('henkilö', changedPerson)

            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                console.log('korvataan')
                personService
                    .update(changedPerson.id, changedPerson)
                    .then(fix => {
                        setPersons(persons.map(x => x.id !== changedPerson.id ? x : fix))
                        console.log(changedPerson.name)
                    })
                console.log('done')
                    .catch(error => {
                        setNotification(
                            {
                                text: `Henkilö ${changedPerson.name} on jo poistettu listalta`,
                                style: `error`
                            }
                        )
                        setTimeout(() => {
                            setNotification({ text: null })
                        }, 5000)
                    })
                console.log('vielä sujuu')

                setNotification(
                    {
                        text: `Henkilön ${changedPerson.name} päivitys onnistui`,
                        style: `notification`
                    }
                )
                setTimeout(() => {
                    setNotification({ text: null })
                }, 5000)


            }
            setNewName('')
            setNewNumber('')

        } else {
            setNotification(
                {
                    text: `Henkilö ${newName} lisättiin luetteloon`,
                    style: `notification`
                }
            )
            setTimeout(() => {
                setNotification({ text: null })
            }, 5000)

            personService
                .create({ name: newName, number: newNumber })
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })

        }
    }

    const deletePerson = (person) => {
        if (window.confirm(`Poisetaanko ${person.name}`)) {
            setNotification(
                {
                    text: `Henkilö ${person.name} poistettiin listalta`,
                    style: `error`
                }
            )
            personService
                .deletePerson(person.id)
                .then(response => {
                    setPersons(persons.filter((personToFilter => personToFilter.id !== person.id)))
                })
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
            <Notification message={notification} />
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
                    <button onClick={() => deletePerson(person)}>
                        poista </button>
                </div>)}
        </div>
    )

}

export default App