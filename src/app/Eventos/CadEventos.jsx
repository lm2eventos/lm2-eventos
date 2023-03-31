import React, { useState, useEffect } from 'react';
import api from "../config/api.js";
import Footer from '../componentes/footer.jsx';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'
import './eventos.css'
import Loading from '../componentes/loading/loading.js';
import Menu from '../componentes/menu.jsx';




function CadEvento() {

    const [estado, setEstado] = useState('')
    const [idCidade, setIdCidade] = useState('')
    const [cidades, setCidade] = useState({ cidadesEstado: [] });

    function alterarEstado(event) {
        setEstado(event.target.value)
    }

    function alterarIdCidade(event) {
        setIdCidade(event.target.value)
    }


    useEffect(() => {
        const fetchGetList = async () => {
            const { data } = await api.get("/cidades?UF=" + estado)
            setCidade({ cidadesEstado: data })
        }
        fetchGetList();
        // eslint-disable-next-line

    }, [estado])


    function CadastrarEvento() {
        const data = document.getElementById('dataEvento').value; // assume que a data é "11/10/2023"
        const mes = data.split('-')[1];
        api.post('/cidades', {
            "Data_Evento": document.getElementById('dataEvento').value,
            "Nome_Evento": document.getElementById('nomeEvento').value,
            "Id_Cidade_Evento": parseInt(idCidade),
            "Organizador": document.getElementById('nomeResponsavel').value,
            "Link_Inscricao": document.getElementById('linkInscricao').value,
            "Mes_Evento": parseInt(mes),
            "Telefone_Organizador": document.getElementById('telefone').value
        }
        ).then(function (AxiosResponse) {
            Loading.show('Aguarde...')
            if (AxiosResponse.status === 200) {
                document.getElementById('dataEvento').value = '  /  /   ';
                document.getElementById('nomeEvento').value = '';
                document.getElementById('floatingSelect').value = 0
                document.getElementById('nomeResponsavel').value = '';
                document.getElementById('linkInscricao').value = '';
                document.getElementById('telefone').value = '';
                toastr.success('Evento Enviada Com Sucesso', 'Sucesso')
            }
            else {
                Loading.hide();
                toastr.error("Erro ao Enviar Mensagem", "Erro ao Enviar")
            }
        }).catch(function (error) {
            toastr.error(error, "Erro ao Enviar")
            Loading.hide();

        });
    }


    return <div>
        <Menu />
        <div className='container'>
            <h1 className='text-center mt-2'> Cadastro Evento</h1>
            <div className='row mt-5'>
                <div className="row gx-3">
                    <div className="col-sm-6">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Nome do Evento</b>
                            <input type="text" className="form-control nomeContato" name="hireUsFormNameFirstName" id="nomeEvento" placeholder="Nome Evento" aria-label="Nome" autoFocus required />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Nome Responsável Evento</b>
                            <input type="text" className="form-control emailContato" id="nomeResponsavel" placeholder="Nome Responsável Evento" required />
                        </div>
                    </div>
                </div>

                <div className="row gx-3">
                    <div className="col-sm-6">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Telefone do Responsável</b>
                            <input type="telephone" className="form-control telefoneContato" id="telefone" placeholder="(99) 99999-9999" required
                                maxLength={15}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Data do Evento</b>
                            <input type="date" className="form-control telefoneContato" id="dataEvento" required
                                maxLength={15}
                            />
                        </div>
                    </div>
                </div>
                <div className='row gx-3'>
                    <div className="col-sm-6">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Estado</b>
                            <select className="form-select"
                                id="floatingSelect" aria-label="Floating label select example"
                                onChange={alterarEstado}>
                                <option selected value="">Selecione um Estado</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="SP">São Paulo</option>

                            </select>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Cidade</b>
                            <select className="form-select" id="floatingSelect"
                                aria-label="Floating label select example" onChange={alterarIdCidade}>
                                <option selected>Selecione uma Cidade</option>
                                {
                                    cidades.cidadesEstado?.map((bol) => (
                                        <option value={bol.Id_Cidade}>{bol.Nome_Cidade}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row gx-3'>
                    <div className="col-sm-12">
                        <div className="mb-1">
                            <b className="labelDesc" for="exampleFormControlInput1">Link Inscrição</b>
                            <input type="text" className="form-control emailContato" id="linkInscricao" placeholder="Link de Inscrição do Evento" required />
                        </div>
                    </div>


                </div>


                <div className='text-center mt-3 mb-5'>
                    <button className="btnEnviar btn w-50 btn-lg" type="button" onClick={() => CadastrarEvento()}>Enviar</button>
                </div>
            </div >
        </div >

        <footer>
            <Footer />
        </footer>
    </div >
}

export default CadEvento;
