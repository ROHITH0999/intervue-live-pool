import { Server, Socket } from "socket.io";
import { createPoll, getActivePoll, submitVote, getRemainingTime } from "../services/poll.service";

export default function registerPollSocket(io: Server) {

  // ✅ GLOBAL POLL TIMER (runs once)
  setInterval(async () => {
    const poll = await getActivePoll();
    if (!poll) return;

    if (new Date() >= poll.endTime) {
      poll.status = "ENDED";
      await poll.save();
      io.emit("poll:ended", poll);
    }
  }, 1000);

  // ✅ SOCKET CONNECTION HANDLER
  io.on("connection", async (socket: Socket) => {
    console.log("User connected:", socket.id);

    const activePoll = await getActivePoll();
    if (activePoll) {
      socket.emit("poll:active", {
        ...activePoll.toObject(),
        remainingTime: getRemainingTime(activePoll)
      });
    }

    socket.on("poll:create", async (data) => {
      const poll = await createPoll(data);
      io.emit("poll:active", poll);
    });

    socket.on("poll:vote", async ({ pollId, optionIndex }) => {
      try {
        await submitVote(pollId, socket.id, optionIndex);
        const updatedPoll = await getActivePoll();
        io.emit("poll:update", updatedPoll);
      } catch {
        socket.emit("vote:error", "Already voted");
      }
    });
  });
}
