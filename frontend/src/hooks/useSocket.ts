import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("https://intervue-live-pool.onrender.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
