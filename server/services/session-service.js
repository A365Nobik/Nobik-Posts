import db from "../db.js";
import cron from "node-cron";
import { UserService } from "./user-service.js";

export default cron.schedule("* * * * *", async () => {
  try {
    const users = UserService.primaryUsers;
    const now = new Date();
    users.forEach((user, email) => {
      const sessionTime = (now - user.createdAt) / 1000 / 60;
      if (sessionTime >= 2.5) {
        users.delete(email);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
