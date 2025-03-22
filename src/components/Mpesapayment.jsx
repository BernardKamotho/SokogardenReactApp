import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Mpesapayment = () => {
    // We passed the state of our card from the component getproducts component
    // We shall use the useLocation hook to extract the different details passed from getproducts component
    const {product} = useLocation().state || {};

    // create use state hooks: phone number, message
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // create a function that will handle the payment process
    const submit = async (e) => {
        // prevent your site from reloading
        e.preventDefault()

        // update the message hook with some message
        setMessage("Please wait as we process your payment...")

        // create a form data object and add the phone
        const data= new FormData();

        // append the phone
        data.append("phone", phone);

        // append the cost of the product
        // the cost of the product you get it from the details passed from the useLocation hook
        data.append("amount", product.product_cost);

        // use axios to access the http method post
        const response = await axios.post("https://kimanibenkamotho.pythonanywhere.com/api/mpesa_payment", data)

        // update the message hook with a new message
        setMessage(response.data.message)

    }

    // console.log(product.product_name)
    // console.log(product.product_description)
    // console.log(product.product_cost)
    // console.log(product.product_photo)


  return (
    <div className='row justify-content-center mt-3'>
        <h1 className='text-danger'>Lipa na Mpesa</h1>
        <div className="col-md-6 card shadow p-3">

            <b className='text-success'>{message}</b>

        <h4>Product Name: <span className='text-primary'>{product.product_name}</span></h4>
        <form onSubmit={submit}>
           
            <h4>Price of the Product: <span className='text-primary'>{product.product_cost}</span></h4>
            <input 
            type="number"
            placeholder='Enter your mpesa number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='form-control' />
            <br />
            <br />
            {/* {phone} */}

            <button className='btn btn-success'>Make Payment</button>
        </form>
        </div>
    
    </div>
  )
}

export default Mpesapayment;