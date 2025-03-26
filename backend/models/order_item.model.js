import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";

const OrderItem = sequelize.define("OrderItem", {
  order_id: {
    type: DataTypes.STRING, 
    primaryKey: true,
    allowNull: false,
  },
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  shipping_limit_date: {
    type: DataTypes.DATE, 
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  freight_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "order_items", // Explicit table name
  timestamps: true,
});

export default OrderItem;
