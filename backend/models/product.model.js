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
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  product_price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  product_photos: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: "products", // Explicit table name
  timestamps: true,
});

export default Product;
