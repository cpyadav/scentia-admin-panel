import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

// import './App.css';
import Text from './Common/Text';
import Logo from '../images/MicrosoftTeams-image (3).png';
import Loader from './Common/Loader';
import { BASE_URL } from './Utilities/constant';
import useApi from './Utilities/service';

const initialObject = {
    "email": null,
    "password": null
};

const initialState = {
    payload: initialObject,
    signalIfValid: false,
    isActive: false
};

// Define action types
const SET_PAYLOAD = 'SET_PAYLOAD';
const SET_SIGNAL = 'SET_SIGNAL';
const SET_IS_ACTIVE = 'SET_IS_ACTIVE';

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case SET_PAYLOAD:
            return { ...state, payload: action.payload };
        case SET_SIGNAL:
            return { ...state, signalIfValid: action.signalIfValid };
        case SET_IS_ACTIVE:
            return { ...state, isActive: action.isActive };
        default:
            return state;
    }
};

const Login = (props) => {
    // useReducer hook
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructuring state for easier use
    const { payload, signalIfValid, isActive } = state;

    useEffect(() => {
        if (Object.values(payload).every((v) => !!v)) {
            dispatch({ type: SET_IS_ACTIVE, isActive: true });
        } else {
            // Optionally, handle the case when not all values are truthy
            dispatch({ type: SET_IS_ACTIVE, isActive: false });
        }
    }, [payload]);

    const config = {
        method: 'post',
        url: `${BASE_URL}adminlogin`,
        data: payload
        // You can include other Axios configuration options here
    };
    const { data, loading, setConfig } = useApi();
    if(data && data.success) {
        localStorage.setItem('token', data.data.access_token);
        props.setToken(data.data.access_token)
    }

    const login = () => {
        setConfig(config);
    };

    return (
        <div className='grid-container'>
            {loading && <Loader />}
            <div className='header grid-item'>
                <img className='logo' src={Logo} />
            </div>
            <div className='left-panel grid-item'>
                <h2>Start uploading fragrances for your products and brands</h2>
                <h1>Login your signature fragrance admin</h1>
            </div>
            <div className='right-panel grid-item'>
                <div className='flex-item'>
                    <Text
                        payload={payload}
                        setPayload={(newPayload) => dispatch({ type: SET_PAYLOAD, payload: newPayload })}
                        setSignalIfValid={(newSignal) => dispatch({ type: SET_SIGNAL, signalIfValid: newSignal })}
                        type={'email'} {...props} pField='email' title='Name' label='Work email address' placeholder='Your Email' />
                </div>
                <div className='flex-item'>
                    <Text payload={payload}
                        setPayload={(newPayload) => dispatch({ type: SET_PAYLOAD, payload: newPayload })}
                        setSignalIfValid={(newSignal) => dispatch({ type: SET_SIGNAL, signalIfValid: newSignal })} {...props} pField='password' title='Name' label='Password' placeholder='Your Password' type={'password'} />
                </div>
                {<div className='flex-item' style={{ width: '100%', paddingTop: '20px' }}>
                    <div className='log-sign-in'>
                        <button className='scentia-button' disabled={!isActive} onClick={() => { login() }}>{'Submit'}</button>
                        {/* <Link to ='/signup'>{'Sign Up'}</Link> */}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Login

