import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import api from "./config/api.js";
import Footer from './componentes/footer.jsx';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'
import Loading from './componentes/loading/loading.js';




function ListaBoleto() {

    var Year = new Date();
    const [boletos, setBoletos] = useState({ boletoCliente: [] });

    useEffect(() => {
        const fetchGetList = async () => {
            const { data } = await api.get("/cidades?UF=AC")
            setBoletos({ boletoCliente: data })
            console.log(data)
        }
        fetchGetList();
        // eslint-disable-next-line

    }, [])

    return <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <table className="mt-5 table table-responsive table-sm table-striped table-bordered w-100 ">
                        <thead>
                            <tr className=" titulo">
                                <th className='text-center' scope="col">Id Cidade</th>
                                <th className='text-center' scope="col">Cidade</th>
                                <th className='text-center' scope="col">UF</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>{
                            boletos.boletoCliente?.map((bol) => (
                                <tr key={bol.Id_Cidade}>
                                    <td>{bol.Id_Cidade}</td>
                                    <td>{bol.Nome_Cidade}</td>
                                    <td>{bol.UF}</td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div >






    </div >
}

export default ListaBoleto;
