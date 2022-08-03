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

export default Course