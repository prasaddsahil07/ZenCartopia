import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";

const ProductCategory = sequelize.define("ProductCategory", {
  product_category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // Composite Primary Key (part 1)
  },
  product_category_name_english: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // Composite Primary Key (part 2)
  },
}, {
  tableName: "product_categories", // Explicit table name
  timestamps: true,
});

export default ProductCategory;
