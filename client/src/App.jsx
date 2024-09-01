import React from 'react';
import Options from './components/Options';
import Notification from './components/Notification';
import VideoPlayer from './components/VideoPlayer';
import Header from './components/Header';
const App = () => {
    return (
        <div>
          <Header/>
            <VideoPlayer />
            <Options>
                <Notification ></Notification>
            </Options>
        </div>
    );
};

export default App;
