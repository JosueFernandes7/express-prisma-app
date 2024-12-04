class FinanceiroController{

  renderFinanceiro(req, res) {
    res.render('financeiro', { title: 'Módulo Financeiro' });
  }
}


export default FinanceiroController;