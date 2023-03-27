import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = ({ layout }) => {
    const navigate = useNavigate();

    const handlePath=(path)=>{
        navigate(`/${path}`)
    }
    return (
        <div className='header-wrapper'>
            <div className='header-content'>
                <div className='logo'>
                    Dropform
                </div>
                {/* <div></div> */}
                <div>
                    <Button variant="outlined" className='primary-button' onClick={()=>handlePath('login')}>Login</Button>
                    <Button onClick={() => handlePath('signup')}>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export { Header }