import React from 'react';
import Options from './components/Options';
import Notification from './components/Notification';
import VideoPlayer from './components/VideoPlayer';
import Header from './components/Header';
const App = () => {
    return (
        <div className='overflow-hidden' >
          <Header/>
            <Options>
                <Notification ></Notification>
            </Options>
            <VideoPlayer />
        </div>
    );
};

export default App;
