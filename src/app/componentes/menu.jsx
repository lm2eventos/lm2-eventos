import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


function Menu() {
    return <nav className="navbar navbar-expand-lg navbar-dark fixed-top menu" >
        <div class="container-fluid">
            <Link to='/' className="navbar-brand" href="#Topo">
                <img src="../../img/logo512.png" alt="" width="40" height="30" className="d-inline-block align-text-top logo" />
                Eventos
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="/" className="nav-link active">Início</a>
                    </li>
                    <li className="nav-item">
                        <a href="/eventos" className="nav-link active">Eventos</a>
                    </li>

                    <li className="nav-item dropdown">
                    </li>
                    <li className="nav-item">
                        <a href="/contato" className="nav-link active">Contato</a>
                    </li>
                    <li className="nav-item">
                        <a href="/quem-somos" className="nav-link active">Quem Somos</a>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link active">Fotos</a>
                    </li>
                    <li className="nav-item">
                        <a href="/contato" className="nav-link active">Inscrições</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

}
export default Menu