import Languages from "./Languages"
import Weather from "./Weather"

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h3>languages</h3>
    <ul>
      <Languages languages={country.languages} />
    </ul>
    <img src={country.flag} alt={country.name} />
    <Weather country={country} />
  </div >
)

export default Country