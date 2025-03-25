import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";

const Geolocation = sequelize.define("Geolocation", {
  geolocation_zip_code_prefix: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  geolocation_lat: {
    type: DataTypes.FLOAT(10, 2), // Restrict precision to avoid floating-point errors
    allowNull: false,
  },
  geolocation_lng: {
    type: DataTypes.FLOAT(10, 2), // Restrict precision to avoid floating-point errors
    allowNull: false,
  },
  geolocation_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geolocation_state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
}, {
  tableName: "geolocations", // Explicit table name
  timestamps: true,
});

Geolocation.removeAttribute('id'); // Remove default Sequelize primary key
Geolocation.primaryKeyAttributes = ["geolocation_lat", "geolocation_lng"]; // Composite PK

export default Geolocation;
