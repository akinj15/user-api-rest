import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'ana',
      sobrenome: 'leticia',
      email: 'wnleticia@gmail.com',
      idade: 23,
      peso: 60,
      altura: 1.70,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
