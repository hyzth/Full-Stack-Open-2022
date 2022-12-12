const Languages = ({ languages }) => (
  Object.values(languages).map((lang, index) =>
    <li key={index}>{lang}</li>)
)

export default Languages