import React, { useEffect, useReducer, useState } from 'react';
import SidePanel from '../component/SidePanel';
import '../App.css';
import useApi from '../component/Utilities/service';
import { BASE_URL } from '../component/Utilities/constant';
import Loader from '../component/Common/Loader';
import { LogoutOutlined } from '@ant-design/icons';

import { LEFT_PANEL } from './Utilities/constant'
import Avatar from './Common/Avatar';

import './Common/common.css';

const initialPayload = [];
const initialLeftPanel = [...LEFT_PANEL];

// Define action types
const SET_PAYLOAD = 'SET_PAYLOAD';
const SET_ACTIVE_PANEL = 'SET_ACTIVE_PANEL';
const SET_LEFT_PANEL = 'SET_LEFT_PANEL';

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case SET_PAYLOAD:
            return { ...state, payload: action.payload };
        case SET_ACTIVE_PANEL:
            return { ...state, activePanel: action.activePanel };
        case SET_LEFT_PANEL:
            return { ...state, leftPanel: action.leftPanel };
        default:
            return state;
    }
};

const Dashboard = (props) => {
    // useReducer hook
    const [state, dispatch] = useReducer(reducer, {
        payload: initialPayload,
        activePanel: 'category',
        leftPanel: initialLeftPanel
    });

    // Destructuring state for easier use
    const { payload, activePanel, leftPanel } = state;

    const updateConfig = {
        method: 'post',
        url: `${BASE_URL}addnewProduct/${activePanel}`,
        data: payload
        // You can include other Axios configuration options here
    }

    const fetchConfig = {
        method: 'get',
        url: `${BASE_URL}admincategorylist?type=${activePanel}`,
        // You can include other Axios configuration options here
    }
    const { data:uData, loading:uloading, error:uError, setConfig: uSetConfig } = useApi();

    const { data:dData, loading:dloading, error:dError, setConfig: dSetConfig } = useApi();

    const { data, loading, error, setConfig } = useApi();

    const [imageList, setImageList] = useState([]);

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        console.log(data)
        if(data && data.success) {
            if(activePanel === 'category') {
                setCategoryList(data.data)
            }
            setImageList(data.data)
        }
    },[data])


    useEffect(() => {
        dispatch({ type: SET_PAYLOAD, payload: initialPayload });
        setConfig(fetchConfig);
    },[activePanel])

    useEffect(() => {
        if(uData && uData.success) {
            dispatch({ type: SET_PAYLOAD, payload: initialPayload });
            if(activePanel === 'category') {
                setCategoryList(uData.data)
            }
            setImageList(uData.data)
        }
    },[uData])
    

    const handleUpdate = () => {
        if(payload.length) {
            const formData = new FormData();
            if(activePanel === 'ingredient') {
                payload.forEach((image) => {
                    formData.append(`name[]`, image.name);
                  });
                uSetConfig({
                    ...updateConfig,
                    url: `${BASE_URL}addnewIngradient`,
                    data: formData
                })
            }
            else {
                if(payload[0].catId) {
                    formData.append('category', payload[0].catId)
                }
    
                payload.forEach((image) => {
                    formData.append(`images`, image.image);
                    formData.append(`name[]`, image.name);
                  });
                uSetConfig({
                    ...updateConfig,
                    url: `${BASE_URL}addnewProduct/${activePanel}`,
                    data: formData
                })
            }
        }
    }

    const deleteProduct = (id) => {
        dSetConfig({
            method: 'post',
            url: `${BASE_URL}deleteProduct/${activePanel}/${id}`
        })
    }

    const deleteNewProduct = (id) => {
        dispatch({ type: SET_PAYLOAD, payload: payload.filter(d => d.id != id) })
    }

    useEffect(() => {
        if(dData && dData.success) {
            setImageList(dData.data)
        }
    },[dData])

    return (
        <div className={`client-briefing-210`}>
            <span className='logout' onClick={() => {
                localStorage.removeItem('token');
                props.setToken()
            }}>
                Logout
                <LogoutOutlined />
            </span>
            {(uloading || loading || dloading) && <Loader />}
            <div className='client-briefing-210-child'>
                <div className='client-briefing-210-gchild'>
                    <Avatar
                        imageList={imageList}
                        payload={payload}
                        setPayload={(newPayload) => dispatch({ type: SET_PAYLOAD, payload: newPayload })}{...props} loading={loading}
                        categoryList={categoryList}
                        type={activePanel}  
                        deleteProduct={deleteProduct}
                        deleteNewProduct={deleteNewProduct}
                    />
                        <span onClick={handleUpdate} className='logout' style={{backgroundColor: 'green',right: '100px'}}>Update</span>
                </div>
            </div>
            <SidePanel leftPanel={leftPanel} activePanel={activePanel} setActivePanel={(panel) => dispatch({ type: SET_ACTIVE_PANEL, activePanel: panel })}  />
        </div>
    );
};

export default Dashboard;
