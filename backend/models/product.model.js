import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import ProductCategory from "./product_category_name_translation.model.js";

const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  product_category_name: {
    type: DataTypes.STRING,
    allowNull: true, 
    references: {
      model: ProductCategory,
      key: "product_category_name",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL", // If a category is deleted, set product_category_name to NULL
  },
  product_name_length: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // Ensures at least one character
    },
  },
  product_description_length: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Ensures non-negative values
    },
  },
  product_photos_qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // At least 0 photos (some products may not have images)
    },
  },
}, {
  tableName: "products", // Explicit table name
  timestamps: true,
});

export default Product;
