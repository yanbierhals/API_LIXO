const pontoColetaService = require('../service/pontoColeta_service');

async function buscar(req, res) {		   // Busca pontos de coleta baseados no filtro da consulta (Query Params)
    try {
        const query = req.query
        const pontosColeta = await pontoColetaService.buscar(query)
        res.json(pontosColeta)
    } catch (err) {
        res.status(err.id).json(err)
    }
}

// // Listar Produtos
// async function listar(req, res) {
//   try {
// 	console.log("Iniciando a listagem dos pontos de coleta"); // Log de início
// 	const pontos = pontoColetaService.listar();
// 	console.log("Pontos de coleta listados com sucesso:", pontos); // Log do retorno esperado
// 	res.json(pontos);
//   } catch (err) {
// 	console.error("Erro ao listar pontos de coleta:", err); // Log detalhado do erro
// 	res.status(500).json({ error: 'Erro ao listar pontos de coleta' });
//   }
// }

// async function buscarPorId(req, res) {
//   // O + antes converte o valor para number (na URL vem como string)
//   const id = +req.params.id;
//   try {
// 	res.json(pontoColetaService.buscarPorId(id));
//   } catch(err) {
// 	res.status(err.id).json(err)
//   }
// }

// async function buscarPorEndereco(req, res) {
//   const { endereco } = req.query;

//   if (!endereco) {
// 	return res.status(400).json({error:'O parâmetro "endereço" é obrigatório.'});
//   }

//   try{
// 	const pontos = pontoColetaService.buscarPorEndereco(endereco);

// 	if (!pontos || pontos.length === 0) {
// 	  return res.status(404).json({message: 'Nenhum ponto de coleta encontrado.'})
// 	}

// 	return res.status(200).json(pontos);
//   } catch(err) {
// 	console.error(err);

// 	const statusCode = err.id || 500;
// 	return res.status(statusCode).json({ error:err.message || 'Erro ao buscar pontos de coleta.' });
//   }
// }

// async function buscarPorTipoLixo(req, res) {
//   const { tipoLixo } = req.query;

//   if (!tipoLixo) {
// 	return res.status(400).json({error:'O parâmetro "tipoLixo" é obrigatório.'});
//   }

//   try{
// 	const pontos = pontoColetaService.buscarPorTipoLixo(tipoLixo);

// 	if (!pontos || pontos.length === 0) {
// 	  return res.status(404).json({message: 'Nenhum ponto de coleta encontrado.'})
// 	}

// 	return res.status(200).json(pontos);
//   } catch(err) {
// 	console.error(err);

// 	const statusCode = err.id || 500;
// 	return res.status(statusCode).json({ error:err.message || 'Erro ao buscar pontos de coleta.' });
//   }
// }

// async function buscarPorBairro(req, res) {
//   const { bairro } = req.query;

//   if (!bairro) {
// 	return res.status(400).json({error:'O parâmetro "bairro" é obrigatório.'});
//   }

//   try{
// 	const pontos = pontoColetaService.buscarPorBairro(bairro);

// 	if (!pontos || pontos.length === 0) {
// 	  return res.status(404).json({message: 'Nenhum ponto de coleta encontrado.'})
// 	}

// 	return res.status(200).json(pontos);
//   } catch(err) {
// 	console.error(err);

// 	const statusCode = err.id || 500;
// 	return res.status(statusCode).json({ error:err.message || 'Erro ao buscar pontos de coleta.' });
//   }
// }

// Inserir
async function inserir(req, res) {
	const pontoColeta = req.body
	try {
	  	const pontoColetaInserido = await pontoColetaService.inserir(pontoColeta)
	  	res.status(201).json(pontoColetaInserido)
	} catch(err) {
	  	res.status(err.id).json(err)
	}
}

// Atualizar
async function atualizar(req, res) {
	const id = + req.params.id
	const pontoColeta = req.body
	try {
		const pontoColetaAtualizado = await pontoColetaService.atualizar(id, pontoColeta)
		res.json(pontoColetaAtualizado)
  	} catch (err) {
		res.status(err.id).json(err)
  	}
}

// Deletar
async function deletar(req, res) {
  	const id = + req.params.id
	try {
		const pontoColeta = await pontoColetaService.deletar(id)
    	res.json(pontoColeta)
	} catch (err) {
    	res.status(err.id).json(err)
	}
}

module.exports = {
	// listar,
	// buscarPorId,
	// buscarPorEndereco,
	// buscarPorTipoLixo,
	// buscarPorBairro,
	buscar,
	inserir,
	atualizar,
	deletar
}