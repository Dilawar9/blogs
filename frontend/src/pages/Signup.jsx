import React from 'react'
import { useState } from 'react'
import axios from 'axios'




function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");

    const submit = () => {

        if (username !== "" && email !== "" && password !== "" && image !== "") {
            axios.post("http:localhost:3002/signup", {
                username: username,
                email: email,
                password: password,
                image: image
            },{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
                .then((res) => {
                    if (res.data.statu === "success") {
                        alert(res.data.message)
                    } else if (res.data.status === "fals") {
                        alert(res.data.message)
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finlay();
        } else {
            alert("Please Enter Data")
        }

    };

    return (
        <div className='container w-50 mt-5 p-5  bg-light'>
            <div className='row'>
                <div className='col-md-12'>
                    <form>
                        <h1>Signup Form</h1>
                        <div className="mb-3">
                            <label id="username" className="form-label">User Name</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => { setUsername(e.target.value) }} id="username" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email </label>
                            <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" />
                        </div>
                        {/* <div className="mb-3">
                            <label for="image" className="form-label">image</label>
                            <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files[0]) }} id="image" />
                        </div> */}
                        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup