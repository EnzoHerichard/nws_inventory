import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Materiel from './Pages/materiel';
import Pret from './Pages/pret';
import Home from './Pages/Home';
import Header from "./Layout/header";
  

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/gestion_materiel' element={<Materiel/>}/>
        <Route path='/pret_materiel' element={<Pret/>}/>
      </Routes>
   </Router>
  );
}

export default App;
