import { Button } from '@mui/material'
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = ({ layout }) => {
    const navigate = useNavigate();

    const handlePath=(path)=>{
        navigate(`/${path}`)
    }
    // const renderDashboard=()=>{
    //     // different layout for different dashboard pages
    // }
    // if(layout==="dashboard"){
    //     return renderDashboard()
    // }
    const selectPath= layout==="login"? "signup":"login";

    const LoginSignUp=()=>{
        return (
            <>
            <span style={{paddingRight:"5px"}} className='common-text-light'>{layout === "login" ? "Don't have an account yet?" :"Already have an Account?" }</span>
            <Button variant="outlined" className='tertiary-button' onClick={() => handlePath(selectPath)}>{layout === "login" ? "Sign up" : "Log in"}</Button>
            {layout == "signup" ? <></> : <a style={{ paddingLeft: "5px" }} className='common-text-light'>Need help?</a>}
            </>
        )
    }
    const LogoChoose=()=>{
        if(layout==="home"){
            return "Dropform"
        }else{
            return (
                <div>Dashboard Logo</div>
            )
        }
    }

    const HeaderChoose=()=>{
        if(layout==="dashboard"){
            return (
                <>
                <div>Dashboard</div>
                </>
            )
        }
        return (
            <>
            <Button variant="outlined" className='primary-button' onClick={() => handlePath('login')}>Log in</Button>
            <Button variant='contained' className='secondary-button redirect-button' onClick={() => handlePath('signup')}>Sign Up</Button>
            </>
        )
    }

    const headerType = layout === "login" || layout === "signup" 
    const isDashboard=layout === "dashboard"
    const isHome=layout==="home"
    return (
        <div className={classNames({'header-wrapper-fixed':isHome,'header-wrapper-block':!isHome},{ 'header-wrapper-credentials':headerType,"header-wrapper-home":!headerType && layout !=="dashboard" },{"header-wrapper-dashboard":layout ==="dashboard"})}>
            <div className={classNames('header-content',{"header-content-fixed":!isDashboard,"header-content-full":isDashboard})}>
                <div className='logo'>
                {
                    (headerType) ? "" : LogoChoose()
                }
                </div>
                {/* <div></div> */}
                <div className='auth-content'>
                {
                    headerType ? <LoginSignUp /> : HeaderChoose()
                }
                </div>
            </div>
        </div>
    )
}

export { Header }