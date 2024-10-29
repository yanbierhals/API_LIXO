let listaMeta = [
    {
        "nome": "admin",
        "descricao": "abrir 5 vezes a lixeira inteligente",
        "objetivo": 5,
        "id": 1
    }
];
let idGerador = 2;

function listar() {
    return listaMeta.map(usuario => removerCampoSenha(usuario));
}

function inserir(usuario) {
    //Se não tiver algum dado obrigatório, não faz nada e retorna undefined
    if(!usuario || !usuario.nome || !usuario.email 
        || !usuario.senha) {
            return;
    }
    usuario.id = idGerador++;
    listaMeta.push(usuario);
    return usuario;
}



function buscarPorId(id) {
    //Busca usuário
    let usuario = (listaMeta.find(
        function(usuario) {
            return (usuario.id == id);        
        }
    ));
    //Se encontrar usuário, retira a senha
    if(usuario) {
        return removerCampoSenha(usuario)
    }
}



module.exports = {
    listar,
    inserir,
    buscarPorId
}
 