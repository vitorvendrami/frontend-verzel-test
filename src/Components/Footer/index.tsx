import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter className='text-center text-lg-start ' style={{backgroundColor: "#000", color: "#fff"}}>
            <section className='row'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h1 className='text-uppercase  mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                KAVAK
                            </h1>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4 text-muted'>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Comprar carro</small>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Vender Carro</small>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>App Kavak</small>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Onde estamos</small>
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4 text-muted'>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Perguntas Frequentes</small>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Blog</small>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Guia de Preços</small>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <small>Carreiras</small>
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 text-muted'>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Contato
                            </p>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Imprensa
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                Brasil
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <div className='m-5' style={{ backgroundColor: '#fff', height: "1px"}}>
                <hr/>
            </div>
            <div className='text-center p-3 text-muted'>
                Copyright © 2022 KAVAK. Todos os direitos reservados. · Política de Privacidade · Termos e Condições ·Definições de cookies

                KAVAK TECNOLOGIA E COMERCIO DE VEICULOS LTDA., inscrita no CNPJ sob o nº 36.740.390/0001-83, com sede na Estrada dos Alpes, nº 855, Galpão A, Módulo 1, Jardim Belval, Barueri/SP, CEP 06.423-080
            </div>
        </MDBFooter>
    );
}
