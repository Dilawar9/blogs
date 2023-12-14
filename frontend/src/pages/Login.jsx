import React, { useState } from 'react'
import axios from 'axios'

function Login() {
    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const submit=()=>{
        if(email!=="" && password!==""){
            axios.post("http://localhost:3002/login",{
                email:email,
                password:password
            })
            .then((res)=>{
                if(res.data.status==="success"){
                    alert(res.data.message)
                }else if(res.data.status==="fals"){
                    alert(res.data.message)
                }
            })
            .catch((error)=>{
                alert(error.message)
            })
            .finally();
        }else{
            alert("please Enter Data")
        }
    }
    return (

        <>
            <div className='container border w-50 border  p-5 mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <form>
                            <h1>Login form</h1>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password"   value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login