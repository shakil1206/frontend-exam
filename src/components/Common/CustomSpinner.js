import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const CustomSpinner = ({ size = "lg" }) => {
    return (
        <>
            <div className='text-center mt-5'>
                <Spinner animation="border" variant="danger" role="status" size={size}>
                </Spinner>
            </div>

        </>
    )
}

export default CustomSpinner