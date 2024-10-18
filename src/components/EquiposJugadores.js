import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';

export default class EquiposJugadores extends Component {

    cajaJugador = React.createRef();
    selectEquipo = React.createRef();


    state={

        equipos:[],
        plantilla:[],
    }


    buscarJugador=(e)=>{
        e.preventDefault();
    
        let nombre = this.cajaJugador.current.value.toLowerCase()  

           
        var jugadorBuscado = this.state.plantilla.filter(player => player.nombre.toLowerCase().startsWith(nombre))
        console.log("asdadadasd", jugadorBuscado)
    
      
    
        this.setState({
            plantilla: jugadorBuscado
            }
        )
        

    }

    mostrarEquipo=(e)=>{
        e.preventDefault();
        let idEquipo = this.selectEquipo.current.value
        let request = "api/Jugadores/JugadoresEquipos/" + idEquipo
        let url = Global.urlApiEjemplos + request
        axios.get(url).then(response=>{
            this.setState({
                plantilla:response.data
            })
        })

    }

    cargarEquipos=()=>{

        let request = "api/Equipos"
        let url = Global.urlApiEjemplos + request
        axios.get(url).then(response=>{
            console.log(response.data)
            this.setState({
                equipos:response.data
            })
        })



    }

    componentDidMount=()=>{
        this.cargarEquipos();
    }

  render() {
    return (
      <div>
        <h1>Equipos Jugadores</h1>
     
        <form>
            <label>Nombre de jugador: </label>
            <input type="text" ref={this.cajaJugador}></input>
            <button onClick={this.buscarJugador}>Buscar por nombre: </button>
            <hr/>
            <label>Selecciona un equipo: </label>
            <select ref={this.selectEquipo}>
                {
                    this.state.equipos &&
                    //codigo para meter los option
                    this.state.equipos.map((equipo, index)=>{
                        return <option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>
                    })
                }
            </select>
            <button onClick={this.mostrarEquipo}>Mostrar equipo</button>
        </form>
        <table border={1}>
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Posición</th>
                    <th>País</th>
                    <th>Fecha nacimiento</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.plantilla &&
      
                    //codigo donde debe ir el equipo o los jugadores

                    //creo que va a haber que poner un IF, para saber cuando mostrar cada array
                    this.state.plantilla.map((jugadores, index)=>{
                        return(<tr key={index}>
                            <td><img style={{width:"125px"}} src={jugadores.imagen}/></td>
                            <td>{jugadores.nombre}</td>
                            <td>{jugadores.posicion}</td>
                            <td>{jugadores.pais}</td>
                            <td>{jugadores.fechaNacimiento}</td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
