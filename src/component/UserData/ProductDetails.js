import React from 'react';

export default ({p_name, p_size, p_selling_price, pBenchmark, web_link}) => {
    return (
        <div className='user-heading'>
            <h2>Product Details</h2>
            <div className='product-details'>
                <div><span className='product-name'>Product Name : </span> <p>{p_name}</p></div>
                <div><span className='product-name'>Product Size : </span> <p>{p_size}</p></div>
                <div><span className='product-name'>Product selling price : </span> <p>{p_selling_price}</p></div>
                <div><span className='product-name'>Product Benchmark : </span> <p>{pBenchmark}</p></div>
                <div><span className='product-name'>Website Link : </span> <p>{web_link}</p></div>
            </div>
        </div>
    )
}