import React, { useState } from 'react';
import Menu from '../componentes/menu';
import Footer from '../componentes/footer';
import './contato.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import api from '../config/api';
import { Mask } from "../config/Util.js";
import Loading from '../componentes/loading/loading.js'
import ReCAPTCHA from "react-google-recaptcha";
import Iframe from 'react-iframe';


function Contato() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [setor, setSetor] = useState('');
    const [telefone, setTelefone] = useState('');
    const [solicitacao, setSolicitacao] = useState('');
    const [validHuman, setValidHuman] = useState(false);

    function onChange(value) {
        if (value !== null) {
            setValidHuman(true);
        }
        else {
            setValidHuman(false);
        }
    }

    function EnviarEmail() {
        if (validHuman === false) {
            toastr.warning("Preencha o Captcha!", "Erro ao Enviar")
        }
        else if (email === '' || telefone === '' || solicitacao === '' || document.getElementById('setor').value === '0') {
            toastr.warning("Todos os Campos Devem ser Preenchidos!!", "Atenção")
        }
        else {
            Loading.show("Aguarde...");
            api.post("/EnviarEmailContato", {
                "nome": nome, "email": email, "setor": setor,
                "telefone": telefone, "mensagem": solicitacao
            }).then(function (AxiosResponse) {
                if (AxiosResponse.status === 200) {
                    document.getElementById('nome').value = ''; // Limpa o campo
                    setNome('');
                    document.getElementById('email').value = ''; // Limpa o campo
                    setEmail('');
                    document.getElementById('telefone').value = ''; // Limpa o campo
                    setTelefone('');
                    document.getElementById('solicitacao').value = ''; // Limpa o campo
                    setSolicitacao('');
                    document.getElementById('setor').value = 0;
                    Loading.hide();
                    setValidHuman(false);
                    toastr.success('Mesagem Enviada Com Sucesso', 'Sucesso')
                }
                else {
                    toastr.error("Erro ao Enviar Mensagem", "Erro ao Enviar")
                }
            }).catch(function (error) {
                toastr.error(error, "Erro ao Enviar")
                Loading.hide();

            });
        }
    }


    function alterarNome(event) {
        setNome(event.target.value)
    }
    function alterarEmail(event) {
        setEmail(event.target.value)
    }
    function alterarSetor(event) {
        setSetor(event.target.value)
    }
    function alterarTelefone(event) {
        setTelefone(event.target.value)
    }
    function alterarSolicitacao(event) {
        setSolicitacao(event.target.value)
    }

    return <div className='contato'>
        <Menu />
        <div className="container mt-4 mb-5 content-space-t-3 content-space-t-lg-5 content-space-b-2">

            <div className="row g-1">
                <div className="col-lg-6">
                    <div className="ps-lg-5">
                        <div class="row g3 cardOpacity">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="row gx-3 container">
                                        <div className="col-sm-2 text-center mt-2">
                                            <img src="./img/telefone1.png" width="55px" alt="..." />
                                        </div>
                                        <div className="col-sm-7">
                                            <h5 className="mb-1 tituloC">Telefone:</h5>
                                            <p className="labelDesc">+55 18 3691-1764 / 18 3691-3907</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 mt-2">
                                <div className="card">
                                    <div className="row gx-3 container">
                                        <div className="col-sm-2 text-center mt-2">
                                            <div className="imagemB rounded-circle">
                                                <img src="./img/email2.png" width="55px" alt="..." />
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <h5 className="mb-1 tituloC">Email:</h5>
                                            <p className="labelDesc">suporte@idealsis.com.br</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 mt-2">
                                <div className="card">
                                    <div className="row gx-3 container">
                                        <div className="col-sm-2 text-center mt-2">
                                            <div className="imagemB rounded-circle">
                                                <img src="./img/endereco1.png" width="55px" alt="..." />
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <h5 className="mb-1 tituloC">Endereço:</h5>
                                            <label className="labelDesc">Av. Frei Marcelo Manília, 695 - Sala 1 Centro Buritama - SP</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 mt-2 mb-5">
                                <div className="card">
                                    <div className="row">
                                        <Iframe className="maps" width="425" height="235" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                            src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.1181054274302!2d" +
                                                "-50.147290785264374!3d-21.067944580138544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1" +
                                                "!3m3!1m2!1s0x949625ab80699499%3A0x4b554c1296aa11f4!2sIdealSis%20Sistema%20de%20Infor" +
                                                "m%C3%A1tica%20Ltda%20ME!5e0!3m2!1spt-BR!2sbr!4v1668560635462!5m2!1spt-BR!2sbr"}>
                                        </Iframe>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Formulario Contato*/}
                <div className="col-lg-6">
                    <div className="ps-lg-3">
                        <div className="card">
                            <div className="border-bottom text-center backgorundTitle">
                                <h3 className="tituloC">Contato</h3>
                            </div>
                            <div className="card-body ">
                                <form>
                                    <div className="row gx-3">
                                        <div className="col-sm-6">
                                            <div className="mb-1">
                                                <b className="labelDesc" for="exampleFormControlInput1">Nome</b>
                                                <input onChange={alterarNome} type="text" className="form-control nomeContato" name="hireUsFormNameFirstName" id="nome" placeholder="Nome" aria-label="Nome" autoFocus required />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-1">
                                                <b className="labelDesc" for="exampleFormControlInput1">Endereço de Email</b>
                                                <input onChange={alterarEmail} type="email" className="form-control emailContato" id="email" placeholder="email@site.com" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gx-3">
                                        <div className="col-sm-6">
                                            <div className="mb-1">
                                                <b className="labelDesc" for="exampleFormControlInput1">Telefone</b>
                                                <input onChange={alterarTelefone} type="telephone" className="form-control telefoneContato" id="telefone" placeholder="(99) 99999-9999" required
                                                    maxLength={15}
                                                    onInput={(e) => e.target.value = Mask.telefone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-1">
                                                <b className="labelDesc" for="exampleFormControlInput1">Setor</b>
                                                <select onChange={alterarSetor} className="custom-select custom-select-lg setorContato" id="setor">
                                                    <option selected value="0">Selecione uma Opção</option>
                                                    <option value="Suporte">Suporte</option>
                                                    <option value="Financeiro">Financeiro</option>
                                                    <option value="Administracao">Administração</option>
                                                    <option value="NaoSouCliente">Não Sou Cliente</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-1">
                                        <b className="labelDesc" for="exampleFormControlInput1">Descreva sua Solicitação</b>
                                        <textarea onChange={alterarSolicitacao} className="form-control solicitacao mt-1 descricaoContato" id="solicitacao" rows="5" required></textarea>
                                    </div>
                                    <ReCAPTCHA className='text-center modal-footer flex-column border-top-0'
                                        sitekey="6LeBzuwiAAAAAKsR8OnM8YjSetmkw6XKrZ5-SMs1"
                                        onChange={onChange}
                                    />

                                    <div className='text-center'>
                                        <button onClick={() => EnviarEmail()} className=" btnEnviar w-50 btn-lg" type="button">Enviar</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <Footer />
        </footer>
    </div >


}

export default Contato
