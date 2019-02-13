import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogout, keepLogin } from '../actions';

const cookies = new Cookies();

class HeaderKu extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
      };
    }
    toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }

    onLogoutClick = () => {
        this.props.onUserLogout();
        cookies.remove('myPengguna');
        cookies.remove('myKey');
    }

    render(){
        if (this.props.username === ""){ 
            return(
                <div style={{marginBottom:"90px"}}>
                    <Navbar color="light" light expand="md" fixed="top">
                    <NavbarBrand href="/"><img src="http://localhost:3000/buku.png" alt="brand" width="100px" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        
                            <NavItem>
                                <Link to="/login"><NavLink className="myLogin btn btn-default border-primary"><i className="fas fa-sign-in-alt" /> Login</NavLink></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            );
        }
        return(
            <div style={{marginBottom:"90px"}}>
                <Navbar color="light" light expand="md" fixed="top">
                <NavbarBrand href="/"><img src="http://localhost:3000/buku.png" alt="brand" width="100px" /></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      
                        <NavItem>
                            <NavLink href="/components/" className="border-right">
                                <i className="fas fa-shopping-cart"></i> Keranjang <span class="badge badge-danger rounded-circle ">2</span>
                            </NavLink>
                        </NavItem>
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, <p className="text-capitalize" style={{display:"inline"}}>{this.props.username}</p>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem><i className="fas fa-user text-primary"></i> Profile</DropdownItem>
                                <DropdownItem><i className="fas fa-history text-primary"></i> History Belanja</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onLogoutClick}>
                                    <i className="fas fa-sign-out-alt text-danger"></i> Logout 
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin})(HeaderKu);