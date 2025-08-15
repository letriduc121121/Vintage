const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
// const user=require('../models/User');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
//helper function to get a cart  by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId }); //Tìm giỏ hàng có userId trong database (Cart.findOne({ user: userId })).
  } else if (guestId) {
    return await Cart.findOne({ guestId }); //Tìm giỏ hàng có guestId trong database (Cart.findOne({ guestId })).
  }
  return null;
};
// router.get('/',async(req, res)=>{
//     res.send('Đây là gio hang');
// })

//route post /api /cart
//desc add a product to the cart for a guest or logged ij user
//access public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    //determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);
    //if the cart exists,update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        //if the product already exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        //add new product
        // Sản phẩm chưa có, thêm mới vào giỏ hàng
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      //tong hoa don
      cart.totalPrice = cart.products.reduce(
        (Tongtien, item) => Tongtien + item.price * item.quantity,
        0
      ); //acc (accumulator): Tổng giá trị giỏ hàng, ban đầu là 0.
      await cart.save();
      return res.status(200).json(cart);
    } else {
      //creat a new cart for the guest
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//route PUT/api.api/cảt
//desc update product quantity in the cart  for a guest or logged in user
//access public
router.put("/", async (req, res) => {
  const {
    productId,
    quantity,
    size,
    color,

    guestId,
    userId,
  } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      //update product
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); //Nếu số lượng (quantity) bằng 0, nghĩa là người dùng muốn xóa sản phẩm khỏi giỏ hàng.
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//route delete/api.cart
//desc remove a product frp, the cart
//access public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//route get/api/cart
//desc get logged-in users or guest user's cart
//access public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//route post/api.cart/merge
//desc merge gueast cảrt into user cart on login
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            //if the item exists in the user cart ,update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        await userCart.save();
        //remove the gueast cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
          //Sau khi hợp nhất xong, giỏ hàng của khách (guestCart) được xóa khỏi database.
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
        res.status(200).json(userCart);
      } else {
        //if the user has no exsiting cart,assign the guest cart to the user
        guestCart.user = req.user._id; // Gán giỏ hàng khách cho người dùng
        guestCart.guestId = undefined; // Xóa guestId
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//bo sung chheckout
// router.post('/checkout', protect, async (req, res) => {
//     try {
//       const { user, orderItems, shippingAddress, totalPrice, name, phone } = req.body;

//       if (!Array.isArray(orderItems) || orderItems.length === 0) {
//         return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ!" });
//       }

//       // Kiểm tra số lượng sản phẩm trước khi trừ
//       for (const item of orderItems) {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           return res.status(404).json({ message: `Sản phẩm ${item.productId} không tồn tại` });
//         }
//         if (product.quantity < item.quantity) {
//           return res.status(400).json({ message: `Sản phẩm ${product.name} không đủ hàng` });
//         }
//       }

//       // Tạo đơn hàng
//       const newOrder = await Order.create({
//         user,
//         orderItems,
//         shippingAddress,
//         totalPrice,
//         paidAt: new Date().toISOString(),
//         isDelivered: false,
//         name,
//         phone,
//       });

//       // Giảm số lượng sản phẩm trong kho
//       await Promise.all(orderItems.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         if (product) {
//           product.countInStock -= item.quantity;
//           await product.save();
//         }
//         else{
//           return res.status(500).json({ message: "Lỗi server", error: error.message });

//         }
//       }));

//       // Xóa giỏ hàng sau khi đặt hàng thành công
//       await Cart.findOneAndDelete({ user });

//       return res.status(200).json(newOrder);
//     } catch (error) {
//       console.error("Lỗi khi tạo đơn hàng:", error);
//       res.status(500).json({ message: "Lỗi server", error: error.message });
//     }
//   });
module.exports = router;
