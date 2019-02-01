import React from 'react'

const Header = props =>
<h1>{props.course}</h1>

const Total = (props) => {

/*const joku=props.sum.map(p => p.exercises)
console.log(joku)*/
let total = props.sum.reduce((accumulator, part) => accumulator + part.exercises,0)

return (
  <p>yhteensä {total} tehtävää</p>
)
}


const Part = (props) => {
  return (
      <p>{props.part.name} {props.part.exercises}</p>
  )
}


const Content = (props) => {
  return (
      <div>
          {props.parts.map(x => <Part key={x.name} part={x}/>)}
      </div>
  )
}


const Course = (props) => {

  return (
      <div>
          <Header course={props.course.name}/>
          <Content parts={props.course.parts}/>
          <Total sum={props.course.parts} />
      </div>
  )
}

const Kurssit = (props) => {
      return (
        <div>
          {props.course.map(course => <Course key={course.name} course={course} />)}
        </div>
      )
    }
    
    export default Kurssit