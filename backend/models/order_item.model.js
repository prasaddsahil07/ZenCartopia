import { DataTypes } from "sequelize";
import sequelize from "../db/database.js"; // Adjust path as needed

const OrderItem = sequelize.define("OrderItem", {
  order_id: {
    type: DataTypes.STRING, // Assuming order_id is a UUID or unique string
    allowNull: false,
  },
  order_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING, // Assuming product_id is a UUID or unique string
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.STRING, // Assuming seller_id is a UUID or unique string
    allowNull: false,
  },
  shipping_limit_date: {
    type: DataTypes.DATE, // Stores date and time
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
  primaryKey: false, // Disables default auto-increment key
});

OrderItem.removeAttribute('id'); // Removes Sequelize's default primary key

// Define composite primary key
OrderItem.primaryKeyAttributes = ['order_id', 'order_item_id'];

export default OrderItem;
