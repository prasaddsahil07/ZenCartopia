import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import Order from "./order.model.js";

const Review = sequelize.define("Review", {
  review_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
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
  review_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // Ensures score is at least 1
      max: 5, // Ensures score does not exceed 5
    },
  },
  review_comment_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  review_comment_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "reviews", // Explicit table name
  timestamps: true,
});

export default Review;
