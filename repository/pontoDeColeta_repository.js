let listaPontosDeColeta = [
    {
        "nome": "DMLU - Coleta de Vidros",
        "endereco": "Rua1",
        "bairro": "azenha",
        "tipoLixo": "vidro",
        "id": 1
    }
];
let idGerador = 2;

function listar() {
    return listaPontosDeColeta;
}

function inserir(pontoDeColeta) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!pontoDeColeta || !pontoDeColeta.nome || !pontoDeColeta.endereco 
        || !pontoDeColeta.bairro || !pontoDeColeta.tipoLixo) {
            return;
    }
    pontoDeColeta.id = idGerador++;
    listaPontosDeColeta.push(pontoDeColeta);
    return pontoDeColeta;
}

function atualizar(id, pontoDeColeta) {
    if(!pontoDeColeta || !pontoDeColeta.nome || !pontoDeColeta.endereco 
        || !pontoDeColeta.bairro || !pontoDeColeta.tipoLixo) {
            throw {id: 400, msg: "Dados obrigatórios ausentes: nome, endereco e tipoLixo são necessários são obrigatórios."};
        }
    let indicePontoDeColeta = listaPontosDeColeta.findIndex(function(ponto) {
        return ponto.id == id;
    });

    if(indicePontoDeColeta == -1) {
        throw { id: 404, msg: "Ponto de coleta não encontrado." };
    };

    //Atualiza o ponto de coleta
    pontoDeColeta.id = id;
    listaPontosDeColeta[indicePontoDeColeta] = pontoDeColeta;
    
    return pontoDeColeta;
}

function deletar(id) {
    console.log(`Repository: Tentando deletar ponto de coleta com ID: ${id}`);

    const indicePontoDeColeta = listaPontosDeColeta.findIndex((pontoDeColeta) => pontoDeColeta.id === id);

    if (indicePontoDeColeta === -1) {
        throw { id: 404, msg: "Ponto de coleta não encontrado!" };
    }

    console.log("Repository: Ponto de coleta encontrado e será deletado");
    return listaPontosDeColeta.splice(indicePontoDeColeta, 1)[0];
}

function buscarPorId(id) {
    return (listaPontosDeColeta.find(
        function(pontoDeColeta) {
            return (pontoDeColeta.id == id);        
        }
    ));
}

function buscarPorEndereco(endereco) {
    return (listaPontosDeColeta.filter(
        function(pontoDeColeta) {
            return (pontoDeColeta.endereco.toLowerCase() === endereco.toLowerCase());
        }
    ));
}

function buscarPorTipoLixo(tipoLixo) {
    console.log('Tipo recebido no repository:', tipoLixo);
    const resultados = listaPontosDeColeta.filter(
        (pontoDeColeta) => pontoDeColeta.tipoLixo.toLowerCase() === tipoLixo.toLowerCase()
    );
    console.log('Resultados do filtro:', resultados);
    return resultados;
}

function buscarPorBairro(bairro) {
    console.log('Bairro recebido no repository:', bairro);
    const resultados = listaPontosDeColeta.filter(
        (pontoDeColeta) => pontoDeColeta.bairro.toLowerCase() === bairro.toLowerCase()
    );
    console.log('Resultados do filtro:', resultados);
    return resultados;
}




module.exports = {
    listar,
    inserir,
    atualizar,
    deletar,
    buscarPorId,
    buscarPorEndereco,
    buscarPorTipoLixo,
    buscarPorBairro
}
 