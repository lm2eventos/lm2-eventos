import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(propis) {

    let isLogado = sessionStorage.getItem("logado");
    const [logado, setLogado] = useState(isLogado === "S" ? true : false);

    return (
        <AuthContext.Provider value={{ logado, setLogado }}>
            {propis.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };