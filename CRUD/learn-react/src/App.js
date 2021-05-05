import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [newSalay, setNewSalary] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          salary: salary
        }
      ])
    })
  }

  const updateEmployeeSalary = (id) => {
    Axios.put("http://localhost:3001/update", {salary: newSalay, id: id}).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            position: val.position,
            salary: newSalay
          } : val;
        })
      )
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="Information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name :</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event) => {
              setName(event.target.value)
            }}></input>
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age :</label>
            <input type="number" className="form-control" placeholder="Enter Age" onChange={(event) => {
              setAge(event.target.value)
            }}></input>
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country :</label>
            <input type="text" className="form-control" placeholder="Enter Country" onChange={(event) => {
              setCountry(event.target.value)
            }}></input>
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position :</label>
            <input type="text" className="form-control" placeholder="Enter Position" onChange={(event) => {
              setPosition(event.target.value)
            }}></input>
          </div>

          <div className="mb-3">
            <label htmlFor="salary" className="form-label">Salary :</label>
            <input type="number" className="form-control" placeholder="Enter Salary" onChange={(event) => {
              setSalary(event.target.value)
            }}></input>
          </div>
          <button className="btn btn-success" onClick={addEmployee}>Add Employee</button>
        </form>
      </div>
      <hr/>
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployees}>Show employees</button>
        <br/>
        {employeeList.map((val,key) => {
          return (
            <div className="employee card">
                <div className="card-body text-left">
                    <p className="card-text">Name : {val.name} </p>
                    <p className="card-text">Age : {val.age} </p>
                    <p className="card-text">Country : {val.country} </p>
                    <p className="card-text">Position : {val.position} </p>
                    <p className="card-text">Salary : {val.salary} </p>
                    <div className="d-flex">
                      <input className="form-control" type="number" placeholder="15000..." onChange={(event) => {
                        setNewSalary(event.target.value)
                      }}></input>
                      <button className="btn btn-warning" onClick={() => {updateEmployeeSalary(val.id)}}>Update</button>
                      <button className="btn btn-danger" onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                    </div>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
