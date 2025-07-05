const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const { validationResult } = require("express-validator");

exports.createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      restaurantId,
      items,
      deliveryAddress,
      paymentMethod,
      paymentDetails,
      deliveryInstructions,
      totalAmount,
      status,
      paymentStatus,
    } = req.body;

    console.log("Received order data:", req.body); 

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentDetails:
        paymentMethod === "credit_card" ? paymentDetails : undefined,
      deliveryInstructions,
      status: status || "pending",
      paymentStatus: paymentStatus || "pending",
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000), 
    });

    await order.save();
    await order.populate("restaurant", "name");
    await order.populate("user", "name email");

    console.log("Created order:", order); 

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error); 
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant", "name")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    order.status = status;
    if (status === "delivered") {
      order.actualDeliveryTime = new Date();
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }


    if (!["pending", "confirmed"].includes(order.status)) {
      return res
        .status(400)
        .json({ error: "Order cannot be cancelled at this stage" });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    order.status = "cancelled";
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRestaurantOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (
      restaurant.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const orders = await Order.find({ restaurant: restaurantId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
