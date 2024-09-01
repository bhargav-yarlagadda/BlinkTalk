  import React, { createContext, useState, useRef, useEffect } from "react";
  import { io } from "socket.io-client";
  import Peer from "peerjs";

  const SocketContext = createContext();

  const socket = io("http://localhost:5000");

  const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState("");
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [call, setCall] = useState({ isReceivedCall: false, from: "", name: "", signal: null });

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });

      socket.on("me", (id) => setMe(id));
      socket.on("calluser", ({ from, name: callerName, signal }) => {
        setCall({ isReceivedCall: true, from, name: callerName, signal });
      });



      return () => {
        socket.off("me");
        socket.off("calluser");
      };
    }, []);
    useEffect(() => {
    if (myVideo.current) {
      console.log('myVideo ref:', myVideo.current);
      console.log('Stream:', stream);
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (userVideo.current) {
      console.log('userVideo ref:', userVideo.current);
    }
  }, [userVideo]);

    useEffect(() => {
      socket.on("callaccepted", (signal) => {
        if (connectionRef.current) {
          setCallAccepted(true);
          connectionRef.current.signal(signal);
        }
      });

      return () => {
        socket.off("callaccepted");
      };
    }, []);

    const answerCall = () => {
      setCallAccepted(true);
      const peer = new Peer({ initiator: false, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("answercall", { signal: data, to: call.from });
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });

      connectionRef.current = peer;
    };

    const callUser = (id) => {
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("calluser", { userToCall: id, signalData: data, from: me, name });
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });

      connectionRef.current = peer;
    };

    const leaveCall = () => {
      setCallEnded(true);
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
      setStream(null);
      setCall({ isReceivedCall: false, from: "", name: "", signal: null });
      setCallAccepted(false);
      setCallEnded(false);
    };

    return (
      <SocketContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}>
        {children}
      </SocketContext.Provider>
    );
  };

  export { ContextProvider, SocketContext };
