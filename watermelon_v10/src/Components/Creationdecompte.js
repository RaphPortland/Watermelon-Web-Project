import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input,Alert, Row} from 'reactstrap';
import Menu from "./Menu";
import DataUser from "../DataUser.json";


class Creationdecompte extends Component {

    constructor(props){
        super(props);
        
        
        this.handleChange = this.handleChange.bind(this);
        this.displayalert = this.displayalert.bind(this);
        this.creataccount = this.creataccount.bind(this);


        this.state = {prenom : "",nom : "",email : "", motdepasse : "",motdepasse2 : "", alert: false, textalert : ""}
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
        console.log(this.state)
    }
    creataccount(){
        console.log(this.state)
        if(this.state.motdepasse == this.state.motdepasse2){
            console.log(" connection + redirection ")

            var obj = {userId: 3, nom: this.state.nom, prenom: this.state.prenom, email: this.state.email, password: this.state.motdepasse, valuewallet:0}

            localStorage.setItem("3",JSON.stringify(obj));

            this.setState({prenom : "",nom : "",email : "", motdepasse : "",motdepasse2 : ""})

            sessionStorage.setItem( "IdUser" ,  obj.userId );
            sessionStorage.setItem( "Nom" ,  obj.nom );
            sessionStorage.setItem( "Prenom" ,  obj.prenom );
            sessionStorage.setItem( "email" ,  obj.email );
            sessionStorage.setItem( "valuewallet" ,  obj.valuewallet );
            sessionStorage.setItem("Nombredecarte", 0)
            let b = DataUser.map((postDetail, index) =>{
                localStorage.setItem( index ,  JSON.stringify(postDetail)); // Remplir local storage de data
            })

            this.props.history.push("action");
        } else {
            console.log("On est ici");

            this.setState({alert : true, textalert : "Attention les mots de passes entrer doivent etre les memes"});
        }
    }

    displayalert(){
        if(this.state.alert == true){
            return (
                <Alert color="danger">
                    {this.state.textalert}
                </Alert>
          );
        } 
    }

    render(){

        return(
            <div>
                    <Row>
                        <div class = "col 12">
                            <Menu active = {true}/>
                        </div>
                    </Row>                <div class = "row">
                <div class = "col 2"></div>
                <div class = "col 4">
                <Form>
                    <h1> Bievenue dans la creation de compte </h1>
                <FormGroup>
                    <p>{this.displayalert()}</p>
                    <Label for="Nom">Nom </Label>
                    <Input type="text" name="nom" id="nom" placeholder="Nom" onChange= {this.handleChange} value= {this.state.nom} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Prenom</Label>
                    <Input type="text" name="prenom" id="prenom" placeholder="Prenom" onChange= {this.handleChange} value= {this.state.prenom} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email adresse" onChange= {this.handleChange} value= {this.state.email} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Mot de passe </Label>
                    <Input type="password" name="motdepasse" id="examplePassword" placeholder="mot de passe" onChange= {this.handleChange} value= {this.state.motdepasse} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Confirmation de mot de passe </Label>
                    <Input type="password" name="motdepasse2" id="examplePassword3" placeholder="Confirmation de mot de passe" onChange= {this.handleChange} value= {this.state.motdepasse2} required/>
                </FormGroup>

                <FormGroup check>
                <Label check>
                    <Input type="checkbox" required/>{' '}
                    En cochant cette case vous acceptez les conditions d'utilisation de WATERMELON
                </Label>
                </FormGroup>
                <p></p>
                <Button onClick={this.creataccount}>Créé le compte et se connecter !!</Button>
            </Form>
            </div>
            <div class = "col 2"></div>
            </div>
        </div>
        );

    }

}
export default Creationdecompte;