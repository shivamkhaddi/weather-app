import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [city,setCity] =useState('')
  let [wDetails,setWDetails] =useState('')

  let getData=(event)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a3508239c35735a40344db9f3958613&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod=="404"){
        setWDetails(undefined)
      }else{
      setWDetails(finalRes)
      }

    })
    event.preventDefault();
    setCity('')
  }

  useEffect(()=>{

  },[])
  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
       <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[40px] font-bold py-[50px] text-white'>Weather App</h1>

          <form onSubmit={getData}>
            <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='city Name'/> <button className='bg-[yellow]'>Enter</button>
          </form>

          <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px]'>
             {wDetails && wDetails.cod === 200 ? ( // Check if response is successful
            <>
              <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
              <h1 className='font-bold text-[40px]'>{wDetails.main.temp}°C</h1>
              <img 
                src={`http://openweathermap.org/img/wn/${wDetails.weather[0].icon}@2x.png`} 
                alt={wDetails.weather[0].description} 
              />
              <p>{wDetails.weather[0].description}</p>
            </>
          ) : (
            <p>No City Found</p>
          )}
          </div>
       </div>
    </div>
  );
}

export default App;
