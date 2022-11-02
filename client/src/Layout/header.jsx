import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NWSMATERIEL</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/gestion_materiel">Gestion matériel</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pret_materiel">Gestion des prêts</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        )}

export default Header;