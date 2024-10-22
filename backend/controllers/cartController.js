import userModel from "../models/userModel.js"

//items to user cart add

const addToCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}


// items remaove 
const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
          cartData[req.body.itemId] -= 1;
        } else {
          delete cartData[req.body.itemId];
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
      } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
      }
}


// fetch cart data of user 
const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData: cartData });
      } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
      }
}

export {addToCart,removeFromCart,getCart}