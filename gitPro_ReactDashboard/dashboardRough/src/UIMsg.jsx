import React from "react";

const UIMsg = ({status}) => {
    const statusMap = {
        _emptyInput: "please enter valid input.",
        _load: "...loading",
        _uploaded: "task added successfully.",
        _deleted: "task has been deleted from list successfully."
    };
    function statusMapper() {
        return statusMap[status];
    }
    // const stateMap = {
  //     _emptyInput: "please enter data.",
  //     _uploaded: "task added successfully.",
  //     _uploadFailed: "internal sever error, please try again."
  // }
  // function phaseMapper() {

  //     return phaseMap.phase;
  // };
  // function statusMapper() {
  //     return stateMap.status;
  // }
  return <p>{statusMapper()}</p>;
};

export default UIMsg;