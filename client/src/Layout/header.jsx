import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">NWSMATERIEL</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarColor02">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <Link class="nav-link active" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/gestion_materiel">Gestion matériel</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/pret_materiel">Gestion des prêts</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        )}

export default Header;