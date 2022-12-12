import Country from "./Country"

const Countries = ({ countries, showCountry }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    return (
      countries.map(country =>
        <div key={country.name}>
          {country.name} <button onClick={() => showCountry(country.name)}>show</button>
        </div>)
    )
  }
}

export default Countries