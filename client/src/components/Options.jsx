import React ,{useContext,useState} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';
const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
  
    return (
      <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <form noValidate autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold">Account Info</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                <CopyToClipboard text={me}>
                  <button type='button'
                    className="w-full p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  >
                    
                    Copy Your ID
                  </button>
                </CopyToClipboard>
              </div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold">Make a call</h2>
                <input
                  type="text"
                  placeholder="ID to call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                {callAccepted && !callEnded ? (
                  <button type='button'
                    onClick={leaveCall}
                    className="w-full p-2 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    
                    Hang Up
                  </button>
                ) : (
                  <button type='button'
                    onClick={() => callUser(idToCall)}
                    className="w-full p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  >
                   
                    Call
                  </button>
                )}
              </div>
            </div>
          </form>
          {children}
        </div>
      </div>
    );
  };
  
  export default Options;
