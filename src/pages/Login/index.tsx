import React, {useState} from "react";
import axios from "axios";

export type UserData = {
    email: string;
    password: string;
};

interface Props {
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({setToken}: Props) {

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function logMeIn(event: any) {
        axios({
            method: "post",
            url:"http://3.143.227.14:5000/token",
            data:{
                email: loginForm.email,
                password: loginForm.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: any) => {
                setToken(response.data.access_token)
            }).catch((error: any) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        event.preventDefault()
    }

    function handleChange(event: any) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
    )
    }

    return (
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
                <br/><br/><br/><br/><br/>
                <form className="mx-4 p-5 login">
                    <div className="form-outline">
                        <h1 className="text-center">Login</h1>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={handleChange}
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={loginForm.email}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={handleChange}
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={loginForm.password}
                        />
                    </div>

                    <div className="text-center">
                            <button onClick={logMeIn} className="btn btn-primary btn-block mb-4">Logar</button>
                    </div>

                    <div className="text-center">
                        <p>Not a member? <a href="/register">Register</a></p>
                        <div className="col">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>
                </form>
                <br/><br/><br/><br/><br/>
            </div>
            <div className="col-4"></div>
        </div>
    );
};

