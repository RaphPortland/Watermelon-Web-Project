import React, {Component} from 'react';
import {Input, Button, Label, Row, Alert} from 'reactstrap';
import "./Accueil.css";
import Menu from "./Menu";
import DataUser from "../DataUser.json";
import PaiementDetail from "../PaiementDetail.json"

class Accueil extends Component {
    constructor(props){
        super(props);
        this.checkconnect = this.checkconnect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayalert = this.displayalert.bind(this);

        this.state = {email : "", password : "", status : false, showalert : false};

        sessionStorage.clear();


        
    }


    checkconnect(){
        console.log(this.state)

        let a = DataUser.map((postDetail, index) =>{
            if(postDetail.email == this.state.email){
                if(postDetail.password == this.state.password){


                    let b = DataUser.map((postDetail, index) =>{
                        localStorage.setItem( index ,  JSON.stringify(postDetail)); // Remplir local storage de data
                    })

                    sessionStorage.setItem( "IdUser" ,  postDetail.userId );
                    sessionStorage.setItem( "Nom" ,  postDetail.nom );
                    sessionStorage.setItem( "Prenom" ,  postDetail.prenom );
                    sessionStorage.setItem( "email" ,  postDetail.email );
                    sessionStorage.setItem( "valuewallet" ,  postDetail.valuewallet );

                    this.setState({status : true })

                    this.props.history.push("action");
                    var compteur=0;
                    let c = PaiementDetail.map((postDetail, index) => {

                        if(sessionStorage.getItem("IdUser") == postDetail.userId){

                            var string_ = "Card" + compteur;
                            sessionStorage.setItem(string_ , JSON.stringify(postDetail));

                            compteur = compteur +1 ;
                        }

                    })
                    sessionStorage.setItem("Nombredecarte", compteur)

                    return true;
                }
            } else{
                return false
            }
        })

        

        if(this.state.status == false){
            this.setState({showalert : true})
        }

    }

    displayalert(){
        if(this.state.showalert == true){
            return (
                <Alert color="danger">
                    Mot de passe ou email incorecte
                </Alert>
          );
        } 
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }

    render(){
            
        return (  
            
            <div id ="monForm">
                <body class="text-center">
                <Row>
                    <div class = "col 12">
                        <Menu active = {true}/>
                    </div>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <div class="col 2">

                    </div>
                    <div class="col 6">
                        <form class="form-signin">
                        <h3> Bievenue a l'acceuil de Watermelon veuillez vous connecter</h3>

                            <Row>
                            {this.displayalert()}
                                <Label for="inputEmail" class="sr-only">Email address</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email Adress" bsSize="lg" onChange= {this.handleChange} value= {this.state.email} required/>
                                <br/>
                            </Row>
                            <Row>
                                <Label for="inputPassword" class="sr-only">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Password" bsSize="lg" onChange= {this.handleChange} value= {this.state.password} required/>
                                <br/>
                                <br/>
                            </Row>
                            <br/>
                            <Row>
                                <div class = "col 1"></div>
                                <div class = "col 2">
                                    <Button class="btn btn-lg btn-primary btn-block" onClick={this.checkconnect} >Connecte toi</Button>
                                </div>
                                <div class = "col 1"></div>
                                <div class = "col 2">
                                    <Button class="btn btn-lg btn-primary" href="/crea">Creation de compte</Button>
                                </div>
                                <div class = "col 1"></div>
                            </Row>

                        <p class="mt-5 mb-3 text-muted">&copy; Watermelon 2019-2020</p>
                        </form>
                    </div>
                    <div class="col 2">
                        
                    </div>
                </Row>

                
                <Row>
                        {}
                </Row>
                </body>
            </div>
        );
    }
}
export default Accueil;