import React from "react";
import { Outlet } from "react-router-dom";

const UserPage = ({phase, data, input, deleter, targetId, targetIdSetter}) => {
    return (
      <>
        <Outlet context={{
          userStates: { phase, data, input },
          actions: { deleter, targetIdSetter },
          selections: {targetId}
         }} />
      </>
    );
}

export default UserPage;