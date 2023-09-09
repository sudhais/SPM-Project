import axios from "axios";

const HistoryTable = ({details})=> {

  const handle = async ()=> {

    await axios.delete("http://localhost:8000/api/details/"+ details._id )
    .then((res)=>{
      alert('file deleted');
    })

  }

  return(
    <div className="driver-details" >
      
      <h4>{details.userID}</h4>  
      <table class="table table-bordered">
        <thead><tr>
          <th scope="col">Line No</th>
          <th scope="col">Statement</th>
          <th scope="col">size</th>
          <th scope="col">inheritence</th>
          <th scope="col">control type</th>
          <th scope="col">nested</th>
          <th scope="col">total</th>
          <th scope="col">multiply</th>
        </tr></thead>
      {details.reports && details.reports.map((val, index)=>(
        <tbody><tr key={index}>
          <th scope="row">{val.lineNo}</th>
          <td>{val.statement}</td>
          <td>{val.size}</td>
          <td>{val.inheritence}</td>
          <td>{val.control}</td>
          <td>{val.nested}</td>
          <td>{val.total}</td>
          <td>{val.multiply}</td>
        </tr></tbody>
      ))}
     </table>
     <center><button type="button" class="btn btn-danger" onClick={handle}>Delete</button></center>
     <br/><br/>
      
    </div>
  );
}

export default HistoryTable;