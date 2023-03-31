import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../features/Post/postSlice';
const HCard = ({ action, data }) => {
    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.post);

    const maxChars = (text) => text.substring(0, 70);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                        {maxChars(data.body)}...
                    </Card.Text>
                    <div className='text-end'>
                        <Link to={`/view-post/${data.id}`}><Button className='m-1' variant="success">View Post</Button></Link>
                        {
                            action &&
                            <>
                                <Link to={`/update/${data.id}`}><Button className='m-1' variant="warning">Edit Post</Button></Link>
                                <Button onClick={() => dispatch(deletePost({ id: data.id, data: allPost }))} className='m-1' variant="danger">Delete Post</Button>
                            </>
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default HCard