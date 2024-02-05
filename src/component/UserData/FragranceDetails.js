import React from 'react';
import Avatar from './Avatar';

export default ({smell, oflactive_dir, ingredients, emotions, colors, dosage, price_range, ref_link}) => {
    console.log(smell)
    return (
        <div className='user-heading'>
            <h2>Fragrance Details</h2>
            <div className='fragrance-details'>
                <div><span className='product-name'>Smell : </span> <Avatar imageList={smell} /></div>
                <div><span className='product-name'>Olfactive Direction : </span> <Avatar imageList={oflactive_dir} /></div>
                <div><span className='product-name'>Ingredients : </span> <Avatar imageList={ingredients} /></div>
                <div><span className='product-name'>Emotions : </span> <Avatar imageList={emotions} /></div>
                <div><span className='product-name'>Colors : </span> <Avatar imageList={colors} /></div>
                <div><span className='product-name'>Dosage : </span> <p>{dosage}</p></div>
                <div><span className='product-name'>Price Range : </span> <p>{price_range}</p></div>
                <div><span className='product-name'>Refrence Link : </span> <p>{ref_link}</p></div>
            </div>
        </div>
    )
}