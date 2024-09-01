import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div className="w-screen h-screen flex flex-col-reverse sm:flex-row bg-gray-300">
      {stream && (
        <div className="w-full sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center items-center">
          <h3 className="m-4" >{name || "You"}</h3>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className="w-3/4 h-3/4 rounded-md object-cover"
          />
        </div>
      )}

      {callAccepted && !callEnded && (
        <div className="w-full sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center items-center">
          <h3>{call.name || "User"}</h3>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="w-3/4 h-3/4 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
