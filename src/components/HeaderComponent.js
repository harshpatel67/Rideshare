import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.store)
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            isNavOpen: false,
            isLoginModelOpen: false,
            isSignupModelOpen: false,
            isPasswordMatch: true
        };
    }

    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal = () => {
        this.setState({
            isLoginModelOpen: !this.state.isLoginModelOpen
        });
    }

    toggleSignupModal = () => {
        this.setState({
            isSignupModelOpen: !this.state.isSignupModelOpen
        });
    }

    handleLogin = (event) => {
        this.toggleLoginModal();
        this.props.store.loginUser({email: this.state.email, password: this.state.password});
        event.preventDefault();

    }

    handleSignup = (event) => {

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                isPasswordMatch: false
            })
        }   else {
            this.toggleSignupModal();
            this.props.store.signupUser({email: this.state.email, password: this.state.password});
        }
        event.preventDefault();

    }

    handleCreateNewAccount = () => {
        this.toggleLoginModal();
        this.toggleSignupModal();
    }

    handleGoogleLogin = (event) => {
        this.toggleLoginModal();
        this.props.store.googleLogin();
        this.props.history.push("/");
        event.preventDefault();
    }

    handleLogout = () => {
        this.props.store.logoutUser();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleUpdateProfile = () => {
        this.props.history.push('/updateProfile')
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto navbar-text" href="/">
                            <img src="/rideshare.png" height="60" width="100" className="navbartext"
                                alt="Rideshare" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem className="mr-2">
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="navbartext"> About Us </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="mr-2">
                                    <NavLink className="nav-link " to="/contactus">
                                        <span className="navbartext"> Contact Us </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="mr-2">
                                    { !this.props.store.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleLoginModal}>
                                            <span className="fa fa-sign-in fa-lg "> Login </span>
                                            {this.props.store.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.store.auth.user.displayName}</div>
                                        <Button outline onClick={this.handleUpdateProfile}>
                                        <span className="fa fa-sign-out fa-lg"></span> Update Profile
                                        </Button>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.store.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }

                                </NavItem>
                                <NavItem>
                                    { !this.props.store.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleSignupModal}>
                                            <span className="fa fa-sign-up fa-lg "> SignUp </span>
                                            {this.props.store.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isLoginModelOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="text" id="email" name="email"  placeholder="ex:smith@gmail.com"
                                    onChange={this.handleChange} value={this.state.email} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" id="password" name="password"
                                    onChange={this.handleChange} value={this.state.password}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                        <p>------------------------------------OR---------------------------------</p>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                        <p></p>
                        <p><a href="javascript:" onClick={this.handleCreateNewAccount}> New User? Create a new account! </a></p>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isSignupModelOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>SignUp</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="text" id="email" name="email" placeholder="ex:smith@gmail.com"
                                    onChange={this.handleChange} value={this.state.email}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" id="password" name="password"
                                    onChange={this.handleChange} value={this.state.password} />
                            </FormGroup>
                            <FormGroup>
                                <Label> Confirm Password</Label>
                                
                                {this.state.isPasswordMatch? <p></p> : <p style={{color:"red"}}>Password Doesn't Match!!!</p>} 
                                
                                <Input type="password" id="confirmPassword" name="confirmPassword"
                                    onChange={this.handleChange} value={this.state.confirmPassword} />
                            </FormGroup>
                            
                            <Button type="submit" value="submit" color="primary">SignUp</Button>
                        </Form>
                        <p>------------------------------------OR---------------------------------</p>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Signup with Google</Button>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);