import { useState } from "react";
import "../assets/style.css";
function GestionPret(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateDeb, setDateDeb] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [idmaterials, setIdmaterials] = useState('');

    const [materialsList, setMaterialsList] = useState([]);
    const addReservation = () => {
        fetch('http://localhost:3001/createReservation', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName: firstName,lastName: lastName, email: email, dateDeb: dateDeb, dateFin: dateFin, idmaterials: idmaterials })

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
    function getReservation(){
        
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Gestion des prêts du matériel</h1>
                    <p className="lead"></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Ajouter du matériel</h2>
                    <form onSubmit={addReservation}>
                        <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" onChange={(event) => {
                                setFirstName(event.target.value);
                            }} className="form-input" id="fisrtName" placeholder="Prénom" />
                            <label>Nom</label>
                            <input type="text" onChange={(event) => {
                                setLastName(event.target.value);
                            }} className="form-input" id="lastName" placeholder="Nom de famille" />
                            <label>Email</label>
                            <input type="text" onChange={(event) => {
                                setEmail(event.target.value);
                            }} className="form-input" id="email" placeholder="Email" />
                            <label>Date du prêt</label>
                            <input type="date" onChange={(event) => {
                                setDateDeb(event.target.value);
                            }} className="form-input" id="dateDeb" />
                            <label>Date de rendu du materiel</label>
                            <input type="date" onChange={(event) => {
                                setDateFin(event.target.value);
                            }} className="form-input" id="dateFin" />
                            <label>Materiel prêté</label>
                            <input type="text" onChange={(event) => {
                                setIdmaterials(event.target.value);
                            }} className="form-input" id="idmaterials" />
                            <button type="submit" className="btn btn-primary" >Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )}

export default GestionPret;