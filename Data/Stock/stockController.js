/**
 * // StockController manipula as operações CRUD para o estoque. Create, Read, Update, Delete.
 * @param {Object} // Os parametros que o stockController precisa para funcionar.
 * @returns {Object} // Retorna um objeto com as funções CRUD para o estoque.
 */
function StockController(StockModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        deleteStockItem,
        findByName,
        updateByName,
        deleteStockItemByName,
        findAllAndSort
    }

    /**
     * // Cria um novo item de stock.
     * @param {Object} // Os valores para o novo item de stock.
     * @returns {Promise} // Em caso de erro retorna uma mensagem de erro, em caso de sucesso retorna uma mensagem de sucesso.
     */
    function create(values) {
        let newStock = StockModel(values);
        return save(newStock);
    }

    /**
     * // Salva o item de stock na base de dados
     * @param {Object} // O item de stock a ser salvo.
     * @returns {Promise} // Em caso de erro retorna uma mensagem de erro, em caso de sucesso retorna uma mensagem de sucesso.
     */
    function save(newStock) {
        return new Promise(function(resolve, reject) {
            newStock.save()
                .then(() => {
                    resolve('Stock created');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
    /**
     * // Encontra todos os itens de stock.
     * @returns {Promise} // Em caso de erro retorna uma mensagem de erro, em caso de sucesso retorna uma mensagem de sucesso.
     */
    function findAll() {
        return new Promise(function(resolve, reject) {
            StockModel.find({})
                .then((stock) => {
                    resolve(stock);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function findAllAndSort(sortBy) {
        return StockModel.find({}).sort(sortBy)
            .then((stock) => {
                if (stock) {
                    return stock;
                } else {
                    throw new Error('No stock found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding and sorting stock: ' + err.message);
            });
    }

    function findById(id) {
        return new Promise(function(resolve, reject) {
            StockModel.findById(id)
                .then((stock) => {
                    if (stock) {
                        resolve(stock);
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    function findByName(name) {
        return StockModel.findOne({ name: name })
            .then((stock) => {
                if (stock) {
                    return stock;
                } else {
                    throw new Error('Stock not found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding stock: ' + err.message);
            });
    }

    /**
     * // Atualiza um item do stock.
     * @param {string} // O ID do item de stock a ser atualizado.
     * @param {Object} // Os valores atualizados para o item de stock.
     * @returns {Promise} // Em caso de erro retorna uma mensagem de erro, em caso de sucesso retorna uma mensagem de sucesso.
     */
    function update(id, values) {
        return new Promise(function(resolve, reject) {
            StockModel.updateOne({_id: id}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Stock updated');
                    } else {
                        reject(new Error('No changes made to the stock'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    function updateByName(name, values) {
        return new Promise(function(resolve, reject) {
            StockModel.updateOne({name: name}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Stock updated');
                    } else {
                        reject(new Error('No changes made to the stock'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * // Apaga um item do stock.
     * @param {string} // O ID do item de stock a ser apagado.
     * @returns {Promise} // Em caso de erro retorna uma mensagem de erro, em caso de sucesso retorna uma mensagem de sucesso.
     */
    function deleteStockItem(id) {
        return new Promise(function(resolve, reject) {
            StockModel.deleteOne({_id: id})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Stock deleted');
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


    function deleteStockItemByName(name) {
        return new Promise(function(resolve, reject) {
            StockModel.deleteOne({name: name})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Stock deleted');
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    return controller;
}

module.exports = StockController;