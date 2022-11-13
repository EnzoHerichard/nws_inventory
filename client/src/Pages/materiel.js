import { useEffect, useState } from "react";
import "../assets/style.css";
// module.exports = app.listen(3001);

function GestionMaterial() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [materialsList, setMaterialsList] = useState([]);

    const addMaterial = () =>{
        fetch('https://enzo.iamroot.fr/create', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
              },
            body: JSON.stringify({ name: name, description: description })

        }).then(() => {
            console.log("Success");

        })
    };

    const getMaterials = () => {
        fetch('https://enzo.iamroot.fr/materials', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
              },
        }).then(response => response.json())
        .then(response => setMaterialsList(response))
    }
    const deleteMaterials = (idmaterials) => {
        fetch(`https://enzo.iamroot.fr/delete/${idmaterials}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            headers: {
                "Access-Control-Allow-Origin": "*",
              },
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
        fetch(`https://enzo.iamroot.fr/update/${idmaterials}`,{
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            headers: {
                "Access-Control-Allow-Origin": "*",
              },
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
                    <h1 className="display-4">Gestion du matériel de l'école</h1>
                    <p className="lead"></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {/* <button onClick={getMaterials} className="btn btn-dark">Afficher le matériel</button> */}
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
                                    <td><input onChange={(event) => {setName(event.target.value);}} type="text" placeholder={val.name}/></td>
                                    <td><input onChange={(event) => {setDescription(event.target.value);}} type="text" placeholder={val.description}/></td>
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
                    <h2>Ajouter du matériel</h2>
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