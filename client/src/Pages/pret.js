import { useState, useRef, useEffect } from "react";
import "../assets/style.css";
import emailjs from '@emailjs/browser';

function GestionPret() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateDeb, setDateDeb] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [idmaterials, setIdmaterials] = useState('');
    const [materialsList, setMaterialsList] = useState([]);
    const form = useRef();
    const [reservationList, setReservationList] = useState([]);
    const [studentList, setStudentList] = useState([]);


    var url = ""
    if(window.location.hostname === "localhost"){
        url = "http://localhost:3001";
    } else {
        url = "https://enzo.iamroot.fr/server"
    }
    const addReservation = ()  =>{
        fetch(`${url}/createReservation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, dateDeb: dateDeb, dateFin: dateFin, idmaterials: idmaterials})
        }).then(()=> {
            console.log('success'); 
    });
    }
    const getMaterialsNotReserved = () => {
        fetch(`${url}/materialsNR`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then(response => setMaterialsList(response))
    }
    const getReservation = () => {
        fetch(`${url}/reservations`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then(response => setReservationList(response))
    }
    const getStudent = () => {
        fetch('http://localhost:3001/Student' , {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then(response => console.log(response))
    }
    const deleteReservation = (idreservation) => {
        fetch(`${url}/deleteReservation/${idreservation}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then((response) => {
                setReservationList(
                    reservationList.filter((val) => {
                        return val.idreservation !== idreservation;
                    })
                );
            })
        
    }
    
    const sendEmailAdd = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_4cjrsub', 'template_mjb8r6n',form.current, 'QBYjetHMkN7YkkMWd')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log('failed..' + error);
            });
    }; 
    const sendEmailRappel = (name,firstName, email, dateFin) => {
        const params = 
                {
                    name: name,
                    firstName: firstName,
                    email: email,
                    dateFin: dateFin
                }
        emailjs.send('service_4cjrsub', 'template_whstm9w', params, 'QBYjetHMkN7YkkMWd')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log('failed..' + error);
            });
    };
    useEffect(()=>{
        getReservation();
        getStudent();
    },[])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Gestion des pr??ts du mat??riel</h1>
                    <p className="lead"></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table >
                        <tbody>
                            <tr>
                                <th>Pr??nom</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Date du pr??t</th>
                                <th>Date de rendu</th>
                                <th>Materiel emprunt??</th>
                                <th>Action</th>
                            </tr>

                            {reservationList.map((val, key) => {
                                return (
                                    <tr>
                                        <td>{val.firstName}</td>
                                        <td>{val.lastName}</td>
                                        <td>{val.email}</td>
                                        <td>{val.dateDeb}</td>
                                        <td>{val.dateFin}</td>
                                        <td>{val.name}</td>
                                        <button onClick={() => { deleteReservation(val.idreservation) }} className="btn btn-success">Terminer</button>
                                        <button onClick={() =>sendEmailRappel(val.name,val.firstName, val.email,val.dateFin)} className="btn btn-warning">Rappeler</button>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2>Les eleves</h2>
                <table >
                        <tbody>
                            <tr>
                                <th>Pr??nom</th>
                                <th>Nom</th>
                                <th>Email</th>
                            </tr>
                            {studentList.map((val, key)=> {
                                return (
                                <tr>
                                    <td>{val.nom}</td>
                                    <td>{val.prenom}</td>
                                    <td>{val.mail}</td>
                                </tr>
                                    
                                );
                            })}
                        </tbody>
                </table>
            </div>
            <div className="clear"></div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Ajouter un pr??t</h2>
                    <form ref={form} onSubmit={addReservation} onSubmitCapture={sendEmailAdd}> 
                        <div className="form-group">
                            <label>Pr??nom</label>
                            <input type="text" onChange={(event) => {
                                setFirstName(event.target.value);
                            }} className="form-control" name="firstName" id="firstName" placeholder="Pr??nom" />
                        </div>
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" onChange={(event) => {
                                setLastName(event.target.value);
                            }} className="form-control" name="lastName" id="lastName" placeholder="Nom de famille" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" onChange={(event) => {
                                setEmail(event.target.value);
                            }} className="form-control" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label>Date du pr??t</label>
                            <input type="date" onChange={(event) => {
                                setDateDeb(event.target.value);
                            }} className="form-control" name="dateDeb" id="dateDeb" />
                        </div>
                        <div className="form-group">
                            <label>Date de rendu du materiel</label>
                            <input type="date" onChange={(event) => {
                                setDateFin(event.target.value);
                            }} className="form-control" name="dateFin" id="dateFin" />
                        </div>
                        <div className="form-group">
                            <label>Materiel en stock</label>
                            <select className="form-control" onChange={(event) => {
                                setIdmaterials(event.target.value);
                            }} onClick={getMaterialsNotReserved}>
                                <option value="">--Please choose an option--</option>
                                {materialsList.map((val, key) => {
                                    return (

                                        <option value={val.idmaterials} ><p name="name">{val.name}</p></option>
                                    );
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary"> Ajouter</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}

export default GestionPret;