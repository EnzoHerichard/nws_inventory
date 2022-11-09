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
    const [reservationList, setReservationList] = useState([]);
    
    const addReservation = () => {
        fetch('http://localhost:3001/createReservation', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName: firstName,lastName: lastName, email: email, dateDeb: dateDeb, dateFin: dateFin, idmaterials: idmaterials })

        }).then(() => {
            console.log("Success");

        })
    };
    const getMaterialsNotReserved = () => {
        fetch('http://localhost:3001/materialsNR', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
        .then(response => setMaterialsList(response))
    }
    const getReservation = () => {
        fetch('http://localhost:3001/reservations', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
        .then(response => setReservationList(response))
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
                            }} className="form-input" id="firstName" placeholder="Prénom" />
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
                            <select onChange={(event) => {
                                            setIdmaterials(event.target.value);
                                        }} onClick={getMaterialsNotReserved}>
                                        <option value="">--Please choose an option--</option>
                                {materialsList.map((val, key) => {
                                    return (
                                        
                                        <option value={val.idmaterials}>{val.name}</option>
                                    );
                                })}
                            </select>
                            <button type="submit" className="btn btn-primary" >Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button onClick={() => {getReservation();}}>Afficher les prêts</button>
                    <table>
                                <tbody>
                                <tr>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Date du prêt</th>
                                    <th>Date de rendu</th>
                                    <th>Materiel emprunté</th>
                                    <th>Action</th>
                                </tr>
                                
                    {reservationList.map((val,key)=> {
                        return (
                                <tr>
                                    <td>{val.firstName}</td>
                                    <td>{val.lastName}</td>
                                    <td>{val.email}</td>
                                    <td>{val.dateDeb.toLocaleDateString("fr")}</td>
                                    <td>{val.dateFin.toLocaleDateString("fr")}</td>
                                    <td>{val.name}</td>
                                    <button /*onClick={()=> {deleteMaterials(val.idmaterials)}}*/>Terminer</button> 
                                    <button onClick={()=> {updateMaterials(val.idmaterials)}}>Rappeler</button>
                                </tr>
                            ); 
                        })}
                    
                       
                             
                    
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        )}

export default GestionPret;