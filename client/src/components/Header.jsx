import React from 'react'
import image from '../../src/assets/img.svg'

const Header = () => {
  return (
    <div className='bg-[#e4ebf2] h-screen '>
        
        <div className="flex flex-col sm:flex-row h-full w-full ">
            <div className="flex  w-full sm:w-1/2 items-center justify-center h-1/2 sm:h-full ">
          
                <span className='text-4xl font-mono p-2 text-wrap text-center sm:text-7xl ' >
                    Video Calls and  <br />meetings
                    for everyone
                </span>
            </div>
            <div className="flex flex-col gap-3 justify-center mx-auto items-center  h-1/2 sm:h-full">
                <img src={image} className="img-fluid max-w-full  ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|} border-2 border-black rounded-full transition-all ease-in hover:-translate-y-4 md:hover:scale-110 duration-500" alt=""/>
   
                    <span className='text-xl sm:text-2xl text-gray-700 text-wrap' >
                        Get your meet ID <br />
                        Share with a friend
                    </span>
                
            </div>
        </div>
    </div>
  )
}

export default Header
