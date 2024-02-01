import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import IngredientModal from './IngredientModal';
import { BASE_IMAGE_URL, BASE_URL } from '../Utilities/constant';
import useApi from '../Utilities/service';

export default ({ payload, setPayload, imageList, loading, categoryList, type, deleteProduct, deleteNewProduct, onAssign }) => {
    const [isModalopen, setIsModelOpen] = useState(false);
    const [ingredientImgList, setIngredientImgList] = useState([]);
    const [isLarge, setIsLarge] = useState(false);
    const [ingradientIdList, setIngradientIdList] = useState([]);
    const [activeIngredient, setActiveIngredient] = useState();

    const { data, error, setConfig } = useApi();

    useEffect(() => {
        if (data && data.success) {
            setIngredientImgList(data.data)
        }
    }, [data])

    const fetchConfig = {
        method: 'get',
        url: `${BASE_URL}admincategorylist?type=ingredientscontent`,
        // You can include other Axios configuration options here
    }


    useEffect(() => {
        if (type === 'ingredients') {
            setConfig(fetchConfig);
        }
    }, [type])

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
            return <span className={`${d.id === activeIngredient ? 'active' : ''}`} onClick={() => {
                if (!isNew) {
                    setIngradientIdList(d.ingradient_id ? d.ingradient_id.split(',') : []);
                    setActiveIngredient(d.id)
                }
            }} style={isNew ? { border: '0.5px solid #ff003b' } : {}} key={d.id}>{d.name}<div className='delete-pills' onClick={(e) => {
                e.stopPropagation();
                if (activeIngredient === d.id) {
                    setIngradientIdList([]);
                    setActiveIngredient();
                }
                isNew ? deleteNewProduct(d.id) : deleteProduct(d.id)
            }}>
                    <span>X</span>
                </div></span>
        })
    }

    const populateImages = (list, isNew) => {
        return list.map((d) => {
            return (
                <div key={d.id}>
                    <img key={d.id} style={isNew ? { border: '0.5px solid #ff003b' } : {}} className={'small'} src={d.image && typeof (d.image) === 'object' ? URL.createObjectURL(d.image) : BASE_IMAGE_URL + d.image}
                    // onClick={() => updatePayload(d.id)}
                    />
                    <span>{d.name}</span>
                    <div className='delete-img' onClick={() => isNew ? deleteNewProduct(d.id) : deleteProduct(d.id)}>
                        <span>X</span>
                    </div>
                </div>
            )
        })
    }

    const populateIngrdientImages = (list) => {
        return list.map((d) => {
            return (
                <div key={d.id}>
                    <img key={d.id} className={'small'} src={BASE_IMAGE_URL + d.image}
                    // onClick={() => updatePayload(d.id)}
                    />
                    <span>{d.name}</span>
                    <div className='checkbox-img'>
                        <input
                            type='checkbox'
                            onChange={() => {
                                const ingredientId = String(d.id);
                                const updatedList = ingradientIdList.includes(ingredientId)
                                    ? ingradientIdList.filter((id) => id !== ingredientId)
                                    : [...ingradientIdList, ingredientId];

                                setIngradientIdList(updatedList);
                            }}
                            checked={ingradientIdList.includes(String(d.id))}
                        />
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='columns' style={{ position: 'relative' }}>
            {
                type === 'ingredients' ?
                    <>
                        <div className='tab-pills'>
                            {!isModalopen && <div className='upload-box' onClick={() => {
                                setIsModelOpen(true);
                                setIngradientIdList([]);
                                setActiveIngredient();
                            }}>
                                Upload +
                            </div>}
                            {populateTabPills(payload, true)}
                            {populateTabPills(imageList, false)}
                        </div>
                        <div className='avatar-block'>
                            {activeIngredient && <>
                                <div>
                                    <button className='scentia-button' onClick={() => onAssign(ingradientIdList, activeIngredient)}>Assign</button>
                                </div>
                                {populateIngrdientImages(ingredientImgList)}
                            </>}
                        </div>
                        {isModalopen && <IngredientModal setIsModelOpen={setIsModelOpen} handleNewList={handleNewList} />}
                    </>
                    :
                    <div className={'avatar-block'}>
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