class GestaoController{

  renderGestao(req, res) {
    res.render('gestao', { title: 'Módulo de Gestão' });
  }
}


export default GestaoController;