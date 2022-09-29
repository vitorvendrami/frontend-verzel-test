import { Link } from 'react-router-dom';
import styles from './Menu.module.scss'
import {Container, Navbar} from "react-bootstrap";
import React from "react";

interface Props {
    removeToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function Menu({removeToken}: Props) {
    return (
        <Navbar >
            <Container>
                <Navbar.Brand href="/">KAVAK</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a href="/admin">Admin</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

