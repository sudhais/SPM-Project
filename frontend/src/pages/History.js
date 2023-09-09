import axios from "axios";
import {useEffect, useState} from "react"

import HistoryTable from "../components/HistoryTable";



const History = ()=> {

  const [details,setDetails] = useState('');
  const [userID,setUserID] = useState('');

  useEffect(()=>{
    const getAllDetails = async ()=>{
      await axios.get("http://localhost:8000/api/details?keyword=" + userID)
      .then((res)=>{
        const json = res.data;
        setDetails(json.details);
      })
      .catch((err=>console.log(err)))
    }

    getAllDetails();
  },[details])
  console.log(details[1]);


  return(
    <div >
    <div className="home">
      <div className="driver">  
        {details && details.map((val , index)=> (
          <HistoryTable key={index} details={val} />
          
        ))}
      </div>
      
    </div>
  </div>
  );
}

export default History;