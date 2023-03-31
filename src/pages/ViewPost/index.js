import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import CustomSpinner from '../../components/Common/CustomSpinner';
import { fetchData } from './../../features/Post/postSlice';

const ViewPost = () => {
    const dispatch = useDispatch();

    const dataId = useParams();
    const allPost = useSelector((state) => state.post);
    const [singleItem, setSingleItem] = useState([]);

    useEffect(() => {
        const singleData = allPost.postData.filter(item => item.id == dataId.id);
        setSingleItem(singleData);
    }, [allPost, dataId])

    useEffect(() => {
        if (allPost.postData.length <= 0) {
            dispatch(fetchData())
        }
    }, [allPost])


    return (
        <>

            <Container fluid={'lg'} className={'pt-5'}>
                <Row>
                    {
                        allPost.loading && <>
                            <Col md={'12'} className="mb-3">
                                <CustomSpinner size="xxl" />
                            </Col>
                        </>
                    }
                    {
                        allPost.error && <>
                            <Col md={'12'} className="mb-3">
                                <h2 className='text-center mt-5'>{allPost.message}</h2>
                            </Col>

                        </>
                    }
                    <Col md={'12'} className="mb-3">
                        {
                            singleItem.length !== 0 && <>
                                <h1 className='mb-3 text-center'>{singleItem[0].title} </h1>
                                <p className='text-center'>{singleItem[0].body} </p>
                            </>
                        }

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewPost