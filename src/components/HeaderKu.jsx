import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogout, keepLogin, loadOfCart } from '../actions';

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

    renderBadgeCart = () => {
        if( this.props.load.total_item > 0 ) {
            return (
                <span class="badge badge-pill badge-danger">{this.props.load.total_item}</span>
            );
        }
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
                               <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" className="form-control" placeholder="Masukkan kata kunci ... " aria-label="Masukkan keyword judul, No.ISBN, atau Penulis" aria-describedby="button-addon2" />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                            </NavItem>
                            
                            <NavItem>
                                <Link to="/register"><NavLink className="myLogin btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/login"><NavLink className="myLogin btn btn-default border-primary" style={{fontSize:"14px"}}><i className="fas fa-sign-in-alt" /> Masuk</NavLink></Link>
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
                            <div className="input-group border-right" style={{width:"350px"}}>
                                <input type="text" className="form-control" placeholder="Masukkan kata kunci ... " aria-label="Masukkan keyword judul, No.ISBN, atau Penulis" aria-describedby="button-addon2" />
                                <div className="input-group-append mr-2">
                                    <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                </div>
                            </div> 
                        </NavItem>
                        <NavItem>
                            <NavLink href="/cart" className="border-right">
                                <i className="fas fa-shopping-cart"></i> Keranjang { this.renderBadgeCart() }
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
        username: state.auth.username,
        load: state.loadOfCart
    }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin, loadOfCart})(HeaderKu);