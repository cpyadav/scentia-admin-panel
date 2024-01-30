import React, { useState, useEffect } from 'react'
import Dropdown from '../Common/Dropdown';
import useApi from '../Utilities/service';
import Loader from '../Common/Loader';
import { BASE_IMAGE_URL, BASE_URL } from '../Utilities/constant';

export default ({ label, multiple,fields, activeStep, count,payload, setPayload, pField, ...props }) => {
    const [activeCountry, setActiveCountry] = useState();
    const [countryList, setCountryList] = useState([]);

    const config = {
        method: 'get',
        url: `${BASE_URL}categorylist?type=${pField}`,
        // You can include other Axios configuration options here
    }
    const { data, loading, error, setConfig } = useApi();


    useEffect(() => {
        if(data && data.success) {
            setActiveCountry(1)
        }
    },[data])

    useEffect(() => {
        setConfig(config)
    }, [pField])


    useEffect(() => {
        if(activeCountry) {
            const activeCountries = data && data.data.filter(d => d.id === activeCountry)[0].location_data;
            console.log(activeCountries)
            setCountryList(activeCountries)
        }
    },[activeCountry])

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
            <div className='avatar-block'>
                {data && data.data.map((d, index) => {
                    return (
                        <div key={index} className={activeCountry === d.id ? 'active' : ''}>
                            <img key={index} src={BASE_IMAGE_URL + d.image} onClick={() => setActiveCountry(d.id)} />
                            <span>{d.name}</span>
                        </div>
                    )
                })}
            </div>
            <Dropdown {...props} pField={pField} title="Market" label="Select Your Market location" placeholder='Select Location' fields={countryList} payload={payload} setPayload={setPayload} />
        </div>
    )
}