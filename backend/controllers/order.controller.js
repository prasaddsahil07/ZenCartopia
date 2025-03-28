import Order from "../models/order.model.js";
import OrderItem from "../models/order_item.model.js";
import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";
import sequelize from "../db/dbConnect.js";

/**
 * Create a new order along with its order items.
 * Expects the request body to include:
 *  - order_id, customer_unique_id, order_status,
 *    order_estimated_delivery_date, (optional order_delivered_* dates),
 *    and items: an array of objects containing order_item_id, product_id, seller_id, shipping_limit_date, price, freight_value.
 */
export const createOrder = async (req, res) => {
  try {
    const {
      order_id,
      customer_unique_id,
      order_status,
      order_estimated_delivery_date,
      order_delivered_carrier_date,
      order_delivered_customer_date,
      items,
    } = req.body;

    // Validate required fields
    if (
      !order_id ||
      !customer_unique_id ||
      !order_estimated_delivery_date ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ message: "Missing required order fields or items." });
    }

    // Create order and associated items within a transaction for atomicity
    const result = await sequelize.transaction(async (t) => {
      const newOrder = await Order.create(
        {
          order_id,
          customer_unique_id,
          order_status,
          order_estimated_delivery_date,
          order_delivered_carrier_date,
          order_delivered_customer_date,
        },
        { transaction: t }
      );

      // Create each order item in parallel
      const orderItemsPromises = items.map((item) =>
        OrderItem.create(
          {
            order_id,
            order_item_id: item.order_item_id,
            product_id: item.product_id,
            seller_id: item.seller_id,
            shipping_limit_date: item.shipping_limit_date,
            price: item.price,
            freight_value: item.freight_value,
          },
          { transaction: t }
        )
      );

      const orderItems = await Promise.all(orderItemsPromises);
      return { order: newOrder, items: orderItems };
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: result.order,
      items: result.items,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all orders for the logged-in customer with associated order items.
 * Eager load product and seller details for each order item.
 * Assumes authMiddleware attaches the logged-in customer info to req.user.
 */
export const getMyOrders = async (req, res) => {
  try {
    const { customer_unique_id } = req.user;

    const orders = await Order.findAll({
      where: { customer_unique_id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: OrderItem,
          as: "items",
          attributes: ["order_item_id", "shipping_limit_date", "price", "freight_value"],
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["product_name", "product_photos"],
            },
            {
              model: Seller,
              as: "seller",
              attributes: ["seller_name"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get detailed order information by order_id.
 * Returns order details along with all associated order items,
 * including product and seller details.
 * Expects order_id as a URL parameter.
 */
export const getOrderDetails = async (req, res) => {
    try {
      const { order_id } = req.params;
      const order = await Order.findByPk(order_id, {
        include: [
          {
            model: OrderItem,
            as: "items",
            attributes: ["order_item_id", "shipping_limit_date", "price", "freight_value"],
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["product_name", "product_photos"],
              },
              {
                model: Seller,
                as: "seller",
                attributes: ["seller_name"],
              },
            ],
          },
        ],
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ order });
    } catch (error) {
      console.error("Error fetching order details:", error.message);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

/**
 * Update an order's status.
 * Expects order_id as a URL parameter and new order_status in the request body.
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { order_status } = req.body;

    if (!order_status) {
      return res.status(400).json({ message: "Missing order status." });
    }

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.order_status = order_status;
    await order.save();

    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete an order.
 * Expects order_id as a URL parameter.
 */
export const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
