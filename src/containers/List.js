import React, { Fragment } from 'react'

import Card from '../components/Card/Card'

console.log(process.env.API);

const API = process.env.API;

class List extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            searchTerm: '',
            error:'',
            loading: true,
        }
    }

    async componentDidMount() { // se ejecuta a penas el componente se muestre en pantalla
        // const res = await fetch('../../assets/data.json') // Solicitudes de forma local
        const res = await fetch(`${API}&s=batman`)
        const resJSON = await res.json()
        this.setState({ data: resJSON.Search, loading: false })
    }

    async handleSubmit(e){ //  Manejador enviar 
        e.preventDefault();
        if(!this.state.searchTerm){
            return this.setState({error:'Escribe algún texto'})
        }

        const res = await fetch(`${API}&s=${this.state.searchTerm}`)
        const data = await res.json();
        if(!data.Search){
            return this.setState({error: 'No hay resultados'})
        }
        this.setState({data: data.Search, error:'', searchTerm:''})
    }

    render() {

        const {data, loading} = this.state;
        if(loading){
            return <h3 className="p-4">Cargando...</h3>
        }
        return (
            <Fragment>
                <div className="row">
                <div className="col-md-4 offset-md-4 p-4">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search"
                        onChange={e => this.setState({searchTerm: e.target.value})}
                        value={this.state.searchTerm}
                        autoFocus
                        />
                    </form>
        <p className="text-center pt-2">{this.state.error ? this.state.error: ''}</p>
                </div>
                </div>
                <div className="row">
                    {
                        data.map((movie, i) => {
                            return <Card movie={movie} key={i}/>
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default List