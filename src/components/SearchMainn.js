import React, {useEffect, useState} from 'react'
import "../components/style.css"
import WeatherDetails from './WeatherDetails'

function SearchMainn() {

    //Esta función nos permite reconocer cada letra que se escriba en la barra de búsqueda
   const  [searchTerm, setSearchTerm] = useState("madrid")
//    console.log(searchTerm)
   
   const [tempInfo, setTempInfo] = useState({})

   const getWeatherInfo = async () => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=4d9cbdff3ed5c57973cd02757d6a00a6`
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data)
        const {temp, humidity, pressure } = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind
        const {country, sunset} = data.sys;

        const myNewWeatherInfo = {
            temp, 
            humidity,
            pressure,
            weatherType,
            name, 
            speed,
            country,
            sunset,
        }

        setTempInfo(myNewWeatherInfo)

    } catch (error) {
        console.log(error)
    }

   }

   useEffect(() => {
   getWeatherInfo()
   }, [])

  return (
    <>
    <div className='wrap'>
        <div className="search">
            <input type="search" placeholder='Buscar ciudad...' id='search' onChange = {(e) => setSearchTerm(e.target.value)}/>
        </div>
        <button className='searchButton' onClick = {getWeatherInfo}>Buscar</button>
    </div>
    {/* Esta es la página de detalles del tiempo */}
    <WeatherDetails {...tempInfo}/>
    </>
  )
}

export default SearchMainn