import { useState } from "react";
import Axios from "axios";
import "../assets/style.css";

function GestionMaterial() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [materialsList, setMaterialsList] = useState([]);

    const addMaterial = () => {
        fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description })

        }).then(() => {
            console.log("Success");

        })
    };

    const getMaterials = () => {
        fetch('http://localhost:3001/materials', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
        .then(response => setMaterialsList(response))
    }
    const deleteMaterials = (idmaterials) => {
        fetch(`http://localhost:3001/delete/${idmaterials}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
            .then((response) => {
                setMaterialsList(
                    materialsList.filter((val) => {
                        return val.idmaterials != idmaterials;
                    })
                );
            });
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
                    <button onClick={getMaterials}>Afficher le matériel</button>
                    <table>
                                <tbody>
                                <tr>
                                    <th>Nom</th>
                                    <th>Déscription</th>
                                    <th>Action</th>
                                </tr>
                    {materialsList.map((val,key)=> {
                        return (
                                <tr>
                                    <td>{val.name}</td>
                                    <td>{val.description}</td>
                                    <button onClick={()=> {deleteMaterials(val.idmaterials)}}>Supprimer</button>
                                </tr>
                                
                        );
                    })}
                    </tbody>
                    </table>
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