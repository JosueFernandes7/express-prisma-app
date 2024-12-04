class ProdutosController{

  renderProdutos(req, res) {
    res.render('produtos', { title: 'Módulo de Produtos' });
  }
}


export default ProdutosController;