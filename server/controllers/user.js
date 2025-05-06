import User from "../models/user.js"
import Product from "../models/product.js"
const createNewUser = async(req,res) => {
    try{
        const newUser = new User({
            userAuthId : req.body.id,
        })
        await newUser.save()
        res.send(newUser)
    }catch(err){
        console.log(err)
    }
}

const addToCart = async (req, res) => {
    try {
        const updatedUserCart = await User.findOneAndUpdate(
            { userAuthId: req.body.userAuthId },
            { $push: { cartItems: { pdtId: req.body.product_Id , qty : 1} } },
            { new: true } // Return the updated document
        );
        res.send(updatedUserCart);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const getCartItems = async (req, res) => {
    try {
        const _user_id = req.params.id;
        const user = await User.findOne({ userAuthId: _user_id }).populate('cartItems.pdtId'); // Populate product details
        if (!user) {
            return res.status(404).send("User not found");
        }
        const cartTotalPrice = user.cartItems.reduce((acc, item) => acc + (item.pdtId.price * item.qty), 0);
        res.send({ cartItems : user.cartItems , cartTotalPrice });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const updateCartPdtQuantity = async (req, res) => {
  try {
    const _user_id = req.params.id; // User ID from URL params
    const { prdtId, action } = req.body; // Product ID and action from request body

    // Find the user by userAuthId
    const user = await User.findOne({ userAuthId: _user_id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the product in the cartItems array
    const cartPdt = user.cartItems.find(
      (prdtObj) => prdtObj.pdtId._id.toString() === prdtId.toString()
    );

    if (!cartPdt) {
      return res.status(404).send("Product not found in cart");
    }

    // Update the quantity based on the action
    if (action === "increase") {
      cartPdt.qty++; // Increase quantity
    } else if (action === "decrease") {
      if (cartPdt.qty > 1) {
        cartPdt.qty--; // Decrease quantity if greater than 1
      } else {
        // Remove the product if quantity is 1
        user.cartItems = user.cartItems.filter(
          (prdtObj) => prdtObj.pdtId._id.toString() !== prdtId.toString()
        );
      }
    } else {
      return res.status(400).send("Invalid action");
    }

    // Save the updated user document
    await user.save();

    // Send the updated cart items as response
    res.send(user.cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getOrders = async(req,res) => {
  const {user_auth_id} = req.body;
  const user = await User.findOne(
    {userAuthId  : user_auth_id}
  )
  .populate({
      path: 'orders',
      populate: {
        path: 'productData.pdtId',
        model: 'Product'            
      }
    });
  res.send(user.orders)
}

export {
    createNewUser, 
    addToCart, 
    getCartItems,
    updateCartPdtQuantity,
    getOrders
}