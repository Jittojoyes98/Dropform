import { Button } from '@mui/material'
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = ({ layout }) => {
    const navigate = useNavigate();

    const handlePath=(path)=>{
        navigate(`/${path}`)
    }
    const renderDashboard=()=>{
        // different layout for different dashboard pages
    }
    if(layout==="dashboard"){
        return renderDashboard()
    }
    const selectPath= layout==="login"?"signup":"login";

    const LoginSignUp=()=>{
        return (
            <>
            <span style={{paddingRight:"5px"}} className='common-text-light'>{layout === "login" ? "Don't have an account yet?" :"Already have an Account?" }</span>
            <Button variant="outlined" className='tertiary-button' onClick={() => handlePath(selectPath)}>{layout === "login" ? "Sign up" : "Log in"}</Button>
            {layout == "signup" ? <></> : <a style={{ paddingLeft: "5px" }} className='common-text-light'>Need help?</a>}
            </>
        )
    }

    const HomeHeader=()=>{
        return (
            <>
            <Button variant="outlined" className='primary-button' onClick={() => handlePath('login')}>Log in</Button>
            <Button variant='contained' className='secondary-button' onClick={() => handlePath('signup')}>Sign Up</Button>
            </>
        )
    }

    const headerType = layout === "login" || layout === "signup" 
    return (
        <div className={classNames('header-wrapper',{ 'header-wrapper-credentials':headerType})}>
            <div className='header-content'>
                <div className='logo'>
                {
                    (headerType) ? "":"Dropform"
                }
                </div>
                {/* <div></div> */}
                <div className='auth-content'>
                {
                    headerType ? <LoginSignUp /> : <HomeHeader/>
                }
                </div>
            </div>
        </div>
    )
}

export { Header }