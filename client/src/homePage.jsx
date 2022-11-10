import React, { useState } from 'react'
import Navbar from './NavBar/navbar';
import Footer from './footerContainer';
import PassMeter from './components/passMeter';
import PassGen from './components/passGen';

const HomePage = () => {
  
  const [toDisplayPM, settoDisplayPM] = useState(true)
  const [toDisplayPG, settoDisplayPG] = useState(false)

  return(
    <>
      {/* Navigation bar here */}
      <Navbar />

      <main>
        <div className='App'>
          <div className='information'>
            <div>

              <button className='buttonFancy' onClick={() => {
                settoDisplayPG(false)
                settoDisplayPM(true)
              }}>Password Meter</button>

              <button className='buttonFancy' onClick={() => {
                settoDisplayPG(true)
                settoDisplayPM(false)
              }}>Password Generator</button>
            </div>

            {toDisplayPM ? <PassMeter /> : <PassGen />}

          </div>
        </div>
      </main>

      {/* Footer bar here */}
      <Footer />
    </>
  )
}

export default HomePage