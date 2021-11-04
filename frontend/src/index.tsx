import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from "./Login/SignIn";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import axios from "axios";
import ShowSectors from './SectorPage/ProjectSector';
import CircularProgress from '@mui/material/CircularProgress';


const PrivateRoute = ({component: Component, ...rest}) => {

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect(() => {
        // send jwt to API to see if it's valid
        let token = sessionStorage.getItem("token");
        if (token) {
            axios({
                url: "http://localhost:3001/api/customers/validate",
                headers: {
                    "X-JWT-Token": token
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setAuth(true);
                    }
                })
                .catch(() => {
                    setAuth(false);
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("email");
                })
                .then(() => setIsTokenValidated(true));
        } else {
            setIsTokenValidated(true); // in case there is no token
        }

    }, [])

    if (!isTokenValidated) return <CircularProgress />;

    return (<Route {...rest}
                   render={(props) => {
                       return auth ? <Component {...props} /> : <Redirect to={{
                        pathname: "/home",
                        state: { from: props.location }
                      }}/>
                   }}/>)
}

const Entry = () => {
    return (
        <Router>
            <Route component={SignIn} path='/' exact />
            <PrivateRoute component={App} data={null} path='/home' exact/>
            <PrivateRoute component={ShowSectors} path='/sectors' exact />
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Entry/>
    </React.StrictMode>,

    document.getElementById('root')
)
;
