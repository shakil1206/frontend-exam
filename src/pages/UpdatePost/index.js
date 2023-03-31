import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updatePostItem } from './../../features/Post/postSlice';


const UpdatePost = () => {
    const dataId = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.post);


    const matchItem = () => {
        return allPost.postData.filter(item => item.id == dataId.id)
    }

    function updateItem(array, updatedItem) {
        const updatedArray = array.map((item) => {
            if (item.id == updatedItem.id) {
                return { ...item, ...updatedItem };
            }
            return item;
        });
        return updatedArray;
    }


    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema: yup.object({
            title: yup.string().min(5, "Title must have alteast 5 characters").required(),
            body: yup.string().min(30, "Your idea must have atleast 30 characters").required()
        }),

        onSubmit: (values) => {

            let updatePost = {
                body: values.body,
                title: values.title,
                id: dataId.id,
            }

            const updateItems = updateItem(allPost.postData, updatePost);
            dispatch(updatePostItem(updateItems))
            navigate(`/view-post/${dataId.id}`, { replace: true })
        }

    })


    useEffect(() => {
        const data = matchItem();
        if (data.length !== 0) {
            formik.setFieldValue('title', data[0].title)
            formik.setFieldValue('body', data[0].body)
        }
    }, [allPost, dataId])


    useEffect(() => {
        if (allPost.postData.length <= 0) {
            dispatch(fetchData())
        }
    }, [allPost.postData.length, dispatch])

    return (

        <Container fluid={'lg'} className={'pt-5'}>
            <Row>
                <Col md={'12'} className="mb-3">
                    <h1 className='text-center text-uppercase mb-3'>Update your idea!</h1>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row className="mb-3 mt-3">
                            <Form.Group as={Col} md="12" className='mb-3'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    isValid={formik.touched.title && !formik.errors.title}
                                    isInvalid={formik.touched.title && !!formik.errors.title}

                                />
                                <Form.Control.Feedback type='invalid'>{formik.errors.title}</Form.Control.Feedback>

                            </Form.Group>
                            <Form.Group as={Col} md="12" className='mb-3'>
                                <Form.Label>IDEA!</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="body"
                                    as="textarea"
                                    rows={5}
                                    onChange={formik.handleChange}
                                    value={formik.values.body}
                                    isValid={formik.touched.body && !formik.errors.body}
                                    isInvalid={formik.touched.body && !!formik.errors.body}
                                />
                                <Form.Control.Feedback type='invalid'>{formik.errors.body}</Form.Control.Feedback>
                            </Form.Group>
                            <div className='text-end'>
                                <Button variant='success' size='lg' type="submit">Update</Button>
                            </div>
                        </Row>
                    </Form>

                </Col>
            </Row>

        </Container>
    )
}

export default UpdatePost