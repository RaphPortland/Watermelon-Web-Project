import React, {Component} from 'react';
import {Row, Button, Col} from 'reactstrap';
import CardUser from './CardUser'
import CardActionPorteFeuille from './CardActionPorteFeuille'
import CardPaiement from './CardPaiement'

import Menu from './Menu'

class RecapPage extends Component {


    constructor(props){
        super(props);

        this.displayPaiementcards = this.displayPaiementcards.bind(this);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);

        this.state = {cards: 0, nbrs : 0}
    }

    componentDidMount(){
        this.setState({cards : sessionStorage.getItem("Nombredecarte")})

        this.displayPaiementcards()


    }
    rerenderParentCallback() {
        this.forceUpdate();
      }
        
    displayPaiementcards(){
        var display_ = []

        for (var i = 0; i< sessionStorage.getItem("Nombredecarte"); i++) {
            var string_ = "Card" + i;
            var obj = JSON.parse(sessionStorage.getItem(string_)); 

            display_.push(<CardPaiement index= {i} CardId ={obj.CardId} userId = {obj.userId }  last_4 = {obj.last_4} brand = {obj.brand} expired_at = {obj.expired_at} rerenderParentCallback={this.rerenderParentCallback} />);
        }
        return(display_)
    }

    render(){
        if(sessionStorage.getItem( "IdUser" ) != null){
            return(

                <div>
                    <Row>
                        <div class = "col 12">
                            <Menu active = {true}/>
                        </div>
                    </Row>
                    <Row>
                        <Col xs ="1"></Col>
    
                        <Col xs = "6">
                            <CardActionPorteFeuille/>
                        </Col>                   
                        <Col xs ="4">
                            <CardUser rerenderParentCallback={this.rerenderParentCallback}/>
                        </Col>
                        <Col xs ="1"></Col>
    
                    </Row>
                    <br/>
                    <br/>

                    <div>
                            {this.displayPaiementcards()}
                    </div>
                            
 
    
                </div>
    
            );
        } else {

            this.props.history.push("Accueil");
            return(
                <div></div>
            );

        }

       
    }
}
export default RecapPage;