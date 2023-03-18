import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './listaBoleto.css';
import api from "../../config/api.js";
import MenuCliente from '../NavBar/menuCliente';
import Footer from '../../componentes/footer.jsx';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'
import Loading from '../../componentes/loading/loading.js';




function ListaBoleto() {
    useState(() => {
        Loading.show("Aguarde...");
        // eslint-disable-next-line
    }, [])

    var Year = new Date();
    const [boletos, setBoletos] = useState({ boletoCliente: [] });
    const [busca, setBusca] = useState(Year.getFullYear());
    const [anobusca, setAnoBusca] = useState(Year.getFullYear())
    const [years, setyears] = useState([]);
    //const [modalIsOpen, setIsOpen] = useState(false);
    //  const [boleto, setBoleto] = useState("")


    /* function handleIsOpen() {
         setIsOpen(true);
     }
     
     
     function handlecloseModal() {
         setIsOpen(false);
     }
     
     const styles = {
         color: "white",
         fontSize: "15px",
         borderColor: "transparent",
         backgroundColor: "#4ca7f1",
         float: "right",
         margin: "7px",
         borderRadius: "5px"
     
     }
     
     const customstyles = {
         overlay: {
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             backgroundColor: '#6666669a'
         },
         content: {
             top: '48%',
             left: '50%',
             right: 'auto',
             bottom: 'auto',
             width: "90%",
             height: "90%",
             marginRight: '-50%',
             transform: 'translate(-50%,-50%)',
             padding: "0px"
         }
     }*/



    var Situacao, Impressao;
    var EmitirNota, NumeroNotaI;
    var NumeroNotaT;/* NotaFiscalT, NotaFiscalI;*/
    EmitirNota = descriptografar(sessionStorage.getItem('utilizaNF'));

    function descriptografar(value) {
        var decipher = crypto.createDecipher('aes-256-ctr', 'idealsis-site-2005');
        var sa = decipher.update(value, 'base64', 'utf-8');
        return (sa += decipher.final('utf-8'));
    }

    useEffect(() => {
        Loading.show("Aguarde....")
        const fetchGetList = async () => {
            const { data } = await api.get("/cidades/SP" )
            setBoletos({ boletoCliente: data })
            Loading.hide();
        }
        fetchGetList();
        // eslint-disable-next-line

    }, [busca])

    function alterarAno(event) {
        setAnoBusca(event.target.value)
    }

    var x = 1;
    const itensCopy = Array.from(years);
    var atualAno = Year.getFullYear() - 1
    useState(() => {
        while (x < 7) {
            itensCopy.push({ ano: atualAno });
            atualAno--;
            x++;
        }
        setyears(itensCopy);
    })

    if (sessionStorage.getItem("Tipo") !== "C") {
        return <Redirect to="/login" />;
    }

    return <div>
        <MenuCliente />
        <div className='container'>
            <nav className="navbar pesquisa mt-2">
                {/* eslint-disable-next-line*/}
                <a class="navbar-brand"></a>
                <form class="d-flex" role="search">
                    <select onChange={alterarAno} className="custom-select custom-select-lg  me-2 w-100" id="ano">
                        <option value={Year.getFullYear()}>{Year.getFullYear()}</option>
                        {years.map(({ ano }) => (
                            <option value={ano}>{ano}</option>
                        ))}
                    </select>
                    <button onClick={() => setBusca(anobusca)} class="btn btn-outline-primary" type="button">Buscar</button>
                </form>
            </nav>

            <div className='row'>
                <div className='col-md-12'>
                    <table className="table table-responsive table-sm table-striped table-bordered w-100 ">
                        <thead>
                            <tr className=" titulo">
                                <th className='codigo' scope="col">Nº Titulo</th>
                                <script type="text/javascript">
                                    {NumeroNotaT = (EmitirNota === "S") ?
                                        <th className='codigo' scope="col">Nº NF</th> :
                                        null}
                                </script>
                                {NumeroNotaT}

                                <th className='data' scope="col">Data Emissão</th>
                                <th className='data' scope="col">Data Vencimento</th>
                                <th className='valor' scope="col">Valor</th>
                                <th className='situacao' scope="col"> Situação</th>
                                <th scope="col" className="col-acao">Boleto</th>
                                {/*  <script type="text/javascript">
                                    {NotaFiscalT = (EmitirNota === "S") ?
                                        <th scope="col" className="col-acao">NF</th> :
                                        null}
                                </script>
                        {NotaFiscalT}*/}
                            </tr>
                        </thead>
                        <tbody className='text-center'>{
                            boletos.boletoCliente?.map((bol) => (
                                <tr key={bol.ID_TITULO_RECEBER}>
                                    <td>{bol.NUMERO_DOCUMENTO}</td>
                                    <script type="text/javascript">
                                        {NumeroNotaI = (EmitirNota === "S") ?
                                            <td>{bol.NUMERO_NOTA_FISCAL}</td> :
                                            null}
                                    </script>
                                    {NumeroNotaI}
                                    <td>{bol.DATA_EMISSAO}</td>
                                    <td>{bol.DATA_VENCIMENTO}</td>
                                    <td>R$ {bol.VALOR},00</td>
                                    <script type="text/javascript">
                                        {
                                            Situacao = (bol.SITUACAO === "F") ?
                                                <td className='situacao' style={{ color: 'green' }}>Pago</td> :
                                                (bol.SITUACAO === "A") ?
                                                    <td className='situacao'>Em Aberto</td> :
                                                    <td className='situacao' style={{ color: 'red' }}>Vencido</td>


                                        }
                                    </script>
                                    {Situacao}
                                    <script type="text/javascript">
                                        {Impressao = (bol.SITUACAO === "F") ?
                                            <td className='text-center'>
                                                <img src="../img/correct.png" alt="" width="25" className="fas fa-edit icone-acao"></img>
                                            </td> :
                                            <td className='text-center'>
                                                <img onClick={() => abreBoleto(bol.ID_TITULO_RECEBER, bol.NUMERO_DOCUMENTO)} src="../img/imprimir.png" alt="" width="25" className="fas fa-edit icone-acao"></img>
                                            </td>
                                        }
                                    </script>
                                    {Impressao}
                                    {/*   < script type="text/javascript" >
                                        {
                                            NotaFiscalI = (EmitirNota === "S") ?
                                                <td className='text-center'>
                                                    <img onClick={() => abreBoleto(bol.ID_TITULO_RECEBER, bol.NUMERO_DOCUMENTO)} src="../img/imprimir.png" alt="" width="25" className="fas fa-edit icone-acao"></img>
                                                </td> :
                                                null
                                        }
                                    </script>
                                    {NotaFiscalI}*/}
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
        <footer className='mt-5'>
            <Footer />
        </footer>



  



    </div >
}

export default ListaBoleto;
