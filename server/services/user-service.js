import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "../services/mail-service.js";
// import { TokenService } from "./token-service.js";

class UserClassService {
  primaryUsers = new Map();

  async register(login, email, password) {
    const primaryCandidate = this.primaryUsers.has(email);
    if (primaryCandidate) {
      throw new Error(
        `The user with the email address ${email} is registering now!`
      );
    }
    const registerDate = new Date();
    const candidate = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (candidate.rowCount > 0) {
      throw new Error(
        `The user with the email address ${email} has already registered!`
      );
    }
    const activateCode = Math.floor(100000 + Math.random() * 900000);
    this.primaryUsers.set(email, {
      login,
      email,
      password,
      activateCode,
      createdAt: registerDate,
    });
    MailService.sendActivationLink(email, null, activateCode);
    return {
      email,
      login,
      createdAt: registerDate,
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
      throw new Error(`Password is wrong!`);
    }
  }

  async getAllUsers() {
    const users = await db.query(`SELECT * FROM users`);
    const userWithoutPassword = users.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
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
    if (primaryUser.activateCode.toString() !== code.toString()) {
      throw new Error(`The is not correct!`);
    }
    const hashPassword = bcrypt.hash(primaryUser.password, 10);
    const activateUser = await db.query(
      "INSERT INTO users VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        uuidv4(),
        email,
        primaryUser.login,
        hashPassword,
        primaryUser.createdAt,
        true,
        0,
        0,
      ]
    );
    console.log(activateUser);
    this.primaryUsers.delete(email);
    return activateUser.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
  }
  async sendPassResetCode(email) {
    const candidate = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (!candidate.rows[0]) {
      throw new Error(`User with ${email} email is not found!`);
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedCode = bcrypt.hashSync(resetCode, 8);
    const addCode = await db.query(
      "UPDATE users set pass_reset_code=$1 where email=$2 RETURNING *",
      [hashedCode, email]
    );
    MailService.sendPassResetCode(
      email,
      `${process.env.CLIENT_URL}/verify-reset?code=${resetCode}`,
      resetCode
    );
    return addCode.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
  }

  async passVerifyReset(id, code) {
    const candidate = await db.query("SELECT * FROM users WHERE id=$1", [id]);

    if (!candidate) {
      throw new Error(`User is not found!`);
    }

    const unHashedCode = bcrypt.compareSync(
      code,
      candidate.rows[0].pass_reset_code
    );

    if (!unHashedCode) {
      throw new Error("Reset code is not correct");
    }

    const verifiedPass = await db.query(
      "UPDATE users SET pass_reset_code=0 where id=$1 RETURNING *",
      [id]
    );

    return verifiedPass.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
  }

  async updatePass(id, newPass) {
    const hashPassword = bcrypt.hashSync(newPass, 16);
    const newUserPass = await db.query(
      "UPDATE users SET password=$1 WHERE id=$2 RETURNING *",
      [hashPassword, id]
    );
    return newUserPass.rows.map(
      ({ password, activation_code, pass_reset_code, ...user }) => user
    );
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
