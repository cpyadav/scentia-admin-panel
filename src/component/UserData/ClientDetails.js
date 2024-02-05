import React from 'react';

export default ({category_name, industry, brand_vision}) => {
    return (
        <div className='user-heading'>
            <h2>Client Details</h2>
            <div className='client-details'>
                <div><span>Company Name : </span> <p>{category_name}</p></div>
                <div><span>Industry : </span> <p>{industry}</p></div>
                <div><span>Brand's vision : </span> <p>{brand_vision}</p></div>
            </div>
        </div>
    )
}