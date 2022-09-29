import {Search, FileCheck, X} from 'react-bootstrap-icons'
import {Modal, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import cars_default from "../../Catalog/Itens/itens.json";
import Item from "../../Catalog/Itens/Item";
import axios from "axios";

export default function AdminList(token: any, removeToken: any) {
    const default_content = {
        "id": 0,
        "title": "Titulo do seu anuncio",
        "description": "Breve descrição: Ex: Automático",
        "photo": "Foto",
        "year": 0,
        "km": 0,
        "city": "Cidade",
        "price": 1000,
        "category": {
            "id": 1,
            "label": 'SUV'
        }
    }

    const [responseMessage, setresponseMessage] = useState({
        "identification":"",
        "message": ""
    })

    // manage the modals
    const [modalContent, setmodalContent] = useState(default_content)
    const [show, setShow] = useState("");
    const [selected, setselected] = useState(cars_default[0]);
    const handleClose = () => {
        setShow("");
        setselected(modalContent)
    }

    function handleShow(selected: typeof cars_default[0], modal: string) {
        setShow(modal);
        if (modal === 'modal-one'){
            setselected(selected);
        }
        if (modal === 'modal-two'){
            setselected(selected)
            setupdateForm(selected)
        }
        if (modal === 'modal-three'){
            setselected(selected)
            setdeleteID(selected.id)
        }
    }



    // List all carts
    const [list, setList] = useState(cars_default);

    function refreshList(){
        let mounted = true;
        getList().then(items => {
            if(mounted) {
                setList(items)
            }
        });
    }

    function getList() {
        return fetch('http://3.143.227.14:5000/cars')
            .then(data => data.json())
    }

    useEffect(() => {
        let mounted = true;
        getList()
            .then(items => {
                if(mounted) {
                    setList(items)
                }
            });
    }, [])

    // creates a car
    const [createForm, setcreateForm] = useState(
        {
            "title": "",
            "description": "",
            "photo": undefined,
            "year": 0,
            "km": 0,
            "city": "",
            "price": 0,
            "category_id": 1
        }
    )

    function createCar(event: any) {
        event.preventDefault();
        console.log(token)
        axios({
            method: "POST",
            url: "http://3.143.227.14:5000/cars",
            data: {
                ...createForm
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then((response: any) => {
                setresponseMessage({
                    identification: "success",
                    "message": "Anúncio Criado com Sucesso"
                })
                refreshList()

            }).catch((error: any) => {
            if (error.response) {
                setresponseMessage({
                    identification: "error",
                    "message": "Erro ao criar objeto"
                })
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.reload()
                }
            }
        })
        // close modal
        setShow("");

    }

    function handleChange(event: any) {
        const {value, name} = event.target
        if (name === "photo") {
            const file = event.target.files[0]
            setcreateForm(prevNote => ({
                ...prevNote, [name]: file
            }))
        }
        else if (name === "category_id"){
            const value = parseInt(event.target.value)
            setcreateForm(prevNote => ({
                ...prevNote, [name]: value
            }))
        }
        else {
            setcreateForm(prevNote => ({
                ...prevNote, [name]: value
            }))
        }
    }

    // update car
    const update_content = {
        "id": 0,
        "title": "Titulo do seu anuncio",
        "description": "Breve descrição: Ex: Automático",
        "photo": "Foto",
        "year": 0,
        "km": 0,
        "city": "Cidade",
        "price": 1000,
        "category": {
            "id": 1,
            "label": 'SUV'
        }
    }

    const [updateForm, setupdateForm] = useState(update_content)

    function updateCar(event: any) {
        event.preventDefault();
        const url = 'http://3.143.227.14:5000/cars/' + updateForm.id
        axios({
            method: "PUT",
            url: url,
            data: {
                ...updateForm
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then((response: any) => {
                setresponseMessage({
                    identification: "success",
                    "message": "Anúncio Editado com sucesso"
                })
                refreshList()
            }).catch((error: any) => {
            setresponseMessage({
                identification: "error",
                "message": "Erro ao editar objeto"
            })
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.reload()
                }
            }
        })
        // close modal
        setShow("");

    }

    function handleChangeModelTWO(event: any){
        const {value, name} = event.target
        if (name === "photo") {
            const file = event.target.files[0]
            setupdateForm(prevNote => ({
                ...prevNote, [name]: file
            }))
        }
        else if (name === "category_id"){
            const value = parseInt(event.target.value)
            setupdateForm(prevNote => ({
                ...prevNote, [name]: value
            }))
        }
        else {
            setupdateForm(prevNote => ({
                ...prevNote, [name]: value
            }))
        }
    }

    // delete a car
    const [deleteID, setdeleteID] = useState(0)

    function deleteCar(event: any) {
        event.preventDefault();
        const url = 'http://3.143.227.14:5000/cars/' + deleteID
        axios({
            method: "DELETE",
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then((response: any) => {
                setresponseMessage({
                    identification: "success",
                    "message": "Anúncio Deletado com sucesso"
                })
                refreshList()
            }).catch((error: any) => {
            if (error.response) {
                setresponseMessage({
                    identification: "error",
                    "message": "Erro ao Deletar objeto"
                })
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.reload()
                }
            }
        })
        // close modal
        setShow("");

    }


    return (
            <div className="container">
                {
                    responseMessage.identification === "error" ?
                        (<div className="alert alert-danger">
                        <span>{responseMessage.message}</span>
                    </div>) : null
                }
                {
                    responseMessage.identification === "success" ?
                        (<div className="alert alert-success">
                            <span>{responseMessage.message}</span>
                        </div>) : null
                }
                <div className="row">
                    <div className="col-10">
                        <h2>Registro de anúncios</h2>
                    </div>
                    <div className="col-2 text-right">
                        <button className="btn btn-success" onClick={() => handleShow({...update_content}, "modal-one")}>
                            Criar seu Anúncio
                        </button>
                    </div>
                </div>
                <p>Use a tabela para pesquisar, editar, criar ou deletar seus anúncios</p>
                <input className="form-control" id="myInput" type="text" placeholder="Search.."/>
                <br/>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Titulo do Anuncio</th>
                        <th>Descrição</th>
                        <th>Ano</th>
                        <th>Km</th>
                        <th>Cidade</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th className='text-center'>Ações</th>
                    </tr>
                    </thead>
                    <tbody id="myTable">
                    {list.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.year}</td>
                            <td>{item.km}</td>
                            <td>{item.city}</td>
                            <td>{item.price}</td>
                            <td>{item.category.label}</td>
                            <td className='text-center'>
                                <button className="btn btn-primary" onClick={() => handleShow({...item}, "modal-one")}>
                                    &nbsp; <Search/> &nbsp;
                                </button>
                                <button className="btn btn-warning" onClick={() => handleShow({...item}, "modal-two")}>
                                    &nbsp; <FileCheck/> &nbsp;
                                </button>
                                <button className="btn btn-danger" onClick={() => handleShow({...item}, "modal-three")}>
                                    &nbsp; <X/> &nbsp;
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Modal show={show === 'modal-one'} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {selected.id === 0 ?
                                <>Criar Anúncio</>  :
                                <>Veja como seu anúncio está disponível</>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> {selected.id === 0 ?
                        <div>
                            <form className="mx-4 p-5">
                                <div className="form-outline mb-4">
                                    <label htmlFor="title">Título do anúncio</label>
                                    <input onChange={handleChange}
                                           type="text"
                                           className="form-control"
                                           placeholder="Titulo do seu anuncio"
                                           name="title"
                                           value={createForm.title}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="description">Description</label>
                                    <input onChange={handleChange}
                                           type="text"
                                           className="form-control"
                                           name="description"
                                           placeholder="Descrição.. Ex: Automático, manual"
                                           value={createForm.description}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="year">Ano</label>
                                        <input onChange={handleChange}
                                               type="number"
                                               className="form-control"
                                               name="year"
                                               placeholder="Ano Ex 20188"
                                               value={createForm.year}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="km">Km</label>
                                        <input onChange={handleChange}
                                               type="number"
                                               className="form-control"
                                               name="km"
                                               placeholder="Km rodados"
                                               value={createForm.km}
                                        />
                                    </div>
                                </div>
                                <br/>

                                <div className="form-outline mb-4">
                                    <label htmlFor="city">City</label>
                                    <input onChange={handleChange}
                                           type="text"
                                           className="form-control"
                                           placeholder="Cidade"
                                           name="city"
                                           value={createForm.city}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="price">Preço</label>
                                    <input onChange={handleChange}
                                           type="number"
                                           className="form-control"
                                           placeholder="Valor do Anuncio"
                                           name="price"
                                           value={createForm.price}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="price">Categoria:</label>
                                            <select className="form-control" name="category_id" onChange={handleChange}>
                                                <option value={1}>SUV</option>
                                                <option value={2}>HATCH</option>
                                                <option value={3}>CROSSOVER</option>
                                                <option value={4}>CONVERTIBLE</option>
                                                <option value={5}>SEDAN</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="text-center">
                                    <button  type="button" onClick={createCar} className="btn btn-primary btn-block mb-4">Criar</button>
                                </div>

                            </form>
                        </div>
                        :
                        <Item key={selected.id} {...selected} />
                    }

                    </Modal.Body>
                </Modal>
                <Modal show={show === 'modal-two'} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                                Editar Anúncio
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form className="mx-4 p-5">
                                <div className="form-outline mb-4">
                                    <label htmlFor="title">Título do anúncio</label>
                                    <input onChange={handleChangeModelTWO}
                                           type="text"
                                           className="form-control"
                                           placeholder="Titulo do seu anuncio"
                                           name="title"
                                           value={updateForm.title}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="description">Descrição</label>
                                    <input onChange={handleChangeModelTWO}
                                           type="text"
                                           className="form-control"
                                           name="description"
                                           placeholder="Descrição.. Ex: Automático, manual"
                                           value={updateForm.description}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="photo">Imagem</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleChangeModelTWO}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="year">Ano</label>
                                        <input onChange={handleChangeModelTWO}
                                               type="number"
                                               className="form-control"
                                               name="year"
                                               placeholder="Ano Ex 20188"
                                               value={updateForm.year}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="km">Km rodados</label>
                                        <input onChange={handleChangeModelTWO}
                                               type="number"
                                               className="form-control"
                                               name="km"
                                               placeholder="Km rodados"
                                               value={updateForm.km}
                                        />
                                    </div>
                                </div>
                                <br/>

                                <div className="form-outline mb-4">
                                    <input onChange={handleChangeModelTWO}
                                           type="text"
                                           className="form-control"
                                           placeholder="Cidade"
                                           name="city"
                                           value={updateForm.city}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="price">Preço</label>
                                    <input onChange={handleChangeModelTWO}
                                           type="number"
                                           className="form-control"
                                           placeholder="Valor do Anuncio"
                                           name="price"
                                           value={updateForm.price}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="category_id">Categoria</label>
                                            <select className="form-control" name="category_id" onChange={handleChangeModelTWO}>
                                                <option selected={updateForm.category.id === 1} value={1}>SUV</option>
                                                <option selected={updateForm.category.id === 2} value={2}>HATCH</option>
                                                <option selected={updateForm.category.id === 3} value={3}>CROSSOVER</option>
                                                <option selected={updateForm.category.id === 4} value={4}>CONVERTIBLE</option>
                                                <option selected={updateForm.category.id === 5} value={5}>SEDAN</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="text-center">
                                    <button  type="button" onClick={updateCar} className="btn btn-primary btn-block mb-4">Atualizar</button>
                                </div>

                            </form>
                        </div>

                    </Modal.Body>
                </Modal>
                <Modal show={show === 'modal-three'} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                                Tem certeza que deseja deletar?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form className="mx-4 p-5">

                                <div className="text-center">
                                    <button  type="button" onClick={deleteCar} className="btn btn-danger btn-block mb-4">DELETAR</button>
                                </div>

                            </form>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>

    )
}
