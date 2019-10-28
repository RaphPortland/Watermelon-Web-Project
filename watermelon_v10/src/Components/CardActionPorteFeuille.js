import React, {Component,useState} from 'react';
import { Card, CardTitle, CardText, CardBody, Button, Col, Row, Input, Alert} from 'reactstrap';

class CardActionPorteFeuille extends Component {

    constructor(props){
        super(props)
        this.transferToafriend = this.transferToafriend.bind(this);
        this.depotSurlePortefeuille = this.depotSurlePortefeuille.bind(this);
        this.retraitDuPortefeuille = this.retraitDuPortefeuille.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.casetwo = this.casetwo.bind(this);
        this.caseone = this.caseone.bind(this);
        this.casethree = this.casethree.bind(this);
        this.gereletransfercarte_porte = this.gereletransfercarte_porte.bind(this);

        this.displayalert = this.displayalert.bind(this);

        
        var display_ = ""
        
        for (var i = 0; i < localStorage.length; i++){
            var obj = JSON.parse(localStorage.getItem(localStorage.key(i))); 
            if(sessionStorage.email == obj.email){

            } else {
                display_ = display_ + "<option value=" + obj.email + ">"+ obj.email + "</option>";
            } 
        }
        this.state = {status : "", montant: 0, display_option: display_, email_ami : "", showalert: false, trash :"", display_option_carte : "", alert_content : ""}

    }

    transferToafriend(){
        if(this.state.status == "transfertofriend"){
            var value = sessionStorage.getItem("valuewallet") - this.state.montant ;

            if(value <0){
                this.setState({showalert : true, alert_content: "Votre porte-feuille sera negatif vous n'avais pas le droit d'etre a decouvert"})
            } else {
                sessionStorage.setItem("valuewallet",value ) 
                for (var i = 0; i < localStorage.length; i++){
                    var obj = JSON.parse(localStorage.getItem(localStorage.key(i))); 
                    if(sessionStorage.email == obj.email){ // Update de l'utilsateur qui envoie
                        obj.valuewallet = obj.valuewallet - this.state.montant;
                        localStorage.setItem(localStorage.key(i),JSON.stringify(obj));
                    }
                    if(this.state.email_ami == obj.email){ // Update du receveur  
                        obj.valuewallet = parseInt(obj.valuewallet) - -this.state.montant
                        localStorage.setItem(localStorage.key(i),JSON.stringify(obj));
                    }
                }
                this.setState({montant : 0, status : "",email_ami : ""});
                this.setState({showalert : false, alert_content: ""})
          
            }

        } else {
            this.setState({showalert : false})
            this.setState({status : "transfertofriend"});

        }
    }
    depotSurlePortefeuille(){
        
        if(sessionStorage.getItem("Nombredecarte") == 0){
            this.setState({showalert : true, alert_content: "Il faut ajouter une carte pour pouvoir acceder a cette fonctionalité"})

        } else {
            console.log("depotSurlePortefeuille ")
            this.setState({status : "ajoutauporte"})
    
            var display_carte = ""
            for (var i = 0; i < sessionStorage.getItem("Nombredecarte"); i++){
                var string_ = "Card" + i
                var obj = JSON.parse(sessionStorage.getItem(string_)); 
                var string_2 = obj.brand + " " +obj.last_4 + " Date d'expiration : "+obj.expired_at 
                display_carte = display_carte + "<option value=" + i + ">"+ string_2 +  "</option>";
    
            }
    
            this.setState({display_option_carte : display_carte})
        }

        
    }
    retraitDuPortefeuille(){
        
        if(sessionStorage.getItem("Nombredecarte") == 0){
            this.setState({showalert : true, alert_content: "Il faut ajouter une carte pour pouvoir acceder a cette fonctionalité"})

        } else {
            console.log("retraitDuPortefeuille ")
            this.setState({status : "retraitduporte"})
    
            var display_carte = ""
            for (var i = 0; i < sessionStorage.getItem("Nombredecarte"); i++){
                var string_ = "Card" + i
                var obj = JSON.parse(sessionStorage.getItem(string_)); 
                var string_2 = obj.brand + " " +obj.last_4 + " Date d'expiration : "+obj.expired_at 
                display_carte = display_carte + "<option value=" + i + ">"+ string_2 +  "</option>";
    
                
            }
            this.setState({display_option_carte : display_carte})
    
        }

        
    }
    gereletransfercarte_porte(){
        if(this.state.status == "ajoutauporte"){
            var calc = parseInt(sessionStorage.getItem("valuewallet")) + parseInt(this.state.montant);
            sessionStorage.setItem("valuewallet", calc)
            this.setState({showalert : false, alert_content: ""})
            this.setState({status : ""})

            
        } else {
            var calc = parseInt(sessionStorage.getItem("valuewallet")) - parseInt(this.state.montant);

            if(calc <0){
                this.setState({showalert : true, alert_content: "Vous ne pouvez pas etre a decouvert "})


            } else {
                sessionStorage.setItem("valuewallet", calc)
                this.setState({showalert : false, alert_content: ""})
                this.setState({status : ""})

            }


        }       
    }

    displayalert(){
        if(this.state.showalert == true){
            return (
                <Alert color="danger">
                    {this.state.alert_content}
                </Alert>
          );
        } 
    }
    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }
    caseone(){

        
        console.log(this.state.status)

        if(this.state.status == ""){
                    return(
                    <Card>
                        <CardBody>
                                <CardTitle>Balance porte-feuille virtuelle : {sessionStorage.getItem("valuewallet")}</CardTitle>
                                {this.displayalert()}

                                <CardText>"Proverbe sur l'argent"</CardText>
                            <Row>
                                <Col>
                                    <CardText>Transferer de l'argent a un ami : </CardText>
                                    <Button onClick = {this.transferToafriend}>Transfer to a friend </Button>
                                </Col>

                                <Col>
                                    <CardText>Dépot sur le porte-feuille</CardText>
                                    <Button onClick = {this.depotSurlePortefeuille}>Dépot</Button>
                                </Col>
                                <Col>
                                    <CardText>Retrait sur le porte-feuille</CardText>
                                    <Button onClick = {this.retraitDuPortefeuille}>Retrait</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>  
                );
        } else {
            return(
                <div>

                </div>
            );
        }
    
    }
    casetwo(){

        if(this.state.status == "transfertofriend"){

            return (
                <Card>
                    <CardBody>
                            <CardTitle>Balance porte-feuille virtuelle : {sessionStorage.getItem("valuewallet")}</CardTitle>
                            <CardText>Transferer de l'argent a un ami : </CardText>
                        <Row>    
                            {this.displayalert()}
                            <Col>
                                <CardText>Montant : </CardText>
                                <Input type="text" name="montant" id="montant" placeholder="montant" onChange= {this.handleChange} value ={this.state.montant}></Input>
                            </Col>
                            <Col>
                                <CardText>Destinataire</CardText>
                                <div>
                                    <select name = "email_ami" dangerouslySetInnerHTML ={{__html : this.state.display_option}} value = {this.state.email_ami} onChange={this.handleChange}/>
                                </div>

                            </Col>
                            
                            <Col>
                                <Button onClick = {this.transferToafriend}> Envoyer </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>  
            );
        } else {
            return(
                <div>
                    
                </div>
            );
        }
    }
 
    casethree(){
    
        if(this.state.status == "ajoutauporte" || this.state.status == "retraitduporte"){

            function Queltype(status) {
                if(status == "ajoutauporte"){
                    return("Ajoute sur le compte : ")
                }
                if(status == "retraitduporte"){
                    return("Retrait du compte : ")
                }            
            }

            return (
                <Card>
                <CardBody>
                        <CardTitle>Balance porte-feuille virtuelle : {sessionStorage.getItem("valuewallet")}</CardTitle>
                        {this.displayalert()}

                        <CardText>{Queltype(this.state.status)} </CardText>
                    <Row>    
                        <Col>
                            <CardText>Montant : </CardText>
                            <Input type="text" name="montant" id="montant" placeholder="montant" onChange= {this.handleChange} value ={this.state.montant}></Input>
                        </Col>
                        <Col>
                            <CardText>Depuis/sur quelle carte </CardText>
                            <div>
                                <select name = "trash" dangerouslySetInnerHTML ={{__html : this.state.display_option_carte}} value = {this.state.trash} onChange={this.handleChange}/>
                            </div>

                        </Col>
                        
                        <Col>
                            <Button onClick = {this.gereletransfercarte_porte}> Envoyer </Button>
                        </Col>
                    </Row>
                </CardBody>
        </Card>  
            );
        } else {
            return(
                <div>
                    
                </div>
            );
        }
    }

    
    render(){

        return(
            <div>
                <div>
                  {this.caseone()}
                </div>
                <div>
                    {this.casetwo()}
                </div>

                <div>
                {this.casethree()}

                </div>


            </div>


        );

    }

}
export default CardActionPorteFeuille;