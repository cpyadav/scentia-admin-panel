import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { BASE_IMAGE_URL } from '../Utilities/constant';
import Modal from './Modal';

export default ({ payload, setPayload, imageList, loading }) => {
    const [isModalopen, setIsModelOpen] = useState(false)

    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const largeImageThreshold = 124;

        // Function to check if the image is large
        const isImageLarge = (img) => img.naturalWidth > largeImageThreshold || img.naturalHeight > largeImageThreshold;

        // Fetch images from API
        const images = document.querySelectorAll('.avatar-block img');

        // Check image sizes when images load
        const handleImageLoad = () => {
            const isAnyLargeImage = Array.from(images).some(img => isImageLarge(img));
            setIsLarge(isAnyLargeImage);
        };

        // Attach load event listener to each image
        images.forEach(img => {
            img.addEventListener('load', handleImageLoad);
        });
        return () => {
            // Remove event listeners when component unmounts
            images.forEach(img => {
                img.removeEventListener('load', handleImageLoad);
            });
        };
    }, [loading]);

    const handleNewList = (image, name) => {
        setPayload([...payload,{
            id: Date.now(),
            image: image,
            name: name
        }])
        setIsModelOpen(false)
    }

    return (
        <div className='columns' style={{ position: 'relative' }}>
            <div className='avatar-block'>
                {!isModalopen && <div className='upload-box' onClick={() => setIsModelOpen(true)}>
                    Upload +
                </div>}
                {payload.map((d) => {
                    return (
                        <div key={d.id}>
                            <img key={d.id} style={{border: '0.5px solid #ff003b'}} className={'large'} src={URL.createObjectURL(d.image)}
                            // onClick={() => updatePayload(d.id)}
                            />
                            <span>{d.name}</span>
                        </div>
                    )
                })}
                {imageList.map((d) => {
                    return (
                        <div key={d.id}>
                            <img key={d.id} className={'large'} src={BASE_IMAGE_URL + d.image}
                            // onClick={() => updatePayload(d.id)}
                            />
                            <span>{d.name}</span>
                        </div>
                    )
                })}
                {isModalopen && <Modal setIsModelOpen={setIsModelOpen} handleNewList={handleNewList} />}
            </div>
        </div>
    )
}