import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import classNames from 'classnames'

const Layout = ({ layout }) => {
    // make use of loader, the full loader (mainly for auth loader)
    const isHome=layout==="home"
    const isDashboard=layout==="dashboard"
    // 24px
    return (
        <div className='main'>
            <Header layout={layout} />
            <div className={classNames({"content":isHome,"content-dashboard":isDashboard,"content-other":(!isDashboard && !isHome)})}>
                <Outlet />
            </div>
            <Footer layout={layout} />
        </div>
    )
}

export { Layout }