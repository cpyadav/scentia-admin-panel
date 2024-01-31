import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import IngredientModal from './IngredientModal';
import { BASE_IMAGE_URL } from '../Utilities/constant';

export default ({ payload, setPayload, imageList, loading, categoryList, type, deleteProduct }) => {
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

    const handleNewList = (name, image, catId) => {
        setPayload([...payload, {
            id: Date.now(),
            image: image,
            name: name,
            catId: catId
        }])
        setIsModelOpen(false)
    }

    const populateTabPills = (list, isNew) => {
        return list.map((d) => {
            return <span style={isNew ? { border: '0.5px solid #ff003b' } : {}} key={d.id}>{d.name}<div className='delete-pills' onClick={() => deleteProduct(d.id)}>
            <span>X</span>
        </div></span>
        })
    }

    const populateImages = (list, isNew) => {
        return list.map((d) => {
            return (
                <div key={d.id}>
                    <img key={d.id} style={isNew ? { border: '0.5px solid #ff003b' } : {}} className={'large'} src={d.image && typeof (d.image) === 'object' ? URL.createObjectURL(d.image) : BASE_IMAGE_URL + d.image}
                    // onClick={() => updatePayload(d.id)}
                    />
                    <span>{d.name}</span>
                    <div className='delete-img' onClick={() => deleteProduct(d.id)}>
                        <span>X</span>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='columns' style={{ position: 'relative' }}>
            {
                type === 'ingredients' ? <div className={'tab-pills'}>
                    {!isModalopen && <div className='upload-box' onClick={() => setIsModelOpen(true)}>
                        Upload +
                    </div>}
                    {populateTabPills(payload, true)}
                    {populateTabPills(imageList, false)}
                    {isModalopen && <IngredientModal setIsModelOpen={setIsModelOpen} handleNewList={handleNewList} />}
                </div> : <div className={'avatar-block'}>
                    {!isModalopen && <div className='upload-box' onClick={() => setIsModelOpen(true)}>
                        Upload +
                    </div>}
                    {populateImages(payload, true)}
                    {populateImages(imageList, false)}
                    {isModalopen && <Modal type={type} categoryList={categoryList} setIsModelOpen={setIsModelOpen} handleNewList={handleNewList} />}
                </div>
            }
        </div>
    )
}