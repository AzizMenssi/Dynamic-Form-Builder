import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Create a context
const SocketContext = createContext<Socket | null>(null);

// Custom hook to access the socket context
export function useSocket() {
  return useContext(SocketContext);
}

// Provider component
//@ts-ignore
export  const SocketProvider: React.FC = ({ children }) => {
  const [ socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket)
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
