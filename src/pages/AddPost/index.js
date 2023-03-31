import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addPost } from '../../features/Post/postSlice';
import { useNavigate } from 'react-router-dom';


const AddPost = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const formik = useFormik({
        initialValues: {
            title: '',
            body: ''
        },
        validationSchema: yup.object({
            title: yup.string().min(5, "Title must have alteast 5 characters").required(),
            body: yup.string().min(30, "Your idea must have atleast 30 characters").required()
        }),

        onSubmit: (values) => {
            console.log(values)

            let newPost = {
                body: values.body,
                title: values.title,
                id: uuidv4(),
                userId: uuidv4()
            }

            dispatch(addPost(newPost))

            navigate('/dashboard', { replace: true })
            // resetForm({ values: "" });
        }

    })

    return (

        <Container fluid={'lg'} className={'pt-5'}>
            <Row>
                <Col md={'12'} className="mb-3">
                    <h1 className='text-center text-uppercase mb-3'>Post your idea!</h1>

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
                                <Button variant='success' size='lg' type="submit">Post</Button>
                            </div>
                        </Row>
                    </Form>

                </Col>
            </Row>

        </Container>
    )
}

export default AddPost