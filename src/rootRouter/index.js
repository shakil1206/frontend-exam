import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Appbar from '../components/Layouts/Appbar';
import CounterApp from '../pages/CounterApp'
import Home from './../pages/Home/index';
import ViewPost from './../pages/ViewPost/index';
import Dashboard from './../pages/Dashboard/index';
import AddPost from './../pages/AddPost/index';
import UpdatePost from './../pages/UpdatePost/index';

const RootRouter = () => {
    return (
        <BrowserRouter>
            <Appbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/counter' element={<CounterApp />} />
                <Route path='/view-post/:id' element={<ViewPost />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/post' element={<AddPost />} />
                <Route path='/update/:id' element={<UpdatePost />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RootRouter