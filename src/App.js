import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import MainPage from './Pages/Main';
import PreguntaPage from './Pages/Pregunta';
import RespuestasPage from './Pages/Respuesta';
import Buscar from './Pages/Buscar';
import Categorias from './Pages/Categorias';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/pregunta' component={PreguntaPage} />
        <Route exact path='/respuesta/:preguntaID' component={RespuestasPage} />
        <Route exact path='/buscar' component={Buscar} />
        <Route exact path='/categorias' component={Categorias} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
