import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "../services/mail-service.js";
// import { TokenService } from "./token-service.js";
import jwt from "jsonwebtoken";

class UserClassService {
  primaryUsers = new Map();
  primaryPassResetUsers = new Map();

  async register(login, email, password) {
    const primaryCandidate = this.primaryUsers.has(email);
    if (primaryCandidate) {
      throw new Error(
        `The user with the email address ${email} is registering now!`
      );
    }
    const candidate = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (candidate.rowCount > 0) {
      throw new Error(
        `The user with the email address ${email} has already registered!`
      );
    }
    const activateCode = Math.floor(100000 + Math.random() * 900000).toString();
    const [hashCode, hashPassword] = await Promise.all([
      bcrypt.hash(activateCode, 8),
      bcrypt.hash(password, 10),
    ]);
    this.primaryUsers.set(email, {
      login,
      email,
      hashPassword,
      hashCode,
    });
    console.log(activateCode);
    MailService.sendActivationLink(email, null, activateCode);
    return {
      email,
      login,
    };
  }

  async login(email, password) {
    const candidate = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!candidate.rows[0]) {
      throw new Error(`User with ${email} email is not found!`);
    }

    const unhashPass = bcrypt.compareSync(password, candidate.rows[0].password);

    if (!unhashPass) {
      throw new Error(`Password is not correct!`);
    }
    return candidate.rows.map(({ password, ...user }) => user);
  }

  async getAllUsers() {
    const users = await db.query(`SELECT * FROM users`);
    const userWithoutPassword = users.rows.map(({ password, ...user }) => user);
    return userWithoutPassword;
  }

  async getUser(id) {
    const user = await db.query("SELECT * FROM users WHERE id=$1", [id]);
    return user.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
  }
  async deleteUser(id) {
    const deleteUser = await db.query("DELETE FROM users WHERE id=$1", [id]);
    return deleteUser;
  }
  async verify(email, code) {
    const primaryUser = this.primaryUsers.get(email);
    if (!primaryUser) {
      throw new Error(
        `The user with the email address ${email} is not found!Please register again.`
      );
    }

    const checkCode = bcrypt.compareSync(code, primaryUser.hashCode);
    if (!checkCode) {
      throw new Error(`The code is not correct!`);
    }
    const payload = {
      id: uuidv4(),
      email:primaryUser.email,
      login:primaryUser.login
    };

    // await db.query(
    //   "INSERT INTO users(id,email,login,password) VALUES($1,$2,$3,$4) RETURNING *",
    //   [payload.id, email, primaryUser.login, primaryUser.hashPassword]
    // );
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    console.log(accessToken)
    this.primaryUsers.delete(email);
    return accessToken;
  }
  async sendPassResetCode(email) {
    const candidate = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (!candidate.rows[0]) {
      throw new Error(`User with ${email} email is not found!`);
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000);

    this.primaryPassResetUsers.set(email, {
      resetCode,
      email,
    });
    MailService.sendPassResetCode(email, null, resetCode);
    return { email };
  }

  async passVerifyReset(email, code) {
    const user = this.primaryPassResetUsers.get(email);
    const candidate = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!candidate) {
      throw new Error(`User is not found!`);
    }

    if (user.resetCode.toString() !== code.toString()) {
      throw new Error("Code is not correct!");
    }
    this.primaryPassResetUsers.delete(email);
    return candidate.rows.map(({ password, ...user }) => user);
  }

  async updatePass(id, newPass) {
    const hashPassword = bcrypt.hashSync(newPass, 16);
    const newUserPass = await db.query(
      "UPDATE users SET password=$1 WHERE id=$2 RETURNING *",
      [hashPassword, id]
    );
    return newUserPass.rows.map(({ password, ...user }) => user);
  }
  async passResetStop(id) {
    const user = await db.query(
      "UPDATE users SET pass_reset_code=0 WHERE id=$1",
      [id]
    );
    return user.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
  }
}

export const UserService = new UserClassService();
