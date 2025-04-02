import sequelize from "../db/dbConnect.js";
import Customer from "./customer.model.js";
import Order from "./order.model.js";
import OrderItem from "./order_item.model.js";
import Seller from "./seller.model.js";
import Product from "./product.model.js";

// One customer has many orders
Customer.hasMany(Order, { foreignKey: "customer_unique_id", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "customer_unique_id", as: "customer" });

// One order has many order items
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// One order item belongs to one product
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// One order item belongs to one seller
OrderItem.belongsTo(Seller, { foreignKey: "seller_id", as: "seller" });

export {
  Customer,
  Order,
  OrderItem,
  Seller,
  Product
};
