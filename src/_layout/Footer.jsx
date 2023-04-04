import React from 'react'

const Footer = ({ layout }) => {
    if(layout==="login" || layout=="signup"){
        return <></>
    }
    return (
        <>
            <div>Footer</div>
        </>
    )
}

export { Footer }