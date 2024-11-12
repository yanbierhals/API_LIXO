// // let listaPontosDeColeta = [
// //     {
// //         "nome": "DMLU - Coleta de Vidros",
// //         "endereco": "Rua1",
// //         "bairro": "azenha",
// //         "tipoLixo": "vidro",
// //         "id": 1
// //     }
// // ];
// // let idGerador = 2;

// const knex = require('../database/db')

// async function buscar(query) {
//     try {
//         let pontosColeta = knex("pontos_coleta")
//             .join("tipos_lixo", "pontos_coleta.tipo_lixo_id", "=", "tipos_lixo.id")
//             .select("pontos_coleta.*", "tipos_lixo.tipo as tipo_lixo")
//         if (query.id) {
//             pontosColeta = pontosColeta.where("pontos_coleta.id", query.id)
//         } if (query.endereco) {
//             pontosColeta = pontosColeta.where("pontos_coleta.endereco", "like", `%${query.endereco}%`)
//         } if (query.bairro) {
//             pontosColeta = pontosColeta.where("pontos_coleta.bairro", "like", `%${query.bairro}%`)
//         } if (query.tipo_lixo) {
//             pontosColeta = pontosColeta.where("tipos_lixo.tipo", "like", `%${query.tipos_lixo}%`)
//         }
//         return await pontosColeta
//     } catch (err) {
//         throw err
//     }
// }

// // function listar() {
// //     return listaPontosDeColeta;
// // }

// // function buscarPorId(id) {
// //     return (listaPontosDeColeta.find(
// //         function(pontoColeta) {
// //             return (pontoColeta.id == id);        
// //         }
// //     ));
// // }

// // function buscarPorEndereco(endereco) {
// //     return (listaPontosDeColeta.filter(
// //         function(pontoColeta) {
// //             return (pontoColeta.endereco.toLowerCase() === endereco.toLowerCase());
// //         }
// //     ));
// // }

// // function buscarPorTipoLixo(tipoLixo) {
// //     console.log('Tipo recebido no repository:', tipoLixo);
// //     const resultados = listaPontosDeColeta.filter(
// //         (pontoColeta) => pontoColeta.tipoLixo.toLowerCase() === tipoLixo.toLowerCase()
// //     );
// //     console.log('Resultados do filtro:', resultados);
// //     return resultados;
// // }

// // function buscarPorBairro(bairro) {
// //     console.log('Bairro recebido no repository:', bairro);
// //     const resultados = listaPontosDeColeta.filter(
// //         (pontoColeta) => pontoColeta.bairro.toLowerCase() === bairro.toLowerCase()
// //     );
// //     console.log('Resultados do filtro:', resultados);
// //     return resultados;
// // }

// async function inserir(pontoColeta) {
//     try {
//         const novoPontoColeta = await knex("pontos_coleta")
//             .insert(pontoColeta)
//             .returning("*")
//         return novoPontoColeta
//     } catch (err) {
//         throw err
//     }
// }

// async function atualizar(id, pontoColeta) {
//     try {
//         const pontoColetaAtualizado = await knex("pontos_coleta")
//             .where("id", id)
//             .update(pontoColeta)
//             .returning("*")
//         return pontoColetaAtualizado
//     } catch (err) {
//         throw err
//     }
// }

// async function deletar(id) {
//     try {
//         const pontoColeta = await knex("pontos_coleta")
//             .where("id", id)
//             .delete()
//             .returning("*")
//         return pontoColeta
//     } catch {
//         throw err
//     }
// }

// module.exports = {
//     // listar,
//     // buscarPorId,
//     // buscarPorEndereco,
//     // buscarPorTipoLixo,
//     // buscarPorBairro
//     buscar,
//     inserir,
//     atualizar,
//     deletar
// }


// -----------------------------------------------------------------------------------------------

const supabase = require("../database/db")

async function buscar(query) {
    try {
        let pontosColeta = supabase
            .from('pontos_coleta')
            .select('pontos_coleta.*, tipos_lixo.tipo as tipo_lixo') // Seleciona colunas de pontos_coleta e tipos_lixo
            .innerJoin('tipos_lixo', 'pontos_coleta.tipo_lixo_id', 'tipos_lixo.id'); // Usa innerJoin para juntar as tabelas
            
        // Aplica os filtros baseados nos parâmetros da query
        if (query.id) {
            pontosColeta = pontosColeta.eq('pontos_coleta.id', query.id);
        }
        if (query.endereco) {
            pontosColeta = pontosColeta.ilike('pontos_coleta.endereco', `%${query.endereco}%`);
        }
        if (query.bairro) {
            pontosColeta = pontosColeta.ilike('pontos_coleta.bairro', `%${query.bairro}%`);
        }
        if (query.tipo_lixo) {
            pontosColeta = pontosColeta.ilike('tipos_lixo.tipo', `%${query.tipo_lixo}%`);
        }
        
        // Executa a consulta
        const { data, error } = await pontosColeta;
        if (error) throw error;
        
        return data;
    } catch (err) {
        throw err;
    }
}

async function inserir(pontoColeta) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .insert(pontoColeta)
            .select('*') // Retorna os dados inseridos
        
        if (error) {
            throw error
        }
        
        return data
    } catch (err) {
        throw { id: 500, msg: "Erro ao inserir ponto de coleta." }
    }
}

async function atualizar(id, pontoColeta) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .update(pontoColeta)
            .match({ id }) // Filtra pelo ID para atualizar o ponto de coleta específico
            .select('*') // Retorna os dados atualizados
        
        if (error) {
            throw error
        }
        
        return data
    } catch (err) {
        throw { id: 500, msg: "Erro ao atualizar ponto de coleta." }
    }
}

async function deletar(id) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .delete()
            .match({ id }) // Filtra pelo ID para deletar o ponto de coleta específico
            .select('*') // Retorna os dados deletados
        
        if (error) {
            throw error
        }
        
        return data
    } catch (err) {
        throw { id: 500, msg: "Erro ao deletar ponto de coleta." }
    }
}


module.exports = {
    buscar,
    inserir,
    atualizar,
    deletar
};