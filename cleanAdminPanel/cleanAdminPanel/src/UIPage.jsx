import { useState } from "react";
import React  from "react";
import "./TableStyles.css";

const UIPage = ({ data, input, phase, deleter}) => {
  
   
 
    const userList = data.filter(u => {
      if (!input) return true;
      else return u.name.toUpperCase().includes(input.trim().toUpperCase());
    });
  function UImsger() {
    if (phase !== "idle") return false;
    if (data.length < 1) return "NO USERS AVAILABLE"
    if (userList.length < 1) return "no matching users found"
    
 }
  
  
    
  return (
    <>
      {userList.length<1 ? UImsger() : (
        <table className="my-table">
          <thead>
            <tr>
              <th>sr. no.</th>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((e, i) => {
              return (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.company.name}</td>
                  <td>
                    <button onClick={() => deleter(e.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>)
      }
    </>
  );

}
export default UIPage;