import React from 'react';
import './estilo.css';
import Footer from '../componentes/footer';
import NavBar from '../componentes/menu'
import logo from './logo512.png';

function Site() {
    return <div>
        <NavBar />
        <section id="Topo">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="Aguarde">
                    Aguarde em Breve Novidades!!

                </p>
            </header>
        </section>

        <footer className='fixed-bottom'>
            <Footer />
        </footer>
    </div >

}
export default Site