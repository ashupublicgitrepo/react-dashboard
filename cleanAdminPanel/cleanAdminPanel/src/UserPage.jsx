import React from "react";
import { Outlet } from "react-router-dom";

const UserPage = ({ phase, data, input, deleteConfirmDilogue, deleter }) => {
  return (
    <>
      <Outlet
        context={{
          userStates: { phase, data, input },
          actions: { deleteConfirmDilogue, deleter },
        }}
      />
    </>
  );
};

export default UserPage;