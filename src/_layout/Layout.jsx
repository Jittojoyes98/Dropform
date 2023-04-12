import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

const Layout = ({ layout }) => {
    // make use of loader, the full loader (mainly for auth loader)
    return (
        <div className='main'>
            <Header layout={layout} />
            <div className="content">
                <Outlet />
            </div>
            <Footer layout={layout} />
        </div>
    )
}

export { Layout }