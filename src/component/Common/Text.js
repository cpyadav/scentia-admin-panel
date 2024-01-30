import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

export default ({ setSignalIfValid, activeStep, count, label, placeholder, pField, payload, setPayload, selectBefore, type }) => {
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

    const updatePayload = (val) => {
        setPayload({
            ...payload,
            [pField]: val
        })
    }

    return (
        <div className='columns' style={{ position: 'relative' }}>
            <div className='field-header'>
                <label>{label}</label>
                {count && <div className="div27">
                    <span>(</span>
                    <span className="span26">{activeStep + 1}</span>
                    <span>/{count})</span>
                </div>}
            </div>
            <Input
                placeholder={placeholder}
                onChange={e => updatePayload(e.target.value)}
                value={payload[pField] || ''}
                addonBefore={selectBefore}
                type={type || 'text'}
                autoComplete={"off"}
            />
        </div>)
}