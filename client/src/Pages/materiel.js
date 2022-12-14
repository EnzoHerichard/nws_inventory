import { useEffect, useState } from "react";
import "../assets/style.css";
/* module.exports = app.listen(3001); */

function GestionMaterial() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [materialsList, setMaterialsList] = useState([]);
    var url = "";
    if(window.location.hostname === "localhost"){
        url = "http://localhost:3001";
    } else {
        url = "https://enzo.iamroot.fr/server";
    }
    const addMaterial = () =>{
        fetch(`${url}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, description: description})
        }).then(() => {
            console.log("Success");

        })
    };

    const getMaterials = () => {
        fetch(`${url}/materials`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
        .then(response => setMaterialsList(response))
    }
    const deleteMaterials = (idmaterials) => {
        fetch(`${url}/delete/${idmaterials}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
            .then((response) => {
                setMaterialsList(
                    materialsList.filter((val) => {
                        return val.idmaterials !== idmaterials;
                    })
                );
            });
    }
    const updateMaterials = (idmaterials) => {
        fetch(`${url}/update/${idmaterials}`,{
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description })
        }).then(response => response.json())
        .then((response) => {
            setMaterialsList(
                materialsList.map((val) => {
                    return val.idmaterials === idmaterials ? {idmaterials: val.idmaterials, name: val.name, description: val.description} : val
                })
            );
        });
}
useEffect(()=>{
    getMaterials()
},[])


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Gestion du mat??riel de l'??cole</h1>
                    <p className="lead"></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table>
                                <tbody>
                                <tr>
                                    <th>Nom</th>
                                    <th>D??scription</th>
                                    <th>Action</th>
                                </tr>
                    {materialsList.map((val,key)=> {
                        return (
                                <tr>
                                    <td><input onChange={(event) => {setName(event.target.value);}} type="text" placeholder={val.name} required/></td>
                                    <td><input onChange={(event) => {setDescription(event.target.value);}} type="text" placeholder={val.description} required/></td>
                                    <button onClick={()=> {updateMaterials(val.idmaterials)}} className="btn btn-warning">Modifier</button>
                                    <button onClick={()=> {deleteMaterials(val.idmaterials)}} className="btn btn-danger">Supprimer</button>
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
                    <h2>Ajouter du mat??riel</h2>
                    <form onSubmit={addMaterial}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" onChange={(event) => {
                                setName(event.target.value);
                            }} className="form-control" id="name" placeholder="Nom" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" onChange={(event) => {
                                setDescription(event.target.value);
                            }} className="form-control" id="description" placeholder="Description" />
                        </div>
                            <button type="submit" className="btn btn-primary" >Ajouter</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default GestionMaterial;