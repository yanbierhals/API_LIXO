//const { buscarAleatoria } = require('../repository/dicas_repository');
const dicaService = require('../service/dica_service')

//Listar Produtos
function listar(req, res) {
    res.json(dicaService.listar())
}

//Buscar por id
function buscarPorId(req, res) {
  // O + antes converte o valor para number (na URL vem como string)
  const id = +req.params.id;
  try {
    res.json(dicaService.buscarPorId(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
}

function buscarAleatoria(req, res){
  try{
    const dica=dicaService.buscarAleatoria();
    res.json(dica);
  }catch(err){
    res.status(err.id||500).json(err);
  }
}

//Inserir
function inserir(req, res) {
    const dica = req.body;
    try{
      const dicaInserido = dicaService.inserir(dica);
      res.status(201).json(dicaInserido)
    }
    catch(err){
      res.status(err.id).json(err)
    }
}

//Atualizar
function atualizar (req, res) {
  const id = +req.params.id;
  const dica = req.body;
  try{
    const dicaAtualizado = dicaService.atualizar(id, dica);
    res.json(dicaAtualizado)
  }
  catch(err){
    res.status(err.id).json(err)
  }
}

//Deletar
function deletar(req, res) {
  const id = +req.params.id;
  try {
    res.json(dicaService.deletar(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    buscarAleatoria
}