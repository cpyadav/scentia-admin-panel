import React from 'react';

export default ({market_location
    , age_gp, gender, tg_user_occup, target_user_lifestyle, target_user_behaviour}) => {
    return (
        <div className='user-heading'>
            <h2>Consumer Details</h2>
            <div className='consumer-details'>
                <div><span className='product-name'>Market Location : </span> <p>{market_location}</p></div>
                <div><span className='product-name'>Audience Age Group : </span> <p>{age_gp}</p></div>
                <div><span className='product-name'>Audience Gender : </span> <p>{gender}</p></div>
                <div><span className='product-name'>Target User Occupation : </span> <p>{tg_user_occup}</p></div>
                {/* <div><span className='product-name'>Target User Lifestyle : </span> <p>{target_user_lifestyle}</p></div> */}
                {/* <div><span className='product-name'>Target User Behaviour : </span> <p>{target_user_behaviour}</p></div> */}
            </div>
        </div>
    )
}