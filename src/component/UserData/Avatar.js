import React from 'react';
import { BASE_IMAGE_URL } from '../Utilities/constant';

export default ({ imageList }) => {
    const populateImages = (list) => {
        return list.map((d) => {
            return (
                <div key={d.id}>
                    {d.image && <img key={d.id} className={'small'} src={BASE_IMAGE_URL + d.image}/>}
                    <span>{d.name}</span>
                </div>
            )
        })
    }

    return (
        <div className='columns' style={{ position: 'relative' }}>
            {!!imageList && !!imageList.length && populateImages(imageList)}
        </div>
    )
}