import Col from 'react-bootstrap/Col';
import styles from './StoreItem.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import React from "react";

import { CastItemList } from '../atoms/CastItem';
import { backendPath } from '../../config.js';

import Slider from "react-slick";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

// import fs from 'fs';

import "../../assets/css/slick.css"; 
import "../../assets/css/slick-theme.css";
import { updateDetailStoreId } from '../../slices/storesSlice';

export const StoreItem = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const store = props.store;

    const handleStoreDetail = (store_id) => {
        dispatch(updateDetailStoreId(store_id));
        navigate('/store_detail', { state: { storeId: store_id }});
    }

    return (
        <Col sm={12} md={12} className={styles.container}>
            <img src={`${backendPath}media/bars/bar${store.id}-0.jpg`} alt="Card image cap" 
                    onClick={ () => handleStoreDetail(store.id) }/>
            <div className={styles.title_bar}>
                <h5>{store.bar_title}</h5>
            </div>
        </Col>
    )
}


export const StoreItemHome = (props) => {

    const dispatch = useDispatch();
    const store = props.store;

    const navigate = useNavigate();

    const handleStoreDetail = (store_id) => {
        
        dispatch(updateDetailStoreId(store_id));
        // navigate('/store_detail', { state: { storeId: store_id }});
        navigate('/store_detail');
    }

    return (
        <Col sm={12} md={12} className={styles.container}>
            <img src={`${backendPath}media/bars/bar${store.id}-0.jpg`} alt="Card image cap" 
                    onClick={ () => handleStoreDetail(store.id) }/>
            <div className={styles.title_bar}>
                <h5>{store.bar_title}</h5>
            </div>
        </Col>
    )
}

export const StoreItemList = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const store = props.store;    
    const casts = props.casts;
    
    const [store_casts, setStore_casts] = useState([]);

    const handleStoreDetail = (store_id) => {
        dispatch(updateDetailStoreId(store_id));
        navigate('/store_detail', { state: { storeId: store_id }});
    }
    
    
    useEffect( () => {
        const fetchData = async() => {
            let search = "," + store.id + ",";

            const results = await casts.filter(cast => cast.bar_ids.include(search));
            setStore_casts(results);
        }              
        
        fetchData();
    }, [casts])
    
    const imagesPerSlide_pc = store_casts.length < 4? store_casts.length: 4;   
    const imagesPerSlide_1024 = store_casts.length < 3? store_casts.length: 3;    
    const imagesPerSlide_768 = store_casts.length < 2? store_casts.length: 2;
    const imagesPerSlide_375 = store_casts.length < 2? store_casts.length: 2;

    const settings = {
        accessibility: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        dots: true,
        draggable: true,
        focusOnSelect: true,
        infinite: true,
        initialSlide: 0,
        pauseOnFocus: true,
        speed: 500,
        slidesToShow: imagesPerSlide_pc,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [            
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: imagesPerSlide_1024,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: imagesPerSlide_768,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                }
            },            
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: imagesPerSlide_375,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };


    return (
        <Col sm={12} md={12} className={styles.container + ' row ' + styles.storeItemList_detail}>
            <Col xs={12} md={4}>
                <img src={`${backendPath}media/bars/bar${store.id}-0.jpg`} 
                        onClick={ () => handleStoreDetail(store.id) }
                        className={styles.storeItem_mainimg}></img>
            </Col>
            <Col xs={12} md={8}>
                <Col xs={12} md={12}>
                    <h5 className={styles.storeItemList_title}>{store.bar_title} ({store.bar_eid})</h5>
                </Col>
                <Col xs={0} sm={1} md={10}>&nbsp;</Col>
                <Col xs={12} sm={10} md={12} className='row'> 
                    <Col xs={4} md={3}>
                        <label className={styles.field_label}>都道府県 ,  住所</label>
                    </Col>
                    <Col xs={8} md={9}>
                        <span className={styles.field_value}>{store.province}, {store.bar_position}</span>
                    </Col>
                    <Col xs={4} md={3}>
                        <label className={styles.field_label}>ジャンル</label>
                    </Col>
                    <Col xs={8} md={9}>
                        <span className={styles.field_value}>{store.bar_categorys}</span>
                    </Col>
                    <Col xs={4} md={3}>
                        <label className={styles.field_label}>施設タイプ</label>
                    </Col>
                    <Col xs={8} md={5}>
                        <span className={styles.field_value}>{store.bar_facilitys}</span>
                    </Col>
                    
                    <Col xs={12} md={4}>
                        <label className={ styles.cast_label }>casts</label>
                        <span className={styles.cast_value} 
                                style={{'marginLeft': '3px', 'color': 'red', 'fontWeight': 'bold'}}>{store.cast_cnt}名</span>
                    </Col>
                    <Col xs={12} md={12}>
                        { store_casts.length > 0 &&
                        <div className={styles.SliderDiv}>
                            <Slider {...settings}>
                                {
                                    store_casts.map((item, index) =>{
                                        return (
                                            <div key={item.id} className={styles.storeItemList_imageDiv}>
                                                <img src={`${backendPath}media/casts/${item.id}.jpg`} className={styles.imageSlider}></img>
                                                <div className={styles.storeItemList_image_info}>{item.cast_name}</div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </Slider>
                        </div>    
                        }      
                    </Col>                    
                </Col>
                <Col xs={0} sm={1} md={10}>&nbsp;</Col>
            </Col>            
        </Col>
    )
}

export const StoreItemDetail = (props) => {
    
    const store = props.store;
    const casts = props.casts;
    /*  In the http path   */
    const checkFilesExist = async (filenamePrefix) => {
                        
        const response = await axios.get(`${backendPath}bars/casts_checkimage_exist`, {
            params: {imgprefix: filenamePrefix}
        });
        return response.data;        
    };

    const filenamePrefix = 'bar'+store.id+"-";

    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        const fetchData = async (filenamePrefix) => {
            let results = await checkFilesExist(filenamePrefix);
            setExistingImages(results);
        }
        
        fetchData(filenamePrefix);
    }, [filenamePrefix]);

    const imagesPerSlide_pc = existingImages.length < 3? existingImages.length: 3;   
    const imagesPerSlide_768 = existingImages.length < 2? existingImages.length: 2;
    const imagesPerSlide_376 = 1;

    const settings = {
        accessibility: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        dots: true,
        draggable: true,
        focusOnSelect: true,
        infinite: true,
        initialSlide: 0,
        pauseOnFocus: true,
        speed: 500,
        slidesToShow: imagesPerSlide_pc,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [            
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: imagesPerSlide_pc,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                }
            },            
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: imagesPerSlide_768,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },            
            {
                breakpoint: 376,
                settings: {
                    slidesToShow: imagesPerSlide_376,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },            
        ]
    };

    return (
        <Col sm={12} md={12} className={styles.container + ' row ' + styles.storeItemDetail_detail}>
            <Col xs={12} md={12} >
                <div className={styles.store_info_mark}>店舗情報</div>
            </Col>
            <Col xs={12} md={12}>
                <div className={styles.barsliderDiv}>
                    {
                        existingImages.length > 0 &&    
                        <Slider {...settings}>
                            {
                                existingImages.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.storeItemDetail_imageDiv}>
                                            <img src={`${backendPath}media/bars/${item}`} className={styles.imageSlider}></img>                                        
                                        </div>
                                    )
                                })
                            }                       
                            
                        </Slider>
                    }
                </div>    
            </Col>
            
            <Col xs={12} md={12} style={{'marginTop': '30px'}}>
                
                <Col xs={12} md={12}>
                    <a className={styles.store_info_name}>{store.bar_title}</a>
                </Col>
                <Col xs={12} md={12} style={{'marginTop': '20px'}}>
                    <label className={styles.store_label}>{store.bar_categorys}</label>
                    <label className={styles.store_label}>{store.bar_facilitys}</label>
                    <label className={styles.store_label}>{store.province}</label>
                </Col>

                <Col xs={12} md={12} className='row' style={{'marginTop': '15px !important'}}> 
                    <Col xs={2} md={0}></Col>    
                    <Col xs={8} md={12}>
                        <label className={styles.storeItemDetail_field_label}>住所</label>
                        <span className={styles.storeItemDetail_field_value}>{store.bar_position}</span>
                    </Col>
                    <Col xs={2} md={0}></Col>
                </Col>
                <Col xs={12} md={12} className='row mt-2'>     
                    <Col xs={2} md={0}></Col>
                    <Col xs={8} md={12}>
                        <label className={styles.storeItemDetail_field_label}>アミューズメント</label>
                        <span className={styles.storeItemDetail_field_value}>{store.bar_amusements}</span>
                    </Col>
                    <Col xs={2} md={0}></Col>

                    <Col xs={2} md={0}></Col>
                    <Col xs={8} md={12}>
                        <label className={styles.storeItemDetail_field_label}>支払い方法</label>
                        <span className={styles.storeItemDetail_field_value}>{store.paymentmethods}</span>
                    </Col>
                    <Col xs={2} md={0}></Col>

                    <Col xs={2} md={0}></Col>
                    <Col xs={8} md={12}>
                        <label className={styles.storeItemDetail_field_label}>説明</label>
                        <p className={styles.storeItemDetail_field_value}>{store.bar_description}</p>
                    </Col>
                    <Col xs={2} md={0}></Col>
                </Col>
            </Col>
            <Col xs={12} md={12}>
                {
                    casts.map((item, index) => {
                        return (
                            <CastItemList key={item.id} cast={item}/>
                        )
                    })
                }
            </Col>
        </Col>
    )
}
