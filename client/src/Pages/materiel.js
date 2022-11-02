import { useState } from "react";
import Axios from 'axios';

function GestionMaterial() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addMaterial = () => {
        fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description })

        }).then(() => {
            console.log("Success");

        }).catch(function (error) {
            console.log(error);
        });
    };
    const getMateriel = () => {
        fetch('http://localhost:3001/', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description })
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Gestion du matériel de l'école</h1>
                    <p className="lead"></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Afficher le matériel</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-md-12">
                <h2>Ajouter du matériel</h2>
                <form onSubmit={addMaterial}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" onChange={(event) => {
                            setName(event.target.value);
                        }} className="form-input" id="name" placeholder="Nom" />
                        <label>Description</label>
                        <input type="text" onChange={(event) => {
                            setDescription(event.target.value);
                        }} className="form-input" id="description" placeholder="Description" />
                        <button type="submit" className="btn btn-primary" >Ajouter</button>
                    </div>
                </form>
            </div>
            </div>
        </div>

    )
}

export default GestionMaterial;