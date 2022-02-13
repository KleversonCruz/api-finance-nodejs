const { ResumoService } = require('../services');

const resumoService = new ResumoService();

class ResumoController {
  static async getResumoMensal(req, res, next) {
    const { ano, mes } = req.params;

    try {
      const resumo = await resumoService.getResumoByDate(ano, mes);
      res.status(200).json(resumo);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ResumoController;
