import React, {Component} from 'react';
import { Card, CardTitle, CardText, CardBody, CardSubtitle, Button, Input, Col, Row} from 'reactstrap';


class CardUser extends Component {

    constructor(props){
        super(props)

        this.addcarte = this.addcarte.bind(this);
        this.save = this.save.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.normal = this.normal.bind(this);

        this.state = {status : "", newbrand: "", newlast_4 : "", newexpirationdate:""}


    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }

    save(){

            var lastcard = parseInt(sessionStorage.getItem("Nombredecarte"))
            
            var string_ = "Card" + lastcard;

            var obj = {CardId: lastcard, userId: sessionStorage.getItem("IdUser"), last_4: this.state.newlast_4, brand: this.state.newbrand, expired_at: this.state.newexpirationdate};

            sessionStorage.setItem(string_,JSON.stringify(obj));
            this.props.rerenderParentCallback();
            var value = lastcard+1;
            sessionStorage.setItem("Nombredecarte", value)

            this.setState({status : "", newbrand: "", newlast_4 : "", newexpirationdate:""})

    

    }

    addcarte(){
        if(this.state.status == ""){
            this.setState({status : "newcarte"})
            console.log("COUCOUICICICICI")

        }

    }
    normal(){
        if(this.state.status == ""){
            return(
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle>{sessionStorage.getItem( "Nom" )} {sessionStorage.getItem( "Prenom" )} </CardTitle>
                            <br/>
                            <CardSubtitle>{sessionStorage.getItem( "email" )}</CardSubtitle>
                            <br/>
                            <CardText>Nombre de moyen de paiement : {sessionStorage.getItem("Nombredecarte")}</CardText>
                            <Button onClick= {this.addcarte}> Ajouter carte </Button>
                        </CardBody>
                    </Card>
                </div>
                );
        } else {
            return(
                <div>
                    <Card>
                        <CardBody>
                        Carte Brand  <Input type="text" name="newbrand" id="newbrand" placeholder="brand" bsSize="lg" onChange= {this.handleChange} value= {this.state.newbrand} required/>

                        Carte last_4 :   <Input type="text" name="newlast_4" id="newlast_4" placeholder="last_4" bsSize="lg" onChange= {this.handleChange} value= {this.state.newlast_4} required/>

                            <br/>
                            Expiration <Input type="text" name="newexpirationdate" id="newexpirationdate" placeholder="expirationdate" bsSize="lg" onChange= {this.handleChange} value= {this.state.newexpirationdate} required/>
                            <br/>
                            <Row>
                                <Col>
                                    <Button onClick={this.save}>Save</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>

            );
        }

    }

    render(){

        return(
            <div>
                {this.normal()}                
                
            </div>

            );



    }

}
export default CardUser;


