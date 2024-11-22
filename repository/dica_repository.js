let listaDicas = [
    {
        "nome": "Separação de Lixo Orgânico",
        "descricao": "Separe restos de alimentos e materiais biodegradáveis para compostagem ou descarte correto.",
        "id": 1
    },
    {
        "nome": "Reciclagem de Papel",
        "descricao": "Papeis limpos podem ser reciclados. Evite amassar ou misturar com materiais sujos.",
        "id": 2
    },
    {
        "nome": "Descarte de Plásticos",
        "descricao": "Lave e seque recipientes plásticos antes de descartá-los para reciclagem.",
        "id": 3
    },
    {
        "nome": "Descarte de Vidros",
        "descricao": "Embale vidros quebrados em jornal ou caixa antes de descartar para evitar acidentes.",
        "id": 4
    },
    {
        "nome": "Separação de Metais",
        "descricao": "Latinhas e outros metais devem ser limpos antes do descarte para reciclagem.",
        "id": 5
    },
    {
        "nome": "Eletrônicos",
        "descricao": "Leve aparelhos eletrônicos e baterias usadas para pontos de coleta especializados.",
        "id": 6
    },
    {
        "nome": "Óleo de Cozinha",
        "descricao": "Nunca descarte óleo de cozinha na pia. Armazene em garrafas PET e leve para reciclagem.",
        "id": 7
    },
    {
        "nome": "Remédios Vencidos",
        "descricao": "Não descarte medicamentos no lixo comum ou no vaso sanitário. Procure farmácias com coleta de remédios vencidos.",
        "id": 8
    },
    {
        "nome": "Roupas e Tecidos",
        "descricao": "Doe roupas em bom estado ou leve tecidos para cooperativas de reciclagem.",
        "id": 9
    },
    {
        "nome": "Compostagem Doméstica",
        "descricao": "Transforme restos de frutas, vegetais e cascas de ovos em adubo para plantas.",
        "id": 10
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