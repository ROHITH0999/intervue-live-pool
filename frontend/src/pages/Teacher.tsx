import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Teacher = () => {
  const socket = useSocket();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(60);
  const [poll, setPoll] = useState<any>(null);

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

    return () => {
      socket.off("poll:active");
      socket.off("poll:update");
      socket.off("poll:ended");
    };
  }, [socket]);

  const createPoll = () => {
    socket?.emit("poll:create", {
      question,
      options: options.map((o) => ({ text: o })),
      duration
    });
  };

  return (
    <div className="container">
      <h2>Teacher Dashboard</h2>

      {!poll && (
        <>
          <input
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}

          <button onClick={() => setOptions([...options, ""])}>+ Add Option</button>

          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(+e.target.value)}
          />

          <button onClick={createPoll}>Start Poll</button>
        </>
      )}

      {poll && (
        <>
          <h3>{poll.question}</h3>
          {poll.options.map((o: any, i: number) => (
            <p key={i}>
              {o.text} — {o.votes}
            </p>
          ))}
          <p>Status: {poll.status}</p>
        </>
      )}
    </div>
  );
};

export default Teacher;
