const Header = (props) => <h2>{props.course.name}</h2>;

const Part = props => <p>{props.name} {props.exercises}</p>;

const Content = ({course}) => {
  return (
    <>
      {course.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)}
    </>
  )
}

const Total = ({course}) => <p><strong>Number of exercises {course.parts.reduce((previousSum, current) => previousSum + current.exercises, 0)}</strong></p>;

const Course = ({course}) => <>
  <Header course={course}/>
  <Content course={course}/>
  <Total course={course}/>
</>

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default App