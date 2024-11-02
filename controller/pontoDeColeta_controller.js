const pontoDeColetaService = require('../service/pontoDeColeta_service');

//Listar Produtos
function listar(req, res) {
  try {
    console.log("Iniciando a listagem dos pontos de coleta"); // Log de início
    const pontos = pontoDeColetaService.listar();
    console.log("Pontos de coleta listados com sucesso:", pontos); // Log do retorno esperado
    res.json(pontos);
  } catch (err) {
    console.error("Erro ao listar pontos de coleta:", err); // Log detalhado do erro
    res.status(500).json({ error: 'Erro ao listar pontos de coleta' });
  }
}

function buscarPorId(req, res) {
  // O + antes converte o valor para number (na URL vem como string)
  const id = +req.params.id;
  try {
    res.json(pontoDeColetaService.buscarPorId(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
}

function buscarPorEndereco(req, res) {
  const { endereco } = req.query;

  if (!endereco) {
    return res.status(400).json({error:'O parâmetro "endereço" é obrigatório.'});
  }

  try{
    const pontos = pontoDeColetaService.buscarPorEndereco(endereco);

    if (!pontos || pontos.length === 0) {
      return res.status(404).json({message: 'Nenhum ponto de coleta encontrado.'})
    }

    return res.status(200).json(pontos);
  } catch(err) {
    console.error(err);

    const statusCode = err.id || 500;
    return res.status(statusCode).json({ error:err.message || 'Erro ao buscar pontos de coleta.' });
  }
}

function buscarPorTipoLixo(req, res) {
  const { tipoLixo } = req.query;

  if (!tipoLixo) {
    return res.status(400).json({error:'O parâmetro "tipoLixo" é obrigatório.'});
  }

  try{
    const pontos = pontoDeColetaService.buscarPorTipoLixo(tipoLixo);

    if (!pontos || pontos.length === 0) {
      return res.status(404).json({message: 'Nenhum ponto de coleta encontrado.'})
    }

    return res.status(200).json(pontos);
  } catch(err) {
    console.error(err);

    const statusCode = err.id || 500;
    return res.status(statusCode).json({ error:err.message || 'Erro ao buscar pontos de coleta.' });
  }
}


function buscarPorBairro(req, res) {
  const { bairro } = req.query;

  if (!bairro) {
    return res.status(400).json({error:'O parâmetro "bairro" é obrigatório.'});
  }

  try{
    const pontos = pontoDeColetaService.buscarPorBairro(bairro);

    if (!pontos || pontos.length === 0) {
      return res.status(404).json({message: 'Nenhum ponto de coleta encontrado.'})
    }

    return res.status(200).json(pontos);
  } catch(err) {
    console.error(err);

    const statusCode = err.id || 500;
    return res.status(statusCode).json({ error:err.message || 'Erro ao buscar pontos de coleta.' });
  }
}

//Inserir
function inserir(req, res) {
    const pontoDeColeta = req.body;
    if (!pontoDeColeta || !pontoDeColeta.nome || !pontoDeColeta.endereco || !pontoDeColeta.bairro || !pontoDeColeta.tipoLixo) {
      return res.status(400).json({ id: 400, msg: "Dados obrigatórios ausentes." });
    }

    try {
      const pontoDeColetaInserido = pontoDeColetaService.inserir(pontoDeColeta);
      res.status(201).json(pontoDeColetaInserido)
    } catch(err) {
      res.status(err.id || 500).json(err);
    }
}

//Atualizar
function atualizar(req, res) {
  const id = +req.params.id;
  const pontoDeColeta = req.body;

  if (!pontoDeColeta || !pontoDeColeta.nome || !pontoDeColeta.endereco || !pontoDeColeta.bairro || !pontoDeColeta.tipoLixo) {
    return res.status(400).json({ id: 400, msg: "Dados obrigatórios ausentes." });
  }

  try {
    const pontoDeColetaAtualizado = pontoDeColetaService.atualizar(id, pontoDeColeta);

    if (!pontoDeColetaAtualizado) {
      return res.status(404).json({ id: 404, msg: "Ponto de coleta não encontrado." });
    }

    // Responde com o ponto atualizado apenas se ele realmente existir
    return res.json(pontoDeColetaAtualizado);

  } catch (err) {
    res.status(err.id || 500).json(err);
  }
}

//Deletar
function deletar(req, res) {
  const id = +req.params.id;
  console.log(`Controller: Recebendo pedido para deletar ponto de coleta com ID: ${id}`);
  try {
    pontoDeColetaService.deletar(id);

    res.status(204).send();
  } catch (err) {
    console.log(`Controller: Erro ao tentar deletar ponto de coleta com ID: ${id}`, err);
    res.status(err.id || 500).json(err);
  }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEndereco,
    buscarPorTipoLixo,
    buscarPorBairro,
    atualizar,
    deletar
}