let listaDicas = [
    {
        "nome": "Dica 1",
        "descricao": "Teste",
        "id": 1
    }

];
let idGerador = 1;

function listar() {
    return listaDicas;
}

function inserir(dica) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!dica || !dica.nome || !dica.descricao) {
            return;
    }
    dica.id = idGerador++;
    listaDicas.push(produto);
    return dica;
}

function buscarPorId(id) {
    return (listaDicas.find(
        function(dica) {
            return (dica.id == id);        
        }
    ));
}

function randomizar(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function buscarDicaAleatoria() {
    idSorteado=randomizar(1,listaDicas.length)
    buscarPorId(idSorteado)
}

function buscarAleatoria(){
    const idSorteado=Math.floor(Math.random()*listaDicas.length)
    return listaDicas[idSorteado]
}

function atualizar(id, dica) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!dica || !dica.nome || !dica.descricao) {
            return;
    }
    let indiceDica = listaDicas.findIndex(function(dica) {
        return (dica.id == id);
    })

    if(indiceDica == -1) return;
    //alterar o produto direto
    dica.id = id;
    listaDicas[indiceProduto] = dica;
    return dica;
}

function deletar(id) {
    let indiceDica = listaDicas.findIndex(function(dica) {
        return (dica.id == id);
    })
    if(indiceDica == -1) return;
    return (listaDicas.splice(indiceDica, 1))[0];
}

// function pesquisarPorCategoria(categoria) {
//     return listaProdutos.filter( (produto) => produto.categoria == categoria )
// }

function pesquisarPorNomeLike(nome) {
    return listaProdutos.filter ( (dica) => {
        const produtoNomeUpper = dica.nome.toUpperCase();
        const nomeUpper = nome.toUpperCase();
        return (produtoNomeUpper.search(nomeUpper) >= 0);
    })
}
module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    //pesquisarPorCategoria,
    pesquisarPorNomeLike,
    randomizar,
    buscarAleatoria,
    buscarDicaAleatoria
}