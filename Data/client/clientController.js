/**
 * ClientController manipula as operações CRUD para o estoque. Create, Read, Update, Delete.
 * @param {Object} Os parametros que o clientController precisa para funcionar.
 * @returns {Object} - Retorna um objeto com as funções CRUD para o estoque.
 */

function ClientController(ClientModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        deleteClient
    }

    /**
     * Cria um novo cliente.
     * @param {Object} - Os valores para o novo cliente.
     * @returns {Promise} 
     */

    function create(values) {
        let newClient = ClientModel(values);
        return save(newClient);
    }

    function save(client) {
        return new Promise((resolve, reject) => {
            client.save()
                .then(() =>{
                    resolve('Client created');
                })
                .catch((err) => {
                    reject(err);
                });
            });
    }

    function findAll() {
        return new Promise((resolve, reject) => {
            ClientModel.find({})
                .then((client) => {
                    resolve(client);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function findById(id) {
        return new Promise((resolve, reject) => {
            ClientModel.findById(id)
                .then((client) => {
                    resolve(client);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function update(id, values) {
        return new Promise(function(resolve, reject) {
            ClientModel.updateOne({_id: id}, values)
            .then(result => {
                if(result.nModified > 0) {
                    resolve('Client updated');
                } else {
                    reject('Client not found');
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    function deleteClient(id) {
        return new Promise(function(resolve, reject) {
            ClientModel.deleteOne({_id: id})
            .then(result => {
                if(result.deletedCount > 0) {
                    resolve('Client deleted');
                } else {
                    reject( new Error ('Client not found'));
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
    
    return controller;
}

module.exports = ClientController;