import colors from "colors";
import { UserService } from "../services/user-service.js";

class UserClassController {
  async register(req, res) {
    try {
      const { login, email, password } = req.body;
      if(!login,!email,!password){
        return res.status(400).json("Please fill al fields!")
      }
      const userData = await UserService.register(login, email, password);
      res.status(200).json(userData);
    } catch (error) {
      console.log(colors.bgRed("Register Error:", error));
      res.status(400).json(error.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.status(200).json(userData);
    } catch (error) {
      console.log(colors.bgRed("Login Error:", error));
      res.status(400).json(error.message);
    }
  }

  async logout(req, res) {
    try {
      console.log("Start Logout");
    } catch (error) {
      console.log(colors.bgRed("Logout Error:", error));
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(colors.bgRed("Users Fetching Error:", error));
      res.status(400).json(error.message);
    }
  }

  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.getUser(id);
      res.status(200).json(user);
    } catch (error) {
      console.log(colors.bgRed("Get User Error:", error));
      res.status(400).json(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const deleteUser = await UserService.deleteUser(id);
      res.status(200).json(deleteUser);
    } catch (error) {
      console.log(colors.bgRed("Delete User Error:", error));
      res.status(400).json(error.message);
    }
  }

  async verify(req, res) {
    try {
      const { email, code } = req.body;
      const userData = await UserService.verify(email, code);
      res.status(200).json(userData);
    } catch (error) {
      console.log(colors.bgRed("Verify Error:", error));
      res.status(400).json(error.message);
    }
  }

  async sendPassResetCode(req, res) {
    try {
      const { email } = req.body;
      const userData = await UserService.sendPassResetCode(email);
      res.status(200).json(userData);
    } catch (error) {
      console.log(colors.bgRed("Pass Reset Error:", error));
      res.status(400).json(error.message);
    }
  }

  async passVerifyReset(req, res) {
    try {
      const { email, code } = req.body;
      const userData = await UserService.passVerifyReset(email, code);
      res.status(200).json(userData);
    } catch (error) {
      console.log(colors.bgRed("Verify Reset Error:", error));
      res.status(400).json(error.message);
    }
  }

  async updatePass(req, res) {
    try {
      const { id, newPass } = req.body;
      const updatePass = await UserService.updatePass(id, newPass);
      res.status(200).json(updatePass);
    } catch (error) {
      console.log(colors.bgRed("Update Pass Reset Error:", error));
      res.status(400).json(error.message);
    }
  }

  async passResetStop(req, res) {
    try {
      const { id } = req.body;
      const stopPassReset = await UserService.passResetStop(id);
      res.status(200).json(stopPassReset);
    } catch (error) {
      console.log(colors.bgRed("Stop Pass Reset Error:", error));
      res.status(400).json(error.message);
    }
  }
}

export const UserController = new UserClassController();
