import axios from "axios";
import {useEffect, useState} from "react"
import '../components/HistoryTable.css';

// import HistoryTable from "../components/HistoryTable";



const History = ()=> {

  const [details,setDetails] = useState('');
  const [userID,setUserID] = useState('');
  const [search, setSearch] = useState('');

  useEffect(()=>{
    const getAllDetails = async ()=>{
      await axios.get("http://localhost:8000/api/details?keyword=" + userID + "&keyword1=" + search)
      .then((res)=>{
        const json = res.data;
        setDetails(json.details);
        // console.log(res);
      })
      .catch((err=>console.log(err)))
    }

    getAllDetails();
  },[search])


  function handleDelete(id) {
    try {
      axios.delete(`http://localhost:8000/api/details/${id}`)
      .then((res=>{

        alert('File deleted');
        setDetails(details.filter((detail) => detail._id !== id));
      }))
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };


  // const handle = async ()=> {
    
  //   useEffect(async()=>{
  //       await axios.get("http://localhost:8000/api/details?keyword=" + userID + "&keyword1=" + search)
  //         .then((res)=>{
  //           const json = res.data;
  //           setDetails(json.details);
  //         })
  //         .catch((err=>console.log(err)))
        

  //     },[search])

  // }


  return(
    <div >
    <div className="home">
      <div className="driver">  
      {/* <input type="text" placeholder="Search here" onChange={(e)=>setSearch(e.target.value)}/> */}
      <input type="text" placeholder="Search here" onChange={(e)=>setSearch(e.target.value)}/>
      <button >Search</button>
        {details && details.map((val1 , index1)=> (
          // <HistoryTable key={index} details={val} />
          <div className="driver-details" >
      {/* <h4 className="text-primary">{details.userID}</h4> */}
      <table className="table table-bordered" key={index1}>
        <thead>
          <tr>
            <th scope="col">Class Name</th>
            <th scope="col">Method Name</th>
            <th scope="col">Line No</th>
            <th scope="col">Statement</th>
            <th scope="col">S</th>
            <th scope="col">Wi</th>
            <th scope="col">Wc</th>
            <th scope="col">Wn</th>
            <th scope="col">W</th>
            <th scope="col">S*W</th>
          </tr>
        </thead>
        <tbody>
          {val1.reports &&
            val1.reports.map((val, index) => (
              <tr key={index}>
                <td>{val.class}</td>
                <td>{val.method}</td>
                <th scope="row">{val.lineNo}</th>
                <td>{val.statement}</td>
                <td>{val.size}</td>
                <td>{val.inheritence}</td>
                <td>{val.control}</td>
                <td>{val.nested}</td>
                <td>{val.total}</td>
                <td>{val.multiply}</td>
              </tr>
            ))}
          <tr><td></td>
            <td></td>
            <td></td>
            <th scope="row">ICB Value</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th scope="row">{val1.value}</th></tr>
        </tbody>
      </table>
      <center>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(val1._id)}
        >
          Delete
        </button>
      </center>
      <br />
      <br />
    </div>
          
        ))}
      </div>
      
    </div>
  </div>
  );
}

export default History;