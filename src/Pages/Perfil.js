// import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Loader from '../Components/Spinner/Spinner';
import { api_url } from '../Components/utils/utils';
import Cookies from 'universal-cookie';
import axios from 'axios';
// import { withRouter } from "react-router-dom";
import { Tab } from 'semantic-ui-react';
import Tab1 from '../Components/Perfil/UsuarioPerfil';
import Tab2 from '../Components/Perfil/PreguntasUsuario';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const cookies = new Cookies();
const user = cookies.get('cookie1');

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,

      usuarioUpdate: {
        userid: user.userid,
        usernombre: user.usernombre,
        userapellido: user.userapellido,
        userfechanacimiento: user.userfechanacimiento,
        usernick: user.usernick,
        userpass: user.userpass,
        useremail: user.useremail,
        userfoto: user.userfoto,
        usersexo: user.usersexo,
        userpuntaje: user.userpuntaje,
      },
      preguntas: {},
    };
  }
  componentDidMount() {
    this.fetchData();

    console.log(this.state.preguntas);
  }
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: responsePregunta } = await axios.get(
        `${api_url}/api/customqueries/pregXuser/${user.userid}`
      );
      const responseUsuario = await axios.get(
        `${api_url}/api/usuario/${user.userid}`
      );

      this.setState({
        preguntas: responsePregunta,
        usuario: responseUsuario,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log('aqui');
      console.log(error);
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  handleChangeUpdate = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      usuarioUpdate: {
        ...this.state.usuarioUpdate,
        userid: this.state.usuarioUpdate.userid,
        usernombre: this.state.usuarioUpdate.usernombre,
        userapellido: this.state.usuarioUpdate.userapellido,
        userfechanacimiento: this.state.usuarioUpdate.userfechanacimiento,
        usernick: this.state.usuarioUpdate.usernick,
        userpass: this.state.usuarioUpdate.userpass,
        usersexo: this.state.usuarioUpdate.usersexo,
        useremail: this.state.usuarioUpdate.useremail,
        userfoto: this.state.usuarioUpdate.userfoto,
        [e.target.name]: e.target.value,
      },
    });
  };
  onClickButtonUpdate = async (e) => {
    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      e.preventDefault();
      const response = await axios.put(
        `${api_url}/api/usuario/${this.state.usuarioUpdate.userid}`,
        this.state.usuarioUpdate
      );
      cookies.set('cookie1', this.state.usuarioUpdate, { path: '/' });
      window.location.reload();

      this.setState({
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  panes = [
    {
      menuItem: { key: 'Perfil', icon: 'user', content: 'Perfil' },
      render: () => (
        <Tab1
          eventoUpdate={this.handleChangeUpdate}
          formValuesUpdate={this.state.usuarioUpdate}
          buttonClickUpdate={this.onClickButtonUpdate}
        />
      ),
    },
    {
      menuItem: {
        key: 'Preguntas',
        icon: 'question circle',
        content: 'Preguntas',
      },
      render: () => <Tab2 preguntasData={this.state.preguntas.data} />,
    },
    {
      menuItem: { key: 'Respuestas', icon: 'user', content: 'Respuestas' },
      render: () => <Tab1 />,
    },
  ];
  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <div>Error</div>;
    return (
      <div style={{ marginTop: '2em' }}>
        <Tab
          menu={{
            style: { backgroundColor: '#283049' },
            inverted: true,
            fluid: true,
            vertical: true,
          }}
          panes={this.panes}
          menuPosition='left'
        />
      </div>
    );
  }
}

export default Perfil;
