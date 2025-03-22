import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {

  // create different hooks that will help manage the different states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // set the states your application can be in
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  // after a successful login and verification of details, we need to redirect a user to a certain page
  // below is a hook for the same.
  const navigate = useNavigate()

  // a function to help us submit the details to the backed API
  const submit = async (e) =>{
    // below line of code will make sure that our app does not reload when a user clicks the signup button
    e.preventDefault()

    // update the loading hook with some information.
    setLoading("Please wait as we log you In...");

    // create a try and catch block that will add the details to the API
    try{
      // create an object that will be used to hold our data
      const data = new FormData();

      // add the two details gotten from the input (hooks) onto the object
      data.append("email", email) 
      data.append("password", password)

      // access the post method from the axios library
      // Add the details to the Backed API
      const response = await axios.post("https://kimanibenkamotho.pythonanywhere.com/api/signin", data)

      // set the loading hook back to empty
      setLoading("");

      if (response.data.user){

        // console.log(response.data.user)
        // save the details of the user into the local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // redirect the person to another page
        // use the navigate hook to do this
        navigate("/")
      }
      else{
        // the user was not found, show a message
        setError(response.data.Message)
        // setError("The login details are incorrect")
      }


    }
    catch(error){
      // set the loading hook back to empty
      setLoading("");
      setError(error.response.data.message)
    }
  }


  return (
    <div className="row justify-content-center mt-5">
      <div className="card shadow col-md-6 p-4">
        <h2>Sign In</h2>

        {loading}
        {error}

        <form onSubmit={submit}>
        <input 
        type="email"
        placeholder="Enter your email address here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="form-control" />
        <br />

        {/* {email} */}

        <input 
        type="password"
        placeholder="Enter the password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="form-control" /> <br /> <br />

        {/* {password} */}

        <button type="submit" className="btn btn-success">Sign In</button>
        </form>
        
      </div>        
    </div>
  )
}

export default Signin;