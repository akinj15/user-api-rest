import User from '../models/User.js';

const userModel = new User();
class UserController {

  async store(req, res) {
    try {
      const result = await userModel.createUser(req.body);
      if (result.error){
        return res.status(400).json(result)
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({
        erros: e
      });
    }
  }

  async index(req, res) {
    try {
      const users = await userModel.listAll();
      return res.status(200).json(users);
    } catch (e) {
      return res.res.status(400).json({ erros: e});
    }
  }

  async autentecate(req, res) {
    try {
      const result = await userModel.autenticate(req.body);
      console.log(result)
      if (result.error){
        return res.status(400).json(result)
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ erros: e});
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findOne(id);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const result = await userModel.updateUser(req.body);
      if (result.error){
        return res.status(400).json(result)
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({
        erros: e
      });
    }
  }

  async delete(req, res) {
    try {
      const result = await userModel.deleteUser(req.body);
      if (result.error){
        return res.status(400).json(result)
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({
        erros: e
      });
    }
  }
}

export default new UserController();
