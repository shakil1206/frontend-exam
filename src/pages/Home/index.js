import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HCard from '../../components/Common/HCard'
import { useSelector, useDispatch } from 'react-redux';
import CustomSpinner from './../../components/Common/CustomSpinner';
import { fetchData } from './../../features/Post/postSlice';

const Home = () => {
    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.post);

    useEffect(() => {
        if (allPost.postData.length <= 0) {
            dispatch(fetchData())
        }
    }, [allPost.postData.length, dispatch])


    // console.log(allPost)

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
                    {
                        allPost.postData.length !== 0 ?
                            allPost.postData.map((item, index) =>
                                <Col key={index} md={'12'} className="mb-3">
                                    <HCard data={item} action={false} />
                                </Col>
                            )
                            :
                            <>
                                {
                                    allPost.loading === false &&
                                    <Col md={'12'} className="mb-3">
                                        <h2 className='text-center mt-5'>Data not found!</h2>
                                    </Col>
                                }

                            </>
                    }


                </Row>
            </Container>
        </>
    )
}

export default Home