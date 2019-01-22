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
    }

    render(){
        if (this.props.username === ""){ 
            return(
                <div style={{marginBottom:"70px"}}>
                    <Navbar color="light" light expand="md" fixed="top">
                    <NavbarBrand href="/">Semalam Suntuk</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Option 1</DropdownItem>
                                    <DropdownItem> Option 2</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

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
            <div style={{marginBottom:"70px"}}>
                <Navbar color="light" light expand="md" fixed="top">
                <NavbarBrand href="/">Semalam Suntuk</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, {this.props.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem> Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onLogoutClick}><i className="fas fa-sign-out-alt"></i> Logout </DropdownItem>
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