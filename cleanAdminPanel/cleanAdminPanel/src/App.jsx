import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import UIPage from "./UIPage.jsx";
import UIMsg from "./UIMsg.jsx";

const url = "https://jsonplaceholder.typicode.com/users?_limit=10";
const App = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    status: "load"
    
  });
  async function wait() {
    return new Promise(res=>setTimeout(res,500))
  }
  function updateState(state) {
    setState((pr) => ({ ...pr, ...state }));
  }
  useEffect(() => {
    

    async function fetcher() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json) setData(json);
        else setData([]);
        await wait();
        updateState({  status: null });
      } catch {
        await wait();
        updateState({  status: "serverError" });
      }
    }
    fetcher();
  }, []);

  return (
    <>
      <Header />

      {state.status!==null  ? (<UIMsg status={state.status} />) : (

        <UIPage data={data} />)}
    </>
  );
};

export default App;
