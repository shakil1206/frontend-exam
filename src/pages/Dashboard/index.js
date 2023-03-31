import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HCard from '../../components/Common/HCard'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CustomSpinner from './../../components/Common/CustomSpinner';
import { fetchData } from './../../features/Post/postSlice';

const Dashboard = () => {

    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.post);

    useEffect(() => {
        if (allPost.postData.length <= 0) {
            dispatch(fetchData())
        }
    }, [allPost.postData.length, dispatch])


    const clearLocalStorage = () => {
        localStorage.removeItem('post')
        dispatch(fetchData())
    }

    return (
        <Container fluid={'lg'} className={'pt-5'}>
            <Row>
                <Col md={'12'} className="mb-3">
                    <h1 className='text-center text-uppercase mb-3'>Welcome to our digital Dashboard</h1>
                    <div className='text-end'>
                        <Link to={'/post'}>
                            <Button variant="success" className='text-uppercase'>Post your Idea!</Button>
                        </Link>
                    </div>

                </Col>
                <Col md={'12'} className="mb-3">
                    {/* <HCard action={true} /> */}
                </Col>

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
                                <HCard data={item} action={true} />
                            </Col>
                        )
                        :
                        <>
                            {
                                allPost.loading === false &&
                                <Col md={'12'} className="mb-3 text-center">
                                    <h2 className='text-center mt-5 mb-5'>Data not found!</h2>
                                    <Link to={'/post'}>
                                        <Button variant="success" className='text-uppercase me-3'>Post your Idea!</Button>
                                    </Link>
                                    <Button onClick={clearLocalStorage} variant="danger" className='text-uppercase'>Clear Local Storage</Button>
                                </Col>

                            }
                        </>
                }
            </Row>
        </Container>
    )
}

export default Dashboard