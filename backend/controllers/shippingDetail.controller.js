import ShippingDetails from "../models/geolocation.model.js";

/**
 * Create shipping details for an order.
 * Expects the request body to include:
 * - order_id, geolocation_zip_code_prefix, geolocation_address, geolocation_city, geolocation_state.
 */
export const createShippingDetails = async (req, res) => {
  try {
    const { order_id, geolocation_zip_code_prefix, geolocation_address, geolocation_city, geolocation_state } = req.body;

    if (!order_id || !geolocation_zip_code_prefix || !geolocation_address || !geolocation_city || !geolocation_state) {
      return res.status(400).json({ message: "Missing required shipping details." });
    }

    const shippingDetails = await ShippingDetails.create({
      order_id,
      geolocation_zip_code_prefix,
      geolocation_address,
      geolocation_city,
      geolocation_state,
    });

    return res.status(201).json({ message: "Shipping details created", shippingDetails });
  } catch (error) {
    console.error("Error creating shipping details:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get shipping details for a specific order.
 * Expects order_id as a URL parameter.
 */
export const getShippingDetailsByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const shippingDetails = await ShippingDetails.findOne({ where: { order_id } });
    if (!shippingDetails) {
      return res.status(404).json({ message: "Shipping details not found for this order." });
    }
    return res.status(200).json({ shippingDetails });
  } catch (error) {
    console.error("Error fetching shipping details:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update shipping details for a specific order.
 * Expects order_id as a URL parameter and updated fields in the request body.
 */
export const updateShippingDetails = async (req, res) => {
  try {
    const { order_id } = req.params;
    const updates = req.body;
    const shippingDetails = await ShippingDetails.findOne({ where: { order_id } });
    if (!shippingDetails) {
      return res.status(404).json({ message: "Shipping details not found for this order." });
    }
    await shippingDetails.update(updates);
    return res.status(200).json({ message: "Shipping details updated", shippingDetails });
  } catch (error) {
    console.error("Error updating shipping details:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
