import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

import { DockButton, SearchButton } from "../atoms/Buttons";
import { SearchBox } from "../atoms/Input";
import { SelectPrefectureDialog, SelectFilterDialog } from "./Modals";
import styles from './Dock.module.css';

import { fetchStore, searchStore, changeKeyword } from '../../slices/storesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Keywords } from './Keywords';

export const Dock = (props) => {

    const navigate = useNavigate();

    const prefectures = useSelector(state => state.stores.prefectures);
    const features = useSelector(state => state.stores.features);

    const keyword = useSelector(state => state.stores.keyword);
    
    const [prefectureShow, setPrefectureShow] = useState(false);
    const [featureShow, setFeatureShow] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        handleSubmit();
    }, [prefectures]);

    useEffect(() => {
        handleSubmit();
    }, [features]);

    useEffect(() => {
        handleSubmit();
    }, [keyword]);

    const handleChange = (event) => {
        dispatch(changeKeyword(event.target.value));
    }

    const handleEnterMouseDown = (event) => {
        
        if (event.keyCode === 13) {
            
            dispatch(changeKeyword(event.target.value));
            handleSubmitHome();
        }
    }

    const handleSubmit = () => {

        let params = new URLSearchParams();
        
        if(keyword !== "" && keyword !== undefined)
            params.append('keyword', keyword);
            
        let len = prefectures.length;
        for (let i = 0; i < len; i++) {
            params.append('prefecture', prefectures[i].id);
        }

        len = features.length;

        for(let i = 0; i < len; i++) {
            params.append('feature', features[i].id);
        }

        if(params.toString() === "") {
            dispatch(fetchStore());
        }
        else {            
            dispatch(searchStore(params));
        }
    }

    const handleSubmitHome = () => {
        let params = new URLSearchParams();
        
        if(keyword !== "" && keyword !== undefined)
            params.append('keyword', keyword);
            
        let len = prefectures.length;
        for (let i = 0; i < len; i++) {
            params.append('prefecture', prefectures[i].id);
        }

        len = features.length;

        for(let i = 0; i < len; i++) {
            params.append('feature', features[i].id);
        }

        if(params.toString() === "") {
            dispatch(fetchStore());
        }
        else {            
            dispatch(searchStore(params));
        }

        let url = props.redirect;

        if(props.redirect !== undefined && props.redirect !== "")
            navigate(url);
    }

    return (
        <Container fluid className={styles.container}>
            <Row className={`${styles.dock_container} w-100`}>
                <Col xs={12} sm={6} md={3} className="my-3">
                    <DockButton title='都道府県から探す' className='w-100' onClick={() => setPrefectureShow(true)} />
                </Col>
                <Col xs={12} sm={6} md={3} className="my-3">
                    <DockButton title='特徴から探す' className='w-100' onClick={() => setFeatureShow(true)} />
                </Col>
                <Col xs={12} sm={12} md={6} className={`${styles.input_group} my-3`}>
                    <SearchBox placeholder='店舗名・エリア・キーワード' value={keyword} className='w-100' 
                                onChange={handleChange} onKeyUp={handleEnterMouseDown}/>
                    <SearchButton onClick={handleSubmitHome} />
                </Col>
            </Row>

            <Keywords prefectures={prefectures} features={features} keyword={keyword}/>

            <SelectPrefectureDialog data={prefectures} size='lg' show={prefectureShow} scrollable={true} 
                onSubmit={handleSubmit} onHide={() => setPrefectureShow(false)} redirect={props.redirect} />

            <SelectFilterDialog data={features} size='lg' show={featureShow} scrollable={true} 
                onSubmit={handleSubmit} onHide={() => setFeatureShow(false)} redirect={props.redirect} />
        </Container>
    )
}

export default Dock;