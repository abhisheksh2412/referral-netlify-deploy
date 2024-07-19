import React from 'react'

function Container({ children }) {
    return (
        <div>
            <div className='container mx-auto w-[80vw]  max-w-[80vw]'>{children}</div>
        </div>
    )
}

export default Container
