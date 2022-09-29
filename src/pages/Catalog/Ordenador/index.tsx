import styles from "./Ordenador.module.scss";
import opcoes from "./opcoes.json";
import React, {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import classNames from "classnames";
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';

interface Props {
    ordenador: string,
    setOrdenador: React.Dispatch<React.SetStateAction<string>>
}

export default function Ordenador({ordenador, setOrdenador}: Props) {
    const [aberto, setAberto] = useState(false);
    const nomeOrdenador = ordenador && opcoes.find(opcao => opcao.value === ordenador)?.nome;

    return (
        <Dropdown>
            <Dropdown.Toggle id='dropdown-basic' style={{color:"#0a448a", backgroundColor:"#f6f6f6"}}>
                Ordenar por
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {opcoes.map(opcao => (
                    <Dropdown.Item
                        key={opcao.value}
                        onClick={() => setOrdenador(opcao.value)}
                    >
                        {opcao.nome}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
