import dayjs from "dayjs";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmails.js";

const now = dayjs();

const forWeekly = async () => {
  const afterThreeDays = now.add(3, "day");

  const startOfDay = afterThreeDays.startOf("day").toDate();
  const endOfDay = afterThreeDays.endOf("day").toDate();

  const users = await User.find({
    subscriptionPolicy: "weekly",
    subscriptionEndDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  users.forEach( user=>{
        sendEmail(user.email, user)
  })
};
