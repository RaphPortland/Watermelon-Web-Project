import React from 'react';
import './App.css';
import Menu from './Components/Menu'
import Accueil from './Components/Accueil'
import Creationdecompte from './Components/Creationdecompte'
import RecapPage from './Components/RecapPage'
import {Router, Route,BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div>
		<BrowserRouter>
			<Route path={"/"} component = {Accueil} />
			<Route path={"/Accueil"} component = {Accueil} />		

			<Route path={"/crea"} component = {Creationdecompte} />
			<Route path ={"/action"} component = {RecapPage} />
		</BrowserRouter>
    </div>
  );
}

export default App;
