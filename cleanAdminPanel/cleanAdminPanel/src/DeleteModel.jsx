import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";


const DeleteModel = () => {
    const { actions } = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = Number (id)
    return (
      <>
        <p>Are you sure</p>
            <button onClick={() => {
                actions.deleter(userId); 
                navigate("/");
            }}>confirm</button>
        <button onClick={()=>navigate("/")}>cancel</button>
      </>
    );
}

export default DeleteModel;