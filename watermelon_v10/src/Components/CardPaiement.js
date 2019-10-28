import React, {Component} from 'react';
import {Row, Button, Col} from 'reactstrap';
import { Card, CardTitle, CardSubtitle, CardBody, Input} from 'reactstrap';


class CardPaiement extends Component {

    constructor(props){
        super(props)

        this.supp = this.supp.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state  = {onupdate : false, newlast_4 : this.props.last_4 , newbrand : this.props.brand , newexpirationdate : this.props.expired_at}
        console.log(this.state)

    }

    update(){
        if(this.state.onupdate == true){
            console.log('save protocol ')

            console.log(this.props.index)
                var string_ = "Card" + this.props.index;
                var obj = JSON.parse(sessionStorage.getItem(string_)); 

                obj.brand = this.state.newbrand
                obj.last_4 = this.state.newlast_4
                obj.expired_at = this.state.newexpirationdate
                sessionStorage.setItem(string_,JSON.stringify(obj));
                console.log(this.state)
                this.setState({onupdate:false})
                this.props.rerenderParentCallback();


        } else {
            console.log("Update render ")
            this.setState({onupdate : true})  
        }
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }


    supp(){

        console.log(this.props.CardId)
        var memoire = 0
        for (var i = 0; i < sessionStorage.getItem("Nombredecarte"); i++){
            var string_ = "Card" + i;
            var obj = JSON.parse(sessionStorage.getItem(string_)); 
            if(this.props.CardId == obj.CardId){ 
                console.log("on remove")
                console.log(string_)

                sessionStorage.removeItem(string_);

                var coucou = sessionStorage.getItem("Nombredecarte")-1
                sessionStorage.setItem("Nombredecarte", coucou);

                var memoire = i;
                var boola= false;
                var b = 0;
                for (var j=0; j<coucou;j++)
                {            
                    if(j == memoire ){
                        boola = true;
                    }
                    b=j
                    if(boola == true){
                        b = j+1
                    }

                    var string_1 = "Card" + b;
                    var obj = JSON.parse(sessionStorage.getItem(string_1)); 

                    var string_ = "Card" + j;
                    sessionStorage.setItem(string_ , JSON.stringify(obj));
                }
                var hihi = coucou 
                var string_ = "Card" +hihi;
                sessionStorage.removeItem(string_);

            }
        }
        this.props.rerenderParentCallback();


    }

    render(){
        if(this.state.onupdate == false){
            return(
                <div>
                    <Col xs ="4">
                        <Card>
                            <CardBody>
                                <CardTitle> Carte : {this.props.brand} {this.props.last_4} </CardTitle>
                                <br/>
                                <CardSubtitle>Expiration : {this.props.expired_at}</CardSubtitle>
                                <br/>
                                <Row>
                                    <Col>
                                        <Button onClick={this.supp}>Supprimer Carte</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={this.update}>Update Carte</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            );    
        } else { // On update == true 

            return(
                <div>
                    <Col xs ="4">
                        <Card>
                            <CardBody>
                            Carte Brand  <Input type="text" name="newbrand" id="newbrand" placeholder="newbrand" bsSize="lg" onChange= {this.handleChange} value= {this.state.newbrand} required/>

                              Carte last_4 :   <Input type="text" name="newlast_4" id="newlast_4" placeholder="newlast_4" bsSize="lg" onChange= {this.handleChange} value= {this.state.newlast_4} required/>

                                <br/>
                                Expiration <Input type="text" name="newexpirationdate" id="newexpirationdate" placeholder="newexpirationdate" bsSize="lg" onChange= {this.handleChange} value= {this.state.newexpirationdate} required/>
                                <br/>
                                <Row>
                                    <Col>
                                        <Button onClick={this.supp}>Supprimer Carte</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={this.update}>Save</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            );    

        }



    }


}
export default CardPaiement;