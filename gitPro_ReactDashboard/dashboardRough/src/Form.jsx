import React from "react";
const Form = ({ taskAdder, data, dataSetter, button }) => {
   
    return (
      <>
        <form  action="" onSubmit={(e) => taskAdder(e)}>
          <input type="text" value={data} onChange={dataSetter} />
          <button disabled={button ==="_taskButton"}>add task</button>
        </form>
      </>
    );
}
export default Form;