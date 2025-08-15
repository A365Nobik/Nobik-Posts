import jwt from "jsonwebtoken";
import db from "../db.js";

class TokenClassService {

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "10d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  
  async saveToken(user_id, refreshToken) {
    const tokenData = await db.query("SELECT * FROM token WHERE user_id=$1", [
      user_id,
    ]);
    if (tokenData.rowCount > 0) {
      const newTokenData = await db.query(
        "UPDATE token SET refresh_token=$1 RETURNING *",
        [refreshToken]
      );
    }
    const token = await db.query("INSERT INTO token values($1,$2)", [
      user_id,
      refreshToken,
    ]);
    return token
  }
}

export const TokenService = new TokenClassService();
