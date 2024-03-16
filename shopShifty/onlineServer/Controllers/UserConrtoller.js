const userModel = require('../Models/UserModel')
const CartModel = require('../Models/CartModel')
const bcrypt = require('bcryptjs'); 
const Razorpay = require('../payments/Razorpay')
const con = require('../Db/db')
const HomepageData = (req,res)=>{
    let data={name:"anaz"}
    res.send(data);
}
const userRegistration = async (req,res)=>{
    console.log(req.body)
    

    try {
        const {Password}  =  req.body
        bcrypt.hash(Password,10,  async function(err,hash){
            if(err){
                console.log(err)

            }else{
               
                let data = req.body;
                let sql = "Insert into user set?"
                con.query(sql,data,(err,row)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Data inserted")
                        res.json(true)
                    }
                })
                // await  userModel.create(req.body)
                // console.log("Data inserted")
            
            }
        })
        
    } catch (error) {
        console.log(error) 
    }
  
}

const userLogin = async (req,res)=>{
    console.log(req,res)
    const { Email } = req.body;
    const   pass = req.body.Password;
        try {
            let sqlEmail = "select * from user where Email = ? and Password = ?"
            con.query(sqlEmail,[Email,pass],(err,userDetails)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(userDetails,"user--")
                        let user = userDetails[0]
                        console.log(user,"user--")

                        if(userDetails.length > 0){
                            let userData = {
                                user
                            }
                            res.json(userData)
                        }else{
                            res.json(false)
                        }
                    }
            })
            // let user = await userModel.findOne({Email:Email})
            // console.log(user)
            // let Password =user.Password;
            // let compare = await bcrypt.compare(pass,Password)
            // console.log(compare)
            // if(compare){
                
            //     let userId = user._id;
            //     let cart= await CartModel.findOne({userId:userId})
            //      let cartTotal = cart.product.length;
            //     console.log(cartTotal,"cart")
            //     let userData = {
            //             user,
            //             cartTotal
            //     }
            //     res.json(userData)
            // }else{
            //     res.json(false)
            //     console.log(false)
            // }     
        } catch (error) {
            console.log(error)
        }
}
const AddToCart = async(req,res)=>{
    try {
       console.log(req.body.obj)
       let {obj} = req.body
       let userId = req.body.userId; 
       let cart=await CartModel.findOne({userId:userId});
       console.log(cart)
                if(!cart){
                        console.log("i am here")
                        obj.quantity = 1;
                        let cartObject = {
                            userId,
                            product : [obj]
                        };
                        let Newcart = await CartModel.create(cartObject)
                        console.log(Newcart.product,"----new")
                }else{
                    console.log("else part")
                        console.log(cart.product,"product id")
                           let cartExisit = cart.product.findIndex((product)=>product._id == obj._id)
                           console.log(cartExisit)
                           if(cartExisit == -1){
                                obj.quantity = 1;
                                    await CartModel.findOneAndUpdate({userId:userId},
                                            {
                                                $push: {
                                                         product : obj
                                                        }
                                            }
                                        )     
                           }else{
                                     res.json("Already Exsit")
                           }
                }
       res.json("cart got")
    } catch (error) {
        
    }
}

const getCartItem = async (req,res)=>{
        try {   
                console.log("at get cart")
                console.log(req.body)
                const userId = req.body._id;  
                 let userCart = await CartModel.findOne({userId:userId});
                 res.json(userCart)   
            } catch (error) {
                    console.log(error)
            }
    }
const removefromCart = async(req,res)=>{
        try {
            console.log(req.body)
            const Product_Id = req.body.id
            const user_id = req.body.user_Id
            console.log(Product_Id, user_id)
            let removedItem = await CartModel.findOneAndUpdate(
                { userId:user_id},
                {
                    $pull: {
                        product: {
                           
                            '_id': Product_Id
                        }
                    }
                }
            );
            console.log(removedItem)
            res.json(true)
        } catch (error) {
            console.log(error) 
        }
}
const increment = async(req,res)=>{
    let {user_Id} =req.body
    let { id} = req.body
    try {
        let increments = await CartModel.findOneAndUpdate({userId:user_Id,'product._id': id},{
            $inc:{ 'product.$.quantity' :1 },
        })
    } catch (error) {
        console.log(error)
    }
}
const decrement = async(req,res)=>{
    let {user_Id} =req.body
    let { id} = req.body
    try {
        let increments = await CartModel.findOneAndUpdate({userId:user_Id,'product._id': id},{
            $inc:{ 'product.$.quantity' :-1 },
        })
    } catch (error) {
        console.log(error)
    }
}
const createOrder = async(req,res)=>{
        let {total} = req.body;
        let {userid} = req.body;
        try {
            const options = {
                amount:total,
                receipt:userid,
                payment_capture: 1
            };
            const response = await Razorpay.orders.create(options)
            res.json({
                order_id: response.id,
                currency: response.currency,
                amount: response.amount,
            })
        } catch (error) {
           console.log(error) 
        }
}
const addCTR = (req, res) => {
    try {
        let data = req.body;
        let currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0'); // Ensure two digits with leading zero if necessary
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
       
            let time =  `${hours}:${minutes}:${seconds}`

        console.log(formattedDate);
        data.date = formattedDate;
        data.time =time
        console.log(data);
        let sql = "INSERT INTO CTR SET ?";
        con.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Database error" }); // Send an error response
            } else {
                console.log("CTR inserted successfully");
                res.json(true);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" }); // Send an error response
    }
};

const getAllusers = (req,res)=>{
        try {
                let sql = "Select * from user"
                 con.query(sql,(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                        res.json(result)
                    }
                 }) 
        } catch (error) {
            console.log(error)
        }
}

const AddDetails = (req,res)=>{
        try {
            let sql = "SELECT COUNT(*) AS total_users FROM ctr"
            let sql2 = "Select * from ctr"
            con.query(sql,(err,row)=>{
                if(err){
                    console.log(err)
                }else{
                    con.query(sql2,(err,rsult)=>{
                        if(err){console.log(err)}else{
                            let Data = {
                                row,
                                rsult
                            }
                            res.json(Data)
                        }
                    })
                  
                }
            })
        } catch (error) {
            console.log(error)
        }
}
const getCTR = (req,res)=>{
    try {
        let sql = "Select * from ctr"
        con.query(sql,(err,result)=>{
                if(err)
                {
                    console.log(err)
                }else{
                    res.json(result)
                }
        })
    } catch (error) {
        console.log(error)
        
    }
}
const pdfkit = require('pdfkit');
const fs = require('fs');


const generateAndDownloadPDF = (req, res) => {
    try {
        let sql = "SELECT * FROM ctr";
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Database error" });
            } else {
                // Generate PDF with the result data
                const doc = new pdfkit();
                doc.pipe(fs.createWriteStream('ctr_report.pdf'));
                doc.fontSize(20).text('CTR Report', { align: 'center' }).moveDown(1);
                
                // Define table headers
                const headers = ["Add ID", "Username", "Email", "ID", "Date", "Time"];
                
                // Add table headers
                doc.font('Helvetica-Bold');
                doc.text(headers.join("\t"), { align: 'left' }).moveDown(0.5);
                doc.font('Helvetica');

                // Add table rows
                result.forEach((row, index) => {
                    const rowData = [
                        row.addId,
                        row.UserName,
                        row.Email,
                        row.id,
                        row.date,
                        row.time
                    ];
                    doc.text(rowData.join("\t")).moveDown(0.5);
                });

                doc.end();
                // Download the generated PDF
                res.download('ctr_report.pdf');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    generateAndDownloadPDF,
    HomepageData,
    userRegistration,
    userLogin,
    AddToCart,
    getCartItem,
    removefromCart,
    decrement,
    increment,
    createOrder,
    addCTR,
    getAllusers,
    AddDetails,
    getCTR
}
