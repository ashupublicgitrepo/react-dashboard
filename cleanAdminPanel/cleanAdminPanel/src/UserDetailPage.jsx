import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TableStyles.css";

const UserDetailPage = () => {
  const { userStates, selections, actions } = useOutletContext();
  const user = userStates.data.find((u) => u.id === selections.targetId);
  const [userData, setUserData] = useState([]);
  async function userDetailFetcher() {
    const userData = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${selections.targetId}`,
    );
    const json = await userData.json();
    setUserData(json);
    console.log(json);
  }
  useEffect(() => {
    userDetailFetcher();
  }, []);

  return (
    <>
      <Link to="/users">
        <button onClick={() => actions.targetIdSetter(null)}>back</button>
      </Link>
      {!user ? (
        <p>user not found</p>
      ) : (
        <>
          <div className="userDetail">
            <div id="userDetailDiv">
              <p className="user-info">{user.name}</p>
              <p className="user-info">Email : {user.email}</p>
              <p className="user-info">Phone : {user.phone}</p>
              <p className="user-info">Website : {user.website}</p>
              <p className="user-info">Company : {user.company.name}</p>
              <p className="user-info">Address : {user.address.street}</p>
            </div>
            <div className="userpost-div">
              {userData.map((d, i) => {
                return (
                  <div key={d.id} className="userpost-div">
                    <h4 className="user-postTitle">{d.title}</h4>
                    <p className="userposts">{d.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailPage;
