import React, { useState } from "react";
import Header from "./Header";
import UIBox from "./UIBox";
import Form from "./Form";
import UIMsg from "./UIMsg";
const App = () => {
  const [task, setTask] = useState([]);
  const [data, setData] = useState("");
  const [state, setState] = useState({
    phase: "_idle",
    status: "_emptyInput",
    action: null,
  });
  function server() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 800);
    })
  }
  function wait() {
    return new Promise(res => setTimeout(res, 100));
  }
  function stateSetter(newSt) {
    setState(pr => ({ ...pr, ...newSt })); 
  }
 async function taskAdder(e) {
   e.preventDefault();
   if (state.phase === "_loading") return false;
   if (data.length < 1) {
     stateSetter({ phase: "_idle", status: "_emptyInput", action: null });
     return;
   };
   stateSetter({ phase: "_loading", status: "_load", action: "_taskButton" });
   await wait();
   try {
     await server();
     const newTask = {
       id: Date.now(),
       title: data,
       status: "pending"
     };
     stateSetter({ phase: "_idle", status: "_uploaded", action: null });
     await wait();
     setTask(pr => [...pr, newTask]);
     setData("");
   } catch {
    //  no error included today, promise always resolves.
     stateSetter({ phase: "_error", status: "_uploadFailed", action: null });
   } 

  }
  function dataSetter(e) {
    const data = e.target.value;
    setData(data); 
  }
  async function taskDeleter(indexNum) {
    if (state.phase === "_loading") return false;
    stateSetter({ phase: "_loading", status: "_load", action: null });
    const taskListNew = [...task];
    try {
      await server();
      taskListNew.splice(indexNum, 1);
      stateSetter({ phase: "_success", status: "_deleted", action: null });
      await wait();
      setTask(taskListNew);
    } catch {
      stateSetter({ phase: "_error", status: "_deleteFailed", action: null });
    } 
    

  };

 
 
  return (
    <>
      <Header />
      <Form data={data} taskAdder={taskAdder} button={state.action} dataSetter={dataSetter}  />
      <UIMsg status ={state.status}   />
          <UIBox task={task} taskDeleter={taskDeleter} />
    </>
  );
};
export default App;
