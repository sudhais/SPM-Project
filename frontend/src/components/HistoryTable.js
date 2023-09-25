import axios from "axios";
import './HistoryTable.css'; // Import the CSS file
import { useCallback, useEffect } from "react";
const HistoryTable = ({ details }) => {
  useEffect(()=>{
    
  },[details])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/details/${details._id}`);
      alert('File deleted');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  return (
    <div className="driver-details">
      {/* <h4 className="text-primary">{details.userID}</h4> */}
      <table className="table table-bordered">
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
          {details.reports &&
            details.reports.map((val, index) => (
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
            <th scope="row">{details.value}</th></tr>
        </tbody>
      </table>
      <center>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </center>
      <br />
      <br />
    </div>
  );
};

export default HistoryTable;
