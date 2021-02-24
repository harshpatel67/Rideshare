import { Component } from 'react'
import { Label, Input, FormGroup, Button } from 'reactstrap'

class UserProfile extends Component {

    constructor(props){
        super(props)

        //if(this.checkUserLogin(this.props.store.auth.user)) this.redirectPage()
        //const user = this.props.store.auth.user
        
        this.state = {
            displayName:"",
            email: "",
            phoneNumber: "",
            homeAddress: {
                address: "",
                city: "",
                postalCode: ""
            },
            birthDate: "",
            gender: "Male"
        }
        this.fetchUserAndUpdateState()
    } 
    
    fetchUserAndUpdateState = () => {
        const userProfile = this.props.store.fetchUserProfile("3oxH4ylE7NMLeY3XCKz7XPF7nR3")
        console.log(userProfile)
        
        /*this.initialState = {
            displayName: userProfile.displayName,
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber,
            homeAddress: {
                address: userProfile.homeAddress.address,
                city: userProfile.homeAddress.city,
                postalCode: userProfile.homeAddress.postalCode
            },
            birthDate: userProfile.birthDate,
            gender: userProfile.gender
        }

        this.setState({
            ...this.initialState
        })*/
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateLocation = e => {
        this.setState({
            ...this.state,
            homeAddress: {
                ...this.state.homeAddress,
                [e.target.name]: e.target.value
            }
        })
    }

    
    todayDate = () => {
        const today = new Date()
        const today_date = today.getFullYear() + "-" + this.padZero(parseInt(today.getMonth())+1) + "-" + this.padZero(today.getDate())
        return today_date
    }

    padZero = e => {
        const remainder = parseInt(parseInt(e) / 10)
        if(remainder !== 0) return e
        else return "0"+e
    }

    checkUserLogin = user => {

    }

    compareChange = (initialValue, endValue) => {
        return initialValue === endValue
    }

    redirectPage = () => {
        this.props.history.push('/login?url=updateProfile')
    }

    handleForm = e => {
        e.preventDefault()

        console.log(this.state)
        console.log(this.initialState)
        console.log(this.compareChange(this.initialState, this.state))
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleForm}>
                    <div>
                        <div><Label>Name:</Label></div>
                        <div><Input type="text" name="displayName" value={this.state.displayName} onChange={this.updateInput} minLength="3" required/></div>
                        <div><Label>Email:</Label></div>
                        <div><Input type="email" name="email" value={this.state.email} readOnly/></div>
                        <div><Label>Cell / Home Number:</Label></div>
                        <div><Input type="tel" name="phoneNumber" value={this.state.phoneNumber} onChange={this.updateInput} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/></div>
                        <FormGroup>
                            <div><Label>Resident Address</Label></div>
                            <div><Label>Address</Label></div>
                            <div><Input type="text" name="address" value={this.state.homeAddress.address} onChange={this.updateLocation} required/></div>
                            <div><Label>City</Label></div>
                            <div><Input type="text" name="city" value={this.state.homeAddress.city} onChange={this.updateLocation} required/></div>
                            <div><Label>Postal Code</Label></div>
                            <div><Input type="text" name="postalCode" value={this.state.homeAddress.postalCode} onChange={this.updateLocation} maxLength="6" minLength="6" required/></div>
                        </FormGroup>
                        <div><Input type="date" name="birthDate" value={this.state.birthDate} onChange={this.updateInput} max={this.todayDate()} required/></div>
                        <FormGroup>
                            <div><Label>Gender</Label></div>
                            <div>
                                <Input type="select" name="gender" value={this.state.gender} onChange={this.updateInput}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not want to Disclosed.">I don't want to disclose.</option>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Save</Button>
                        </FormGroup>
                    </div>
                </form>
            </div>
        )
    }

}

export default UserProfile