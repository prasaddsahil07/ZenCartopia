import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import bcrypt from "bcryptjs";

const Customer = sequelize.define('Customer', {
  customer_name: {
    type: DataTypes.STRING,
    defaultValue: "Sangita",
    allowNull: false,
  },
  customer_password: {
    type: DataTypes.STRING,
    defaultValue: "myPassword@123",
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_unique_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  customer_zip_code_prefix: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  customer_city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_profile_pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_role: {
    type: DataTypes.ENUM("customer", "admin"),
    defaultValue: "customer",
  },
}, {
  tableName: 'customers',   // table name
  timestamps: true,
});

Customer.removeAttribute("id");

Customer.beforeSave(async (customer, options) => {
  if(customer.changed('customer_password')){
    const salt = await bcrypt.gentsalt(10);
    customer.customer_password = await bcrypt.hash(customer.customer_password, salt);
  }
});

Customer.prototype.comparePassword = async function(password){
  return bcrypt.compare(password, this.customer_password);
};

export default Customer;