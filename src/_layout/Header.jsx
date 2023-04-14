import { Button, Tooltip } from '@mui/material'
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth';

const Header = ({ layout }) => {
    const {currentUser}=useAuthContext()
    //  we will take data from the walk through and store it somewhere.
    const navigate = useNavigate();

    const handlePath=(path)=>{
        navigate(`/${path}`)
    }
    const handleOragnisation=()=>{

    }
    // const renderDashboard=()=>{
    //     // different layout for different dashboard pages
    // }
    // if(layout==="dashboard"){
    //     return renderDashboard()
    // }
    const headerType = layout === "login" || layout === "signup" 
    const isDashboard=layout === "dashboard"
    const isHome=layout==="home"
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
                <div className='logo-button-wrapper' onClick={handleOragnisation}>
                    {
                        currentUser ? 
                        <>
                            <div className='logo-button'>
                                <span>{currentUser.email[0].toUpperCase()}</span>
                            </div>
                            <p>{currentUser.email.split("@")[0]}</p>
                        </>
                        :
                        <></>
                    }
                    
                </div>
            )
        }
    }

    const HeaderChoose=()=>{
        if(layout==="dashboard"){
            
            return (
                <Tooltip title={
                    currentUser ?
                    <div className='tooltip-title'>
                        <p className='tooltip-name'>{currentUser.user_metadata.full_name.toUpperCase()}</p>
                        <p className='tooltip-email'>{currentUser.user_metadata.email}</p>
                    </div>
                    :
                    <></>
                } 
                componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: 'common.black',
                        '& .MuiTooltip-arrow': {
                          color: 'common.black',
                        },
                        padding:"11px",
                        fontSize:"14px",
                      },
                    },
                }}
                arrow
                >
                <div className='user-menu'>
                    <div className='user-logo'>
                        <img src={`https://ui-avatars.com/api/?background=a0a0ff&color=ffffff&name=${currentUser?.user_metadata.full_name.replace(" ","+")}`} className='user-logo-image'/>
                    </div>
                </div>
                </Tooltip>
            )
        }
        return (
            <>
            <Button variant="outlined" className='primary-button' onClick={() => handlePath('login')}>Log in</Button>
            <Button variant='contained' className='secondary-button redirect-button' onClick={() => handlePath('signup')}>Sign Up</Button>
            </>
        )
    }

    
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