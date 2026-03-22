import React from "react";

const Search = ({input, inputSetter, phase, data, targetId}) => {

    return (
      <>
        {phase === "idle" && data.length>0 && !targetId && (
            <div>
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">search user </label>
                <input
                  type="text"
                  onChange={(e) => inputSetter(e)}
                  value={input}
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