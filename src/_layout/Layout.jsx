import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { Authorize } from '../auth'

const Layout = ({ layout }) => {
    return (
        <Authorize>
            <div className='main'>
                <Header layout={layout} />
                <div className="content">
                    <Outlet />
                </div>
                <Footer layout={layout} />
            </div>
        </Authorize>
    )
}

export { Layout }