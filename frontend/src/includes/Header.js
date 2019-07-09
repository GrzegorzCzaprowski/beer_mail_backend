import React from 'react';
import logo from '../img/logo.jpg';
import Auth from './Auth';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            admin: 0
        };
    }
    
    getUserData = (e) => {
        fetch('http://localhost:8000/user/', {
            method: "GET",
            headers: new Headers({
                'Authorization' : "Bearer " + localStorage.getItem('token')
            })

        })
        .then(response => response.json())
        .then(data => {
            if(data.status == "succes"){
                this.setState({
                    name: data.name,
                    admin: data.isadmin
                })
            }else {
                console.log(data.data)
            }
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    logout = (e) => {
        localStorage.clear();
        window.location.href = '/login';
    }

    render() {
        this.getUserData()
        return (
            <div>
                <Auth></Auth>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    
                    <a className="navbar-brand" href="/"><img src={logo} height="50" width="50"/>BeerMail</a>
                    <button className="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="my-nav" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" style={{display: this.state.admin ? 'block': 'none'}}>
                            <a className="nav-link" href="/admin">Admin<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Item 2</a>
                        </li>
                        </ul>
                        <span className="navbar-text">
                            {this.state.name}
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active" onClick={this.logout}>
                                    <a className="nav-link" >Wyloguj</a>
                                </li>
                            </ul>
                        </span>
                    </div>
                </nav>
            </div>
        );
    }

}

export default Header;