let listaMetas = [
    {
        "id": 1,
        "nome": "seco",
        "descricao": "descartar o lixo seco 2 vezes por semana",
        "objetivo": 2
    }
]

let idGerador = 1

function listar(){
    return listaMetas
}

function buscarPorId(id){
    return (listaMetas.find(
        function(meta){
            return (meta.id == id) 
        }
    ));
}

function inserir(meta){
    // Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!meta || !meta.nome || !meta.descricao || !meta.objetivo){
        return
    }
    meta.id = ++idGerador
    listaMetas.push(meta)
    return meta
}

function atualizar(id, meta) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!meta || !meta.nome || !meta.descricao || !meta.objetivo){
        return
    }
    let indiceMeta = listaMetas.findIndex(function(meta){
        return (meta.id == id)
    })

    if (indiceMeta == -1) return
    //alterar a meta direto
    meta.id = id
    listaMetas[indiceMeta] = meta
    return meta
}

function deletar(id) {
    let indiceMeta = listaMetas.findIndex(function(meta) {
        return (meta.id == id)
    })
    return indiceMeta == -1 ? undefined : listaMetas.splice(indiceMeta, 1)[0]
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}