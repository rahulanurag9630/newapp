import { useState } from "react"
import React  from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "",email:"",password:"",cpassword: ""})
    const handleSubmit = async (e) => {
        const {name, email,password} = credentials;
        e.preventDefault()
        // API Call 
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name , email , password})

        });
        const json = await response.json()
        console.log(json);
        if(json.success)
        {
            //redirect and save the auth tokent
            navigate('/');
            localStorage.setItem(json.success,"token",json.authToken);
            props.showAlert("Account created successfully","success")
        }
        else{
           props.showAlert("Invalid credentials","danger") 
        }

    } 
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name='password' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="cpassword" class="form-label">Comfirm Password</label>
                    <input type="password" class="form-control" id="cpassword" name='cpassword' onChange={onChange} />
                </div>
               
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp