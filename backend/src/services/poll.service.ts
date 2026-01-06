import Poll from "../models/Poll";
import Vote from "../models/Vote";

export const createPoll = async (data: any) => {
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + data.duration * 1000);

  return await Poll.create({
    ...data,
    startTime,
    endTime
  });
};

export const getRemainingTime = (poll: any) => {
  const now = new Date().getTime();
  const end = new Date(poll.endTime).getTime();
  return Math.max(0, Math.floor((end - now) / 1000));
};


export const getActivePoll = async () => {
  return await Poll.findOne({ status: "ACTIVE" });
};

export const submitVote = async (pollId: string, studentId: string, optionIndex: number) => {
  const alreadyVoted = await Vote.findOne({ pollId, studentId });
  if (alreadyVoted) throw new Error("Already voted");

  await Vote.create({ pollId, studentId, optionIndex });
  await Poll.updateOne(
    { _id: pollId },
    { $inc: { [`options.${optionIndex}.votes`]: 1 } }
  );
};
