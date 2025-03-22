import axios from "axios";
import { useState } from "react";

const Addproducts = () => {

    // create hooks that will enable to store different data
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");

    // create three additional hooks to manage the state of your application when a person
    // clicks the add product button
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // create a fucntion that will handle the submit event
    const submit = async (e) =>{
      // prevent the site from reloading
      e.preventDefault()

      // update the loading hook with a message
      setLoading("Please wait as we upload your product details...")

      // create a form data variable that will hold all the details from the hooks
      const data = new FormData()

      // append the information from the hooks
      data.append("product_name", product_name);
      data.append("product_description", product_description);
      data.append("product_cost", product_cost)
      data.append("product_photo", product_photo)

      try{
        const response = await axios.post("https://kimanibenkamotho.pythonanywhere.com/api/addproduct", data);

        // set loading back to default
        setLoading("");

        // update your message hook with a message if the details have beed saved successfully
        // into the database.
        setMessage("Product Added Successfully.")

        // set the timeout of the message
        setTimeout(() => {
          setMessage("");
        }, 8000)

        // clear the data on the other four hooks
        setProductName("");
        setProductDescription("");
        setProductCost("");
        setProductPhoto("");
      }
      catch(error){
        setLoading("");
        setError("Failed to add the product. Please Try again...")

      }
    }




  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <h2>Add Product</h2>

          {loading}
          {message}
          {error}

          <input
          type="text"
          placeholder="Enter the product Name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          className="form-control"
          required /> <br />

          {/* {product_name} */}

          <textarea placeholder="Enter some Description of the product"
          className="form-control"
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}
          required></textarea> <br />

          {/* {product_description} */}

          <input type="number"
          placeholder="Enter the price"
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}
          className="form-control" /> <br />

          {/* {product_cost} */}

          <label>Product Photo</label> <br />
          <input type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setProductPhoto(e.target.files[0])}
          required /> <br /> <br />

          <button type="submit" className="btn btn-danger">Add product</button>
        </form>
      </div>
    </div>
  )
}

export default Addproducts