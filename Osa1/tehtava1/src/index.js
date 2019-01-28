import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log(props) 
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                {props.kurssi.name} {props.kurssi.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part kurssi={props.part1}  />
            <Part kurssi={props.part2}  />
            <Part kurssi={props.part3}  />
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                yhteensä {props.exercises1 + props.exercises2 + props.exercises3}
                tehtävää
            </p>
        </div>
    )
}

const App = () => {
    const course = { 
        name: 'Half Stack -sovelluskehitys',
        parts: [
        {
            name: 'Reactin perusteet',
            exercises: 10
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
        },
        {
            name: 'Komponenttien tila',
            exercises: 14
        }
    ]
}

    return (
        <div>
            <Header course={course.name} />
            <Content part1={course.parts[0]} 
            part2={course.parts[1]} 
            part3={course.parts[2]} 
            />
            <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
