import { useState } from "react";
import Axios from 'axios';

function GestionMaterial(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addMaterial = () => {
        Axios.post('http://localhost:3001/create', {
            name: name,
            description: description
    }).then(() => {
        console.log("Success");
        
    })
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Gestion du matériel de l'école</h1>
                    <p className="lead"></p>
                </div>
                <div className="col-md-12">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" onChange={(event)=> {
                                setName(event.target.value);
                            }} className="form-input" id="name" placeholder="Nom"/>
                            <label>Description</label>
                            <input type="text" onChange={(event)=>{
                                setDescription(event.target.value);
                            }} className="form-input" id="description" placeholder="Description"/>
                            <button onClick={addMaterial} className="btn btn-primary" >Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )}

export default GestionMaterial;