const Header = (props) => <h1>{props.course.name}</h1>;

const Part = props => <p>{props.name} {props.exercises}</p>;

const Content = ({course}) => {
  return (
    <>
      {course.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)}
    </>
  )
}

const Total = props => <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>;

const Course = ({course}) => <>
  <Header course={course}/>
  <Content course={course}/>
  <Total course={course}/>
</>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App