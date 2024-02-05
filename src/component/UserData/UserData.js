import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../Utilities/constant';
import useApi from '../Utilities/service';
import Logo from '../../images/MicrosoftTeams-image (3).png'
import { Link } from 'react-router-dom';
import ClientDetails from './ClientDetails';
import ProductDetails from './ProductDetails';
import ConsumerDetails from './ConsumerDetails';
import FragranceDetails from './FragranceDetails';
import './UserData.css';

export default () => {
    const [userDataList, setUserDataList] = useState([]);
    const [isLarge, setIsLarge] = useState(false);
    const [activeId, setActiveId] = useState();
    const [userData, setUserData] = useState({});

    const {category_name, industry, brand_vision, name, size, price, benchmark, web_link, market, age_gp, gender, tg_user_occup, target_user_lifestyle, target_user_behaviour, smell, oflactive_dir, ingredients, emotions, colors, dosage, price_range, ref_link} = userData;

    const { data, error, loading, setConfig } = useApi();

    useEffect(() => {
        if (data && data.success) {
            setUserDataList(data.data);
            setActiveId(data.data[0].id);
            setUserData(data.data[0])
        }
    }, [data])

    const fetchConfig = {
        method: 'get',
        url: `${BASE_URL}all-client-data`,
        // You can include other Axios configuration options here
    }


    useEffect(() => {
        setConfig(fetchConfig);
    }, [])

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

    const populateTabPills = (list) => {
        return list.map((d) => {
            return (
                <span className={`${d.id === activeId ? 'active' : ''}`}
                    onClick={() => { 
                        setActiveId(d.id);
                        setUserData(d)
                    }}
                    key={d.id}
                >
                    {d.id}
                </span>
            )
        })
    }

    return (
        <div className={`client-briefing-210`}>
            <div className='rectangle-parent20' style={{ position: 'relative' }}>
                <div className='header grid-item'>
                    <img className='logo' src={Logo} />
                </div>
                <div className='tell-us-about'>
                    <Link to="/">Dashboard</Link>
                </div>
            </div>
            <div className='client-briefing-210-child'>
                <div className='tab-pills'>
                    {userDataList && userDataList.length && populateTabPills(userDataList)}
                </div>
                <div>
                    <ClientDetails category_name={category_name} industry={industry} brand_vision={brand_vision}/>
                    <ProductDetails p_name={name} p_size={size} p_selling_price={price} pBenchmark={benchmark} web_link={web_link}/>
                    <ConsumerDetails market_location={market} age_gp={age_gp} gender={gender} tg_user_occup={tg_user_occup} target_user_lifestyle={target_user_lifestyle} target_user_behaviour={target_user_behaviour}/>
                    <FragranceDetails smell={smell} oflactive_dir={oflactive_dir} ingredients={ingredients} emotions={emotions} colors={colors} dosage={dosage} price_range={price_range} ref_link={ref_link}/>
                </div>
            </div>
        </div>
    )
}