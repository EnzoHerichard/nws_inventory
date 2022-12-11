import { useState, useRef, useEffect } from "react";
import "../assets/style.css";
import emailjs from '@emailjs/browser';

function GestionPret() {
    const [dateDeb, setDateDeb] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [idmaterials, setIdmaterials] = useState('');
    const [idStudent, setIdStudent] = useState('');
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
            body: JSON.stringify({idStudent: idStudent, dateDeb: dateDeb, dateFin: dateFin, idmaterials: idmaterials})
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
    const getStudent = () => {
        fetch(`${url}/Student`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then(response => setStudentList(response.data))
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
    const sendEmailRappel = (dateFin) => {
        const params = 
                {
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
                    <h1 className="display-4">Gestion des prêts du matériel</h1>
                    <p className="lead"></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table >
                        <tbody>
                            <tr>
                                <th>Id de l'étudiant</th>
                                <th>Date du prêt</th>
                                <th>Date de rendu</th>
                                <th>Materiel emprunté</th>
                                <th>Action</th>
                            </tr>

                            {reservationList.map((val, key) => {
                                return (
                                    <tr>
                                        <td>{val.idStudent}</td>
                                        <td>{val.dateDeb}</td>
                                        <td>{val.dateFin}</td>
                                        <td>{val.name}</td>
                                        <button onClick={() => { deleteReservation(val.idreservation) }} className="btn btn-success">Terminer</button>
                                        <button onClick={() =>sendEmailRappel(val.dateFin)} className="btn btn-warning">Rappeler</button>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="clear"></div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Ajouter un prêt</h2>
                    <form ref={form} onSubmit={addReservation} onSubmitCapture={sendEmailAdd}> 
                        {/* <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" onChange={(event) => {
                                setFirstName(event.target.value);
                            }} className="form-control" name="firstName" id="firstName" placeholder="Prénom" />
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
                        </div> */}
                        <div className="form-group">
                        <label>Selectionnez un étudiant</label>
                        <select className="form-control" onChange={(event) => {
                                setIdStudent(event.target.value);
                            }} onClick={getStudent}>
                                <option value="">--Please choose an option--</option>
                                {studentList.map((value, key ) => {
                                    return (

                                        <option value={value.id} ><p name="lastName">{value.nom} </p><p name="firstName"> {value.prenom}</p></option>
                                    );
                                })}
                        </select>
                        </div>
                        <div className="form-group">
                            <label>Date du prêt</label>
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