import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
 value: country.name.common,
 label:`${country.flag} ${country.name.common}`,
 latlng: country.latlng,
 region : country.region
}))

const useCountries = () => {
 const getAll = () => formattedCountries
 const getByValue = (value) => formattedCountries.find((item) => item.value === value)
 return {
  getAll,
  getByValue
 }
}

export default useCountries