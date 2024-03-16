
const { response } = require("express");
const productModel = require("../Models/Addproductmodel")
const con = require('../Db/db')
const getProduct = async (req,res)=>{
    try {
        let sql = "Select * from adds"
        con.query(sql,(err,products)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json(products);
                }
        })
    //    let products = await productModel.find()
      
    } catch (error) {
        console.log(error)
    }
}
const addproduct = async (req,res)=>{
    console.log(req.body)
    // console.log(req.files)
    console.log("am here at add p")
    const {image} = req.files;
    console.log(image)
    let  nameNew = image.name;
    req.body.name = nameNew;
    let data = req.body;
    try {
        let sql ="insert into adds set ?";
        con.query(sql,data,(err,row)=>{
            if(err){
                console.log(err)
            }else{
                 image.mv('./Public/Images/Adds/' + nameNew +".jpg").then((err)=>{
                            if(!err){
                                res.json(true)
                            }else{
                                console.log(err)
                            }
                        })
            }
        })
    //     let product = await productModel.create(req.body)
    //    await image.mv('./Public/Images/Products/' + product._id +".jpg").then((err)=>{
    //         if(!err){
    //             res.json(true)
    //         }else{
    //             console.log(err)
    //         }
    //     })
       
    } catch (error) {
        console.log(error);
        
    }
}

const test = (req,res)=>{
        console.log("Test working..")
}

module.exports = {addproduct ,test, getProduct}

