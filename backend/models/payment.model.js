import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import Order from "./order.model.js";

const Payment = sequelize.define("Payment", {
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Order,     // References Orders table
      key: "order_id",  // The primary key in Orders
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  payment_sequential: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_installments: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  payment_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "payments", // Explicit table name
  timestamps: true,
});

// Adding composite primary key (order_id, payment_sequential)
Payment.removeAttribute("id");  
Payment.primaryKeyAttributes = ["order_id", "payment_sequential"];

export default Payment;
