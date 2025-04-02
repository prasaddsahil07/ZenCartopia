import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import ProductCategory from "./product_category_name_translation.model.js";

const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  product_category_name_english: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: ProductCategory,
      key: "product_category_name_english",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  product_photos: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "https://source.unsplash.com/random/300x300?fashion",
  },
}, {
  tableName: "products",
  timestamps: true,
});

export default Product;
