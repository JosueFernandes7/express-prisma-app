class RelatorioController{

  renderRelatorio(req, res) {
    res.render('relatorios', { title: 'Módulo Relatórios' });
  }
}


export default RelatorioController;