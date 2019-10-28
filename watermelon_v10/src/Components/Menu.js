import React, {Component} from 'react';
import { Nav, NavItem, NavLink, Button} from 'reactstrap';



class Menu extends Component {
    constructor(props){
        super(props);
        console.log(props);
        
        this.displayconnec = this.displayconnec.bind(this);

    }

    displayconnec(){
        if(sessionStorage.getItem( "IdUser" ) != null){
            return(<Button outline color="primary" href="/Accueil">Deconnection</Button>);

        } else {
            return(<Button outline color="primary" href="/Accueil">Connection</Button>);
        }

    }


    render(){

        if(this.props.active ==true){
            console.log("on est la ")
            return(
                <div>
                        <div className="row">
                            <div className = "col 12">
                                <Nav className = "NavBar">
                                    <NavItem>
                                        {this.displayconnec()}
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                        <div className="row">
                            <div className = "col 12">
                                <div>
                                    {this.props.children}
                                </div>
                            </div>
                        </div>

                </div>
            ); 
        } else {
            return(
            <div> <p>Empty </p> </div>
            );
        }

    }

}
export default Menu;