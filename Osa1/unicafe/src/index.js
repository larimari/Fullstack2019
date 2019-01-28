import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistic = ({good, neutral, bad, allClicks}) => {
      if (allClicks === 0){
          return (
            <div>
              Ei yhtään palautetta annettu
            </div>
          )
        }
    return (
        <div>
          <table>
          <tbody>
          <tr>
            <td> Hyvä </td>
            <td> {good} </td>
          </tr>
          <tr>
            <td> Neutraali </td>
            <td> {neutral} </td>
          </tr>
          <tr>
            <td> Huono </td>
            <td> {bad} </td>
          </tr>
          <tr>
            <td> Yhteensä </td>
            <td> {allClicks} </td>
          </tr>
          <tr>
            <td> Keskiarvo </td>
            <td> {(good-bad)/allClicks} </td>
          </tr>
          <tr>
            <td> Positiivisia </td>
            <td> {good/allClicks*100}% </td>
          </tr>
          </tbody>
          </table>
        </div>
      )
    }

const App = (props) => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick =() => {
    setGood(good + 1)
    setAll(allClicks +1)
  }

  const handleNeutralClick =() => {
    setNeutral(neutral + 1)
    setAll(allClicks +1)
  }

  const handleBadClick =() => {
    setBad(bad + 1)
    setAll(allClicks +1)
  }

  return (
    <div>
        <h1> Anna palautetta </h1>
        <Button
        handleClick={handleGoodClick}
        text='hyvä'
        />
        <Button
        handleClick={handleNeutralClick}
        text='neutraali'
        />
        <Button
        handleClick={handleBadClick}
        text='huono'
        />
        <h1> Statistiikka </h1>
        <Statistic good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)