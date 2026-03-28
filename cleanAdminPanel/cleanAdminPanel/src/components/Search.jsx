import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = ({input, inputSetter, phase, data}) => {
  const location = useLocation();
  const searchVal = new URLSearchParams(location.search);
  const searchInput = searchVal.get("search");

    return (
      <>
        {phase === "idle" && data.length>0 && location.pathname==="/" && (
            <div>
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">search user </label>
                <input
                  type="text"
                  onChange={(e) => inputSetter(e)}
                  value={searchInput?searchInput:input}
                  id="search"
                  name="searchBox"
              />
             
              
              </form>
            </div>
          )}
      </>
    );
}
export default Search;