import React, { Component } from 'react'
//what we need to import to connect the redux store
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
class Header extends Component {

    renderContent() {
        console.log(" header logs" )
        console.log( this.props.auth)
        switch (this.props.auth) {
            case null:
                return;
            case false: 
                return <li><a href = '/auth/google'>Login With Google</a></li>
            default:
                return [
                
                <li key = "1" ><Payments/></li>,
                <li key = '3' style ={{margin: '0 10px'}} > Credits: {this.props.auth.credits}</li>,
                <li key = "2"><a href = '/api/logout'>Logout</a></li>]

        }
    }

    render() {
        
        return (
          <nav>
              <div className = "nav-wrapper">
                <Link to={this.props.auth ? '/surveys' : '/'} 
                className = "left brand-logo"
                >Emaily</Link>
                    
                
                <ul className = "right">
                    {this.renderContent()}
                </ul>
              </div>
          </nav>
        );
    }

}

// function mapStateToProps(state) {
//     return { auth: state.auth };
// }
//refactoring using ES6 { } deconstructs the state

function mapStateToProps({ auth }) {

    return { auth}
}

//need this for redux
export default connect(mapStateToProps) (Header);