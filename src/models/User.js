import bcryptjs from "bcryptjs";
import { prismaClient } from "../database/prismaClient.js";
import jwt from 'jsonwebtoken';

export default class User {
  async createUser(user) {
    let error = [];
    try {
      if (!user.userName) {
        error.push("o nome de usuario e obrigatorio");
      }
      if (!user.email) {
        error;
        error.push("o email do usuario e obrigatorio");
      }
      if (!user.password) {
        error.push("o password de usuario e obrigatorio");
      }
      if (user.password.length <= 8) {
        error.push("o password deve ser conter pelomenos 8 caracters");
      }
      if (error.length) {
        return { errors: error, error: true };
      }
      this.userName = user.userName;
      this.email = user.email;
      this.password = this.encrypt(user.password);

      this.user = {
        userName: this.userName,
        email: this.email,
        password: await this.password,
      };
      this.user = await prismaClient.user.create({
        data: this.user,
      });

      return {
        data: this.user,
        error: false,
      };
    } catch (e) {
      return e;
    }
  }

  encrypt(password) {
    this.passwordBeforeEncrypt = password;
    return bcryptjs.hash(password, 8);
  }

  comparete(password, passwordDB) {
    return bcryptjs.compare(password, passwordDB);
  }

  async autorization(user, userDB) {
    if (!user.email) {
      return { error: "o email do usuario e obrigatorio" };
    }
    if (!user.password) {
      return { error: "o password de usuario e obrigatorio" };
    }
    const token = jwt.sign({ id: userDB.id, email: userDB.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    if (await this.comparete(user.password, userDB.password)) {
      return {
        id: user.id,
        email: userDB.email,
        userName: userDB.userName,
        logged: true,
        token: token
      };
    }
    return {
      error: "o password é invalido",
    };
  }

  async listAll() {
    return await prismaClient.user.findMany();
  }

  async findOne(id) {
    return await prismaClient.user.findUnique({
      where: {
        id: id
      }
    })
  }

  async findLogin (email) {
    return await prismaClient.user.findUnique({
      where: {
        email
      }
    });
  }

  async autenticate (user) {
    let { email , password } = user;
    let userDB = await this.findLogin(email);
    if (!userDB){
      return{
        error: 'email de usuario nao encontrado'
      }
    }

    let userAutorized = await this.autorization({email, password}, userDB)
    return userAutorized;
  }

  async deleteUser (user) {
    let { email , password } = user;
    let userDB = await this.findLogin(email);
    if (!userDB){
      return{
        error: 'email de usuario nao encontrado'
      }
    }

    let userAutorized = await this.autorization({email, password}, userDB)
    if(userAutorized.error) {
      return userAutorized;
    }

    prismaClient.user.delete({
      where: {
        email
      }
    })

    return userAutorized;
  }
  async updatePasswordUser (user) {
    let { email , password } = user;
    let userDB = await this.findLogin(email);
    if (!userDB){
      return{
        error: 'email de usuario nao encontrado'
      }
    }
    let userAutorized = await this.autorization({email, password}, userDB)
    if(userAutorized.error) {
      return userAutorized;
    }
    let updatedUser = await prismaClient.user.update({
      where: {
        email
      },
      update: {
        password
      }
    });

    return updatedUser;
  }
}
