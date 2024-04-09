//Criar funçoes para manipular os dados do stock
// O stockController vai ser responsavel pelas operaçoes CRUD do stock

// Os param e os returns sao documentados com JSDoc, usados para documentar parametros returnar tipos de funçoes, por isso devem estar comentados e nao diretamente no codigo

/**
 * @param {Object} StockModel
 * @returns {Object}
 */

function StockController(StockModel) {
  let controller = {
    create,
    findAll,
    findById,
    update,
    deleteStockItem,
  };

  //Cria um novo stock de itens
  /**
   *  @param {Object} values
   *  @returns {Promise}
   */
  function create(values) {
    let newStock = StockModel(values);
    return save(newStock);
  }

  /**
   * Guarda o item do stock na base de dados
   * @param {Object} O item a ser guardado
   * @returns {Promise} - Mostra uma mensagem de sucesso ou de erro a guardar o item
   */
  function save(newStock) {
    return new Promise(function (resolve, reject) {
      newStock
        .save()
        .then(() => {
          resolve("Stock created");
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /**
   * Encontra todos os itens do stock
   * @returns {Promise}
   */
  function findAll() {
    return new Promise(function (resolve, reject) {
      StockModel.find({})
        .then((stock) => {
          resolve(stock);
        })
        .catch((err) => {
          reject(err);
        });
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

/**
     * Updates a stock item.
     * @param {string} O id do item do stock a ser atualizado.
     * @param {Object} os valores do item do stock a serem atualizados.
     * @returns {Promise} 
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
/**
     * Apaga um item do stock
     * @param {string} O id do item do stock a ser apagado
     * @returns {Promise} 
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

    return controller;
}

module.exports = StockController;
