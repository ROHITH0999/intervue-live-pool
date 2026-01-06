import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
