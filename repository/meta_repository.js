let listaMetas = [    {
    "nome": "novembro",
    "descricao": "descartar o lixo quatro vezes em novembro",
    "meta": 4,
    "id": 1
}];
let idGerador = 1;

function listar() {
    return listaMetas;
}

function inserir(meta) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!meta || !meta.nome || !meta.categoria || !meta.preco) {
        return;
    }
    meta.id = idGerador++;
    listaMetas.push(meta);
    return meta;
}

function buscarPorId(id) {
    return (listaMetas.find(
        function(meta) {
            return (meta.id == id);        
        }
    ));
}

function atualizar(id, meta) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!meta || !meta.nome || !meta.categoria || !meta.preco) {
        return;
    }
    let indiceMeta = listaMetas.findIndex(function(meta) {
        return (meta.id == id);
    })

    if (indiceMeta == -1) return;
    //alterar a meta direto
    meta.id = id;
    listaMetas[indiceMeta] = meta;
    return meta;
}

function deletar(id) {
    let indiceMeta = listaMetas.findIndex(function(meta) {
        return (meta.id == id);
    })
    if(indiceMeta == -1) return;
    return (listaMetas.splice(indiceMeta, 1))[0];
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}