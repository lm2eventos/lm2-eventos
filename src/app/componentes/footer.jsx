import React from 'react';
import './footer.css';

function Footer() {
    var data = new Date();

    return <footer className="rodape">
        <p className="mt-4" id="texto">&copy;{data.getFullYear()} <b>LM2 Eventos - Todos os Direitos Reservados</b></p>
    </footer>
}
export default Footer