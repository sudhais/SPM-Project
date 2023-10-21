import axios from "axios";
import {useEffect, useState} from "react"
import '../components/HistoryTable.css';
import {Link} from "react-router-dom"




const HistoryHome = ()=> {

  const [details,setDetails] = useState('');
  const [userID,setUserID] = useState('');
  const [search, setSearch] = useState('');


  
  useEffect(()=>{
    const storeduserID = localStorage.getItem('userID')
    setUserID(storeduserID)
    const getAllDetails =  ()=>{

       axios.get("http://localhost:8000/api/details?keyword=" + storeduserID + "&keyword1=" + search)
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



  return(
    <div >
    <div className="home">
      <div className="driver">  
      {/* <center><input type="text" className="searchDesign" placeholder="Search here" onChange={(e)=>setSearch(e.target.value)}/></center> */}
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search here" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=>setSearch(e.target.value)}/>
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Search</span>
        </div>
      </div>
          <div className="driver-details" >
      {/* <h4 className="text-primary">{details.userID}</h4> */}
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th scope="col1">Date</th>
            <th scope="col1">Project Name</th>
            <th scope="col1">ICB value</th>
            <th scope="col1">Actions</th>
          </tr>
        </thead>
      {details && details.map((val1 , index1)=> (
        <tbody key={index1}>
          {/* {val1.reports &&
            val1.reports.map((val, index) => ( */}
              <tr>
                <td>{val1.date}</td>
                <td>{val1.projName}</td>
                <th scope="row">{val1.value}</th>
                <td>
                  <center>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(val1._id)}>Delete</button>
                  <Link to={"/history/details"} state={val1}><button type="button" className="btn btn-primary">See details</button></Link>
                  </center>
                </td>
              </tr>
            {/* ))} */}

              

        </tbody>
      ))}
      </table>
      <br />
      <br />
      
    </div>
          
      </div>
      
    </div>
  </div>
  );
}

export default HistoryHome;