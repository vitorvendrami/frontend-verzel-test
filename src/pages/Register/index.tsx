import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import React, {useState} from "react";
import axios from "axios";


export type UserData = {
    email: string;
    password: string;
};

export default function Register() {

    const [registerForm, setregisterForm] = useState({
        email: "",
        password: "",
    })

    const [responseMessage, setresponseMessage] = useState(
        {"status": 0, "message": ""}
    )

    function regiterMe(event: any) {
        axios({
            method: "post",
            url:"http://3.143.227.14:5000/user/register",
            data:{
                email: registerForm.email,
                password: registerForm.password,
                "admin": 0
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: any) => {
                console.log(response)
                if (response.status === 201){
                    setresponseMessage({
                        "status": 201,
                        "message":response.data["message"]
                    })
                }
                else {
                    setresponseMessage({
                        "status": 500,
                        "message": "Falha ao criar usuário"
                    })
                }
            }).catch((error: any) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        // setloginForm(({
        //     email: "",
        //     password: ""}))

        event.preventDefault()
    }

    function handleChange(event: any) {
        const {value, name} = event.target
        setregisterForm(prevNote => ({
            ...prevNote, [name]: value})
        )
    }

    return (
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
                <br/><br/><br/><br/><br/>
                <form className=" mx-4 p-5">
                    <div className="form-outline">
                        <h1 className="text-center">Registro</h1>
                    </div>
                    {responseMessage.message?

                        <div className={ responseMessage.status==201 ? 'bg-success form-outline text-center' : 'bg- success form-outline'}>
                            <span>{responseMessage.message}</span>
                        </div>
                    :
                        <div className='form-outline text-center'>
                            Preenche os campos para se registrar!
                        </div>
                    }
                    <br/>
                    <div className="form-outline mb-4">
                        <input onChange={handleChange}
                               type="email"
                               className="form-control"
                               placeholder="Email"
                               name="email"
                               required={true}
                               value={registerForm.email}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={handleChange}
                               type="password"
                               className="form-control"
                               name="password"
                               placeholder="senha"
                               required={true}
                               value={registerForm.password}
                        />
                    </div>


                    <div className="text-center">
                        <button onClick={regiterMe} className="btn btn-primary btn-block mb-4">Cadastrar</button>
                    </div>

                    <div className="text-center">
                        <p>Já tem uma conta? <a href="/login">Login</a></p>
                        <div className="col">
                            <a href="#!">Esqueceu a senha?</a>
                        </div>
                    </div>
                </form>
                <br/><br/><br/><br/><br/>
            </div>
            <div className="col-4"></div>

        </div>
    );
};

