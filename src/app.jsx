import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './app/Context/auth.jsx';


/* Paginas */
import home from './app/home/site.jsx';
import ddf from './app/teste.jsx';

/*Soluções*/

function App() {
  const { logado } = useContext(AuthContext);


  function SecureRoute({ ...params }) {
    if (!logado) {
      return <Redirect to='/' />
    }
    else {
      return <Route {...params} />
    }
  }

  return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={home} />
      <Route exact path='/dd' component={ddf} />
      <Route exact path='*' component={home} />

    </Switch>
  </BrowserRouter>;
}

export default App;

