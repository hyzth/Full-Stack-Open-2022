const Header = ({ course }) => (
  <h3>{course}</h3>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  parts.map(part =>
    <Part key={part.id} part={part} />
  )
)

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course