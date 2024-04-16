/**
 * ProductController manipula as operações CRUD para o estoque. Create, Read, Update, Delete.
 * @param {Object} Os parametros que o productController precisa para funcionar.
 * @returns {Object} // Retorna um objeto com as funções CRUD para o estoque.
 */
function ProductController(ProductModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        deleteProductItem,
        findByName,
        updateByName,
        deleteProductItemByName,
        findAllAndSort
    }

    /**
     * Cria um novo item no stock
     * @param {Object} os valores para o novo item de stock
     * @returns {Promise} 
     */
    function create(values) {
        let newProduct = ProductModel(values);
        return save(newProduct);
    }

    /**
     * Guarda o novo item na base de dados do stock
     * @param {Object} o item de stock a ser salvo
     * @returns {Promise} 
     */
    function save(newProduct) {
        return new Promise(function(resolve, reject) {
            newProduct.save()
                .then(() => {
                    resolve('Product created');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
    /**
     * Encontra todos os itens de stock
     * @returns {Promise} 
     */
    function findAll() {
        return new Promise(function(resolve, reject) {
            ProductModel.find({})
                .then((product) => {
                    resolve(product);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function findAllAndSort(sortBy) {
        return ProductModel.find({}).sort(sortBy)
            .then((product) => {
                if (product) {
                    return product;
                } else {
                    throw new Error('No product found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding and sorting product: ' + err.message);
            });
    }

    function findById(id) {
        return new Promise(function(resolve, reject) {
            ProductModel.findById(id)
                .then((product) => {
                    if (product) {
                        resolve(product);
                    } else {
                        reject(new Error('Product not found'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    function findByName(name) {
        return ProductModel.findOne({ name: name })
            .then((product) => {
                if (product) {
                    return product;
                } else {
                    throw new Error('Product not found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding product: ' + err.message);
            });
    }

    /**
     * Faz update do novo item no stock
     * @param {string} o id do item de stock a ser atualizado
     * @param {Object} os valores atualizados para o item de stock
     * @returns {Promise} 
     */
    function update(id, values) {
        return new Promise(function(resolve, reject) {
            ProductModel.updateOne({_id: id}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Product updated');
                    } else {
                        reject(new Error('No changes made to the product'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    function updateByName(name, values) {
        return new Promise(function(resolve, reject) {
            ProductModel.updateOne({name: name}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Product updated');
                    } else {
                        reject(new Error('No changes made to the product'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Apaga o item do stock
     * @param {string} o id do item de stock a ser apagado
     * @returns {Promise} 
     */
    function deleteProductItem(id) {
        return new Promise(function(resolve, reject) {
            ProductModel.deleteOne({_id: id})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Product deleted');
                    } else {
                        reject(new Error('Product not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


    function deleteProductItemByName(name) {
        return new Promise(function(resolve, reject) {
            ProductModel.deleteOne({name: name})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Product deleted');
                    } else {
                        reject(new Error('Product not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    return controller;
}

module.exports = ProductController;