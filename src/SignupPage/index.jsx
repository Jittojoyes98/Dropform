import React from "react";

const SignupPage = () => {
  const handleForm=(e)=>{
    e.preventDefault()
    console.log(e.target.uname.value);
  }
  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />
        </div>

        <div>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
};

export default SignupPage;
