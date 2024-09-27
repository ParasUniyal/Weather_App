import { useState,useEffect} from "react"
import axios from "axios"

function Weather() {
    const [location,setLocation]=useState("");
    const [data,setData]=useState({});
    const [status,setStatus]=useState(" ");
    let URL= `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b13af5dde84053fed0bfd84214b7228`;
    async function getWeather(){
      try{

      
      const response= await axios(URL);
      setData(response.data);
      console.log(data)
    }
    catch(error){
      console.log("error is :",error)
    }
    
      
    }
    function Status(){
      let Pattern= /[a-z A-Z]+/;
       if(location.length==0){
        setStatus("Error!Enter Valid city")
       }
       else if(Pattern.test(location)==false){
        setStatus("Enter Valid name")
       }
       else{
        setStatus(" ")
       }
    }
    useEffect(()=>{
      getWeather();
      console.log("mount");

    },[]);
    useEffect(()=>{
      Status();
    },[location]);
    
  return (
    <div id="app" className='h-96 w-74  rounded-lg '>
        <input value={location} className=" leading-8 rounded-full pl-4 w-56 ml-6 mt-4"
          type="text"
          placeholder="Search City.." 
          onChange={(e)=>{
            setLocation(e.target.value);
            
            
            }}
          
        />

        <button className="ml-2  rounded-full p-1.5 bg-white hover:bg-orange-600 hover:text-white" onClick={getWeather}>Get</button><br/>
       <div className=" w-32 h-28 m-auto mt-4"> <img src={data.weather ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null}  /></div>
        <div className="  mt-4">
          <h2 className="scale-150  w-24 m-auto pl-6">{data.main ? Math.round (data.main.temp-273.15) : null}°C</h2>
          <h1 className=" scale-150 w-24 m-auto mt-4 pl-6 ">{data.name}</h1>
          
        </div>
        <div className="bg-white">{status}</div> 
        <div className=" w-full flex place-content-between mt-14">
          <div className=" w-20 scale-100">{data.main ? data.main.humidity : null}<br/>Humidity</div>
          <div >{data.wind ? data.wind.speed : null} km/hr<br/>Wind</div>
        </div>
        
    </div>
    
  )
}

export default Weather