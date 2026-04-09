import React from "react";
import { Outlet } from "react-router-dom";

const ChildContext = ({
  phase,
  data,
  input,
  deleteConfirmDilogue,
  deleter,
  userAdder,
  newUserAdder
}) => {
  return (
    <>
      <Outlet
        context={{
          userStates: { phase, data, input },
          actions: { deleteConfirmDilogue, deleter, userAdder, newUserAdder },
        }}
      />
    </>
  );
};

export default ChildContext;
