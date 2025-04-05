import React, { useEffect } from 'react'
import { retrive } from "../utils/keypress";

function Screen() {
const [key, setKey] = React.useState(null)
useEffect(() => {
    const interval = setInterval(() => {
      const retrievedKey = retrive();
      setKey(retrievedKey);
    }, 100); 

    return () => clearInterval(interval); 
  }, []);
 
    return (
    <div>
       
        <div  className='h-full w-full absolute top-0 left-0 flex items-center justify-center z-10 overflow-hidden '>
          <div className='container h-50 w-80 absolute top-4 left-10  '>
                <h1 className='text-2xl  text-white'>THE</h1>
                <h1 className='text-7xl  text-white'>Simulation</h1>
                 <h1 className='text-5xl  text-white text-satrt '>Game</h1>
          </div>
        <div style={{marginTop:"250px"}} className='flex items-center justify-center flex-col'>
      <h1>Key pressed</h1>
        <div style={{padding:"9px",marginTop:"10px" }} className='text-2xl font-bold text-white bg-[#191919] rounded-xl '>
              {key}
            </div>       
        </div> 

        <div className='container h-50  absolute left-[1200px] top-[63vh]  right-0 text-zinc-800'>
          <div style={{padding:"15px"}} className='h-[250px] w-80  backdrop-blur-sm bg-white/30 border border-white/20 rounded-xl p-4 shadow-lg      '>
            <div className='leading-[0.6]' >
                <h1 className=' text-zinc-900'>THE</h1>
                <h1 className='text-2xl  text-zinc-900'>Simulation</h1>
                 <h1 className='  text-zinc-900 text-satrt '>Game</h1>
            </div>

            <div style={{margin:"20px 0px"}} className='flex flex-col gap-2'>
                <h4>KEYS</h4>
                <div className='flex gap-2'>
                  <div  className='flex items-center justify-center bg-white w-5 rounded-sm text-zinc-900 '>
                    <h1>W</h1>
                  </div>
                  <h1 className='text-sm'> Move Forward</h1>
                </div>
                <div className='flex gap-2'>
                  <div  className='flex items-center justify-center bg-white w-5 rounded-sm text-zinc-900 '>
                    S
                  </div>
                  <h1 className='text-sm'> Move Backward</h1>
                </div>
                <div className='flex gap-2'>
                  <div  className='flex items-center justify-center bg-white w-5 rounded-sm text-zinc-900 '>
                    A
                  </div>
                  <h1 className='text-sm'> Move Left</h1>
                </div>
                <div className='flex gap-2'>
                  <div  className='flex items-center justify-center bg-white w-5 rounded-sm text-zinc-900 '>
                    D
                  </div>
                  <h1 className='text-sm'> Move Right</h1>
                </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Screen