import React from "react";
import { Outlet } from "react-router-dom";

const ChildContext = ({
  phase,
  data,
  input,
  deleteConfirmDilogue,
  deleter,
  userAdder
}) => {
  return (
    <>
      <Outlet
        context={{
          userStates: { phase, data, input },
          actions: { deleteConfirmDilogue, deleter, userAdder },
        }}
      />
    </>
  );
};

export default ChildContext;
