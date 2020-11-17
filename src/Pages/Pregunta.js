import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Spinner/Spinner';
import Categorias from '../Components/Categorias/Categorias';
import Clasificacion from '../Components/Clasificacion/Clasificacion';
import FormPregunta from '../Components/Pregunta/Pregunta';
import { api_url } from '../Components/utils/utils';

class Pregunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,

      categorias: {
        catid: '',
        catnombre: '',
        catdescripcion: '',
      },
      pregunta: {
        userid: '',
        catid: 1,
        pregtexto: '',
        pregdetalle: '',
        catnombre: 'Sexualidad',
      },
    };
  }
  componentDidMount() {
    this.fetchData();
    this.setState({
      pregunta: {
        userid: parseInt(this.props.match.params.userID),
        catid: 1,
        pregtexto: '',
        pregdetalle: '',
        catnombre: 'Sexualidad',
      },
    });
  }

  handleChange = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      pregunta: {
        ...this.state.pregunta,
        userid: parseInt(this.props.match.params.userID),
        catnombre: this.state.pregunta.catnombre,
        catid: this.state.pregunta.catid,
        [e.target.name]: e.target.value,
      },
    });
  };
  dropDownChange = (e, { value }) => {
    this.setState({
      pregunta: {
        userid: parseInt(this.props.match.params.userID),
        catid: value,
        pregtexto: this.state.pregunta.pregtexto,
        pregdetalle: this.state.pregunta.pregdetalle,
        catnombre: e.target.textContent,
      },
    });
  };

  onClickButton = async (e) => {
    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      //e.preventDefault();
      const response = await axios.post(
        `${api_url}/api/pregunta`,
        this.state.pregunta
      );
      this.setState({
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
      console.log(error);
    }
  };

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data } = await axios.get(`${api_url}/api/categoria`);
      this.setState({
        categorias: data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  render() {
    console.log(this.state.pregunta);
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <div>Error</div>;
    return (
      <div style={{ display: 'flex' }}>
        <Categorias />
        <FormPregunta
          evento={this.handleChange}
          formValues={this.state.pregunta}
          buttonClick={this.onClickButton}
          categorias={this.state.categorias}
          dropDownChange={this.dropDownChange}
        />
        <Clasificacion />
      </div>
    );
  }
}

export default Pregunta;