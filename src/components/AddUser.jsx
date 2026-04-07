import React, { useRef, useState } from "react";

const AddUser = () => {
  const [phase, setPhase] = useState({
    phase: "idle",
    error: null
  });
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "200px",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
  };
  const formDiv = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",

    background: "rgba(0,0,0,0.4)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const refName = useRef();
  const refEmail = useRef();
  const refPhone = useRef();
  const refWeb = useRef();
  const refCompany = useRef();
  const refAddress = useRef();

  function formHandler(e) {
    e.preventDefault();
      const name = refName.current.value;
      const email = refEmail.current.value;
      const phone = refPhone.current.value;
      const web = refWeb.current.value;
      const company = refCompany.current.value;
      const address = refAddress.current.value;
    if (!dataVerifier()) return false;
    const userDetail = {
      name: name,
      email: email,
      phone: phone,
      website: web,
      company: { name: company },
      address: { street: address },
    };
    
  }
  function resetter(e) {
    e.preventDefault();
    setPhase({ phase: "idle", error: null });
    refName.current.value = null;
    refEmail.current.value = null;
    refPhone.current.value = null;
    refWeb.current.value = null;
    refCompany.current.value = null;
    refAddress.current.value = null;
  }
  function dataVerifier() {
       const name = refName.current.value;
       const email = refEmail.current.value;
       const phone = refPhone.current.value;
       const web = refWeb.current.value;
       const company = refCompany.current.value;
    const address = refAddress.current.value;

    if (name.length < 1) {
      setPhase({phase:"error", error: "checkName"});
      return false};
    if (email.length < 1 || !email.includes("@")) {
      setPhase({ phase: "error", error: "checkEmail" });
      return false};
    if (phone.length < 10) {
      setPhase({ phase: "error", error: "checkPhone" });
      return false};
    if (!web.includes("www") || !web.includes(".com") && !web.includes(".org") && !web.includes(".in") ) {
      setPhase({ phase: "error", error: "checkWeb" });
      return false};
    if (company.length < 1) {
      setPhase({ phase: "error", error: "checkComapny" });
      return false};
    if (address.length-1 < 1) {
      setPhase({ phase: "error", error: "checkAddress" });
      return false};
    setPhase({ phase: "success", error: null });
    return true;
  }

  return (
    <>
      <div style={formDiv}>
        <form action="" onSubmit={(e) => formHandler(e)}>
          <div style={formStyle}>
            <h3>Enter User Details</h3>
            <label htmlFor="name">name</label>
            <input ref={refName} id="name" type="text" />
            <label htmlFor="email">email</label>
            <input ref={refEmail} id="email" type="email" />
            <label htmlFor="phone">phone</label>
            <input ref={refPhone} id="phone" type="number" />
            <label htmlFor="website">website</label>
            <input ref={refWeb} id="website" type="text" />
            <label htmlFor="company">company</label>
            <input ref={refCompany} type="text" id="company" />
            <label htmlFor="address">address</label>
            <textarea ref={refAddress}  id="address" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "5px",
              }}
            >
              <button onClick={(e) => formHandler(e)}>submit</button>
              <button onClick={(e) => resetter(e)}>reset</button>
            </div>

            {phase.phase === "error" && <div>{phase.error}</div>}
            <button>cancle</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
