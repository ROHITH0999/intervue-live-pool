import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Student = () => {
  const socket = useSocket();

  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [poll, setPoll] = useState<any>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("poll:active", (data) => {
      setPoll(data);
    });

    socket.on("poll:update", (data) => {
      setPoll(data);
    });

    socket.on("poll:ended", (data) => {
      setPoll(data);
    });

    socket.on("vote:error", (msg) => {
      alert(msg);
    });

    return () => {
      socket.off("poll:active");
      socket.off("poll:update");
      socket.off("poll:ended");
      socket.off("vote:error");
    };
  }, [socket]);

  const submitVote = (index: number) => {
    if (!poll || voted) return;
    socket?.emit("poll:vote", {
      pollId: poll._id,
      optionIndex: index
    });
    setVoted(true);
  };

  if (!joined) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter your name</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => setJoined(true)}>Join</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Welcome, {name}</h2>

      {!poll && <p>Waiting for poll...</p>}

      {poll && (
        <>
          <h3>{poll.question}</h3>
          <p>Time left: {poll.remainingTime}s</p>

          {poll.options.map((o: any, i: number) => (
            <button key={i} onClick={() => submitVote(i)}>
              {o.text}
            </button>
          ))}

          {poll.status === "ENDED" && <p>Poll Ended</p>}
        </>
      )}
    </div>
  );
};

export default Student;
