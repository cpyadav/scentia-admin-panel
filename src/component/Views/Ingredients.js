import React, { useState, useEffect } from 'react'
import useApi from '../Utilities/service';
import Loader from '../Common/Loader';
import { BASE_IMAGE_URL, BASE_URL } from '../Utilities/constant';

export default ({ label, multiple, activeStep, count, payload, setPayload, pField , setSignalIfValid}) => {
    const [activeIngredient, setActiveIngredient] = useState();
    const [ingredientList, setingredientList] = useState([]);

    const config = {
        method: 'get',
        url: `${BASE_URL}categorylist?type=${pField}`,
        // You can include other Axios configuration options here
    }
    const { data, loading, error, setConfig } = useApi();

    useEffect(() => {
        if(data && data.success) {
            setActiveIngredient(1)
        }
    },[data])

    useEffect(() => {
        setConfig(config)
    }, [pField])


    useEffect(() => {
        if (activeIngredient) {
            delete payload[pField]
            const activeCountries = data.data.filter(d => d.id === activeIngredient)[0].location_data;
            setingredientList(activeCountries)
        }
    }, [activeIngredient])

    const signalParent = (isValid) => {
        setSignalIfValid(isValid)
    }

    useEffect(() => {
        if (payload[pField]) {
            signalParent(true)
        }
        else {
            signalParent(false)
        }
    }, [payload[pField]])

    const handleImageClick = (imageId) => {
        const field = payload[pField] || [];
        if (field.includes(imageId)) {
            // If the image is already selected, deselect it
            setPayload({
                ...payload,
                [pField]: field.filter((id) => id !== imageId)
            })
        } else if (field.length < 3) {
            // If less than three images are selected, select the clicked image
            setPayload({
                ...payload,
                [pField]: [...field, imageId]
            })
        }
        // Otherwise, do nothing (limit reached)
    };

    const updatePayload = (val) => {
        if (multiple) {
            handleImageClick(val)
        }
        else {
            setPayload({
                ...payload,
                [pField]: [val]
            })
        }
    }

    return (
        <div className='columns' style={{ position: 'relative' }}>
            {loading && <Loader />}
            <div className='field-header'>
                <label>{label}</label>
                {multiple && <p>You can select maximum 3 options!</p>}
                <div className="div27">
                    <span>(</span>
                    <span className="span26">{activeStep + 1}</span>
                    <span>/{count})</span>
                </div>
            </div>
            <div className='tab-pills'>
                {data && data.data.map((d, index) => {
                    return <span key={index} onClick={() => setActiveIngredient(d.id)} className={activeIngredient === d.id ? 'active' : ''}>{d.name}</span>
                })}
            </div>
            {ingredientList.length ? <div className='avatar-block'>
                {ingredientList && ingredientList.map((d, index) => {
                    return (
                        <div key={index} className={payload[pField] && payload[pField].includes(d.id) ? 'active' : ''}>
                            <img key={index} src={BASE_IMAGE_URL + d.image} onClick={() => updatePayload(d.id)} />
                            <span>{d.name}</span>
                        </div>
                    )
                })}
            </div> : null}
        </div>
    )
}