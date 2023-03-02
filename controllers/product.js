const ProductSchema = require("../models/products");

const getProducts = async(req,res)=> {
  
    try{
        //getting data from db
    const products = await ProductSchema.find({})

    if(products){
        res.json(products)
    }

    } catch(error){
        console.log(error)
    }
};

const getProduct = async(req,res)=> {
  
    try{
        //getting data from db
    const products = await ProductSchema.findById(req.params.id)
    
    // const products = await ProductSchema.findById(req.params.id);
    // res.status(200).json(products);

    if(products){
        res.json(products)
    }

    } catch(error){
        console.log(error)
    }
};

const createProduct = async(req,res)=> {
    try{
       const product = new ProductSchema({
        name : req.body.name,
        productInfo : req.body.productInfo,
        color : req.body.color,
        size : req.body.size,
        image : req.body.image,
        price : req.body.price,
       })

       const createData = await product.save();

       if(createData){
           res.send(createData);
       }
    } catch(error){
        console.log(error)
    }
};

const updateProduct = async(req,res)=> {
    try{
        // update a question

        const product = await ProductSchema.findByIdAndUpdate(req.params.id, req.body)
        
        if(product){
            res.send("Updated Successfully")
        }

    } catch(error){
        console.log(error)
    }
};

const deleteProduct = async(req,res)=> {
    try {
        // Delete a Question

        const product = await ProductSchema.findByIdAndDelete(req.params.id)

        if(question){
            res.send("Deleted Successfully")
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {getProducts, 
    createProduct,
    updateProduct,
    deleteProduct, 
    getProduct}



