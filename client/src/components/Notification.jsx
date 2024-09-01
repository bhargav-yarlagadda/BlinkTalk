import { useContext } from "react";
import { SocketContext } from "../SocketContext";
const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className="flex justify-around items-center p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">{call.name} is calling:</h1>
          <button
            onClick={answerCall}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default  Notifications