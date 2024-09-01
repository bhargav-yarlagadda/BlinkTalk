
(function(global) {
  if (!global.global) {
    global.global = global;
  }
})(window);

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './SocketContext.jsx'
createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
 
)
