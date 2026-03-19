import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TableStyles.css";

const UserDetailPage = () => {
  const { userStates, selections, actions } = useOutletContext();
  const user = userStates.data.find((u) => u.id === selections.targetId);
  const [comment, setComment] = useState({
    phase: null,
    targetId: null,
    comments: [],
    error:null
  });
  const [userPosts, setUserPosts] = useState({
    phase: "idle",
    error: null,
    post:[]
  });
  function updateState(newState) {
    setUserPosts((pr) => ({ ...pr, ...newState }));
  }
  function userPostFetcher() {
    updateState({ phase: "loading" });
    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${selections.targetId}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`server failed to fetch! status: ${res.status}`);
        else return res.json()
      })
      .then((json) => {
        updateState({ post:json, phase: "idle", error:null });
      })
      .catch((err) => updateState({phase:"error",post:[], error: err.message }));
  }
 
  function commentFetcher(id) {
    if (comment.phase === "loading") return false;
    setComment((pr) => {
      if (pr.targetId === id) { return { ...pr, targetId: null, comments: [], error: null, phase: "idle" }} 
     return { ...pr, phase: "loading",comments:[], targetId: id };
    } );
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments?_limit=10`)
      .then((res) => {
        if (!res.ok) throw new Error(`server failed to fetch! status: ${res.status}`);
         return res.json();
      })
      .then((json) => setComment(pr => ({
            ...pr,
            phase: "idle",
            error: null,
            comments: json,
          })
        )
      )
      .catch((err) =>setComment(pr => ({ ...pr,targetId:id,comments:[], phase: "error", error: err.message })) );
  }
  useEffect(() => {
    if(selections.targetId) userPostFetcher();
  }, [selections.targetId]);

  return (
    <>
      <Link to="/">
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
              <h3>user posts</h3>
              {userPosts.phase === "loading" ? (
                <p>...loading</p>
              ) : userPosts.phase === "error" ? (
                <div>
                  <p>{userPosts.error}</p>
                  <button onClick={userPostFetcher}>retry</button>
                </div>
              ) : (
                userPosts.post.map((d) => {
                  return (
                    <div key={d.id}>
                      <h4 className="user-postTitle">{d.title}</h4>
                      <p className="userposts">{d.body}</p>
                      <p
                        id="commentButton"
                        onClick={() => commentFetcher(d.id)}
                      >
                        comments
                      </p>
                      {comment.targetId === d.id && (
                        <div>
                          {comment.phase === "loading" ? (
                            <p>...loading</p>
                          ) : comment.phase === "error" ? (
                            <div>
                                <p>{comment.error}</p>
                                <button onClick={()=>commentFetcher(d.id)}>retry</button>
                            </div>
                          ) : (
                            comment.comments.map((e) => (
                              <div key={e.id}>
                                <div className="commenterDiv">
                                  <div id="commenterInfo">
                                    <div className="userThumb"></div>
                                    <h5>{e.email}</h5>
                                  </div>
                                  <p>{e.name}</p>
                                  <p>{e.body}</p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailPage;
