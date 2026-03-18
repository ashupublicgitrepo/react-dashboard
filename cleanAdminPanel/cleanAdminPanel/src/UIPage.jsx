import React from "react";
import "./TableStyles.css";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

const UIPage = () => {
  const { userStates, actions } = useOutletContext();

  const userList = userStates.data.filter((u) => {
    if (!userStates.input) return true;
    else return u.name.toUpperCase().includes(userStates.input.trim().toUpperCase());
  });
  function UImsger() {
    if (userStates.phase !== "idle") return false;
    if (userStates.data.length < 1) return "NO USERS AVAILABLE";
    if (userList.length < 1) return "no matching users found";
  }

  return (
    <>
      {userList.length < 1 ? (
        UImsger()
      ) : (
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
                  <td>
                    <Link
                      className="my-user"
                      to="/userDetail"
                      onClick={() => actions.targetIdSetter(e.id)}
                    >
                      {e.name}
                    </Link>
                  </td>
                  <td>{e.email}</td>
                  <td>{e.company.name}</td>
                  <td>
                    <button onClick={() => actions.deleter(e.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default UIPage;
