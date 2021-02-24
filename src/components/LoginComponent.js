import { Component } from 'react'
import { withRouter, useParams } from 'react-router-dom'

class LoginComponent extends Component{

    constructor(props){
        super(props)

        if(this.checkUserLogin(this.props.auth.user)) this.redirectPage(this.props.path)

        this.state={
            email:"",
            password:""
        }
    }

    checkUserLogin = user => {
        if(user === null) return false
        else return true
    }

    redirectPage = path => {
        this.props.history.push(path)
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginForm = e => {
        e.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleLoginForm}>
                <label for='username'>
                    Username
                </label>
                <input type='email' name='email' placeholder='abc@xyz.com'/>
                <label for='password'>
                    Password
                </label>
                <input type='password' name='password' placeholder='Enter your password here.'/>
                <button type='submit'>Login</button>
            </form>
        )
    }

}

export default withRouter(LoginComponent)