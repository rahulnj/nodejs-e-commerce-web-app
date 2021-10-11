var db = require('../config/connection')
var collection = require('../config/collections')
// const { ObjectId } = require('bson')
var objectId = require('mongodb').ObjectId
const { Db } = require('mongodb')
const { response } = require('express')
module.exports = {
    addProduct: async (product) => {

        let data = await db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product)
        return data.insertedId
    },

    getProducts: async (product) => {
        let proDetails = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        // console.log(proDetails);
        return proDetails
    },
    deleteProducts: async (product) => {
        let prodDetails = await db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(product) })
        return prodDetails
    },
    editProduct: async (product) => {
        let prodDetails = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectId(product) })
        return prodDetails
    },
    updateProduct: async (proId, product) => {
        let prodDetails = await db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ _id: objectId(proId) }, {
            $set: {

                product: product.product,
                description: product.description,
                price: product.price,
                quantity: product.quantity
            }
        })
        return prodDetails
    },
    getSingleproduct: async (proId, product) => {
        let prodDetails = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectId(proId) })
        // console.log(prodDetails);
        return prodDetails
    },
    createCategory: (category, sub, type) => {
        return new Promise(async (resolve, reject) => {

            let categoryDetails = await db.get().collection(collection.CATEGORY_COLLECTION).findOne({ category: category, "subcategory.name": sub })
            // console.log(categoryDetails);
            if (!categoryDetails) {
                let catDetails = await db.get().collection(collection.CATEGORY_COLLECTION).findOne({ category: category })
                if (catDetails) {
                    // console.log(categoryDetails);
                    // console.log("yeah");
                    db.get().collection(collection.CATEGORY_COLLECTION).updateOne({ category: category }, {

                        $push: { subcategory: { name: sub } }

                    }
                    ).then((response) => {
                        // console.log(catDetails);

                        let alreadyTypeFound = catDetails.type.find(elem => elem.name == type);
                        if (alreadyTypeFound) {
                            resolve()
                        }
                        else {
                            db.get().collection(collection.CATEGORY_COLLECTION).updateOne({ category: category }, {

                                $push: { type: { name: type } }

                            }).then(() => {
                                resolve();
                            })
                        }

                    })
                } else {
                    let createObj = {
                        category: category,
                        subcategory: [{ name: sub }],
                        type: [{ name: type }]
                    }
                    db.get().collection(collection.CATEGORY_COLLECTION).insertOne(createObj).then((response) => {
                        resolve()
                    })
                }

            } else {
                resolve()

            }
        })
    }, categoryDetails: async () => {
        let details = await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
        return details
    },
    deleteCategory: async (categoryId) => {
        let deleteCat = await db.get().collection(collection.CATEGORY_COLLECTION).deleteOne({ _id: objectId(categoryId) })
        return deleteCat
    },
    showSubcategory: async (category) => {
        let show = await db.get().collection(collection.CATEGORY_COLLECTION).findOne({ category: category }, { subcategory: 0 })
        // console.log(show.subcategory);
        return show
    }


}

