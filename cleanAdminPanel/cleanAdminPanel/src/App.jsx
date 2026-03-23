import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import UIMsg from "./UIMsg.jsx";
import Search from "./Search.jsx";
import UserPage from "./UserPage.jsx";

const url = "https://jsonplaceholder.typicode.com/users";
const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [state, setState] = useState({ phase: "loading", status: "load" } );
 
 
   function inputSetter(e) {
     const valueInInputTerminal = e.target.value;
     setInput(valueInInputTerminal);
    
   }
  async function wait() {
    return new Promise(res=>setTimeout(res,1000))
  }

  function updateState(state) {
    setState((pr) => ({ ...pr, ...state }));
  }
  async function fetcher() {
    updateState({ phase: "loading", status: "load" });
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json) setData(json);
      else setData([]);
      updateState({ phase: "idle", status: null });
    } catch {
      await wait();
      updateState({ phase: "error", status: "serverError" });
    }
  }
 
  useEffect(() => {
    fetcher();
  }, []);

  
  async function deleter(id) {
    const confirmation = window.confirm("are you sure");
    if (!confirmation) return false;
    try {
      const newData = data.filter(u => u.id !== id);
      setData(newData);
      updateState({ status: "deleted" });
    } catch {
      updateState({phase:"error", status: "deleteFailed" });
    } finally {
      await wait();
      updateState({status: null });
    }
  }

  return (
    <>
      <Header />
      <Search data={data} input={input} inputSetter={inputSetter} phase={state.phase} />
      <UIMsg status={state.status} fetcher={fetcher} />
      <UserPage phase={state.phase} data={data} input={input} deleter={deleter} />
      
    </>
  );
};

export default App;
