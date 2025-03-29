// controllers/payment.controller.js
import Payment from "../models/payment.model.js";

/*
 * The function calculates payment_sequential by counting existing payment records for the same order_id and adds one.
 * This ensures that if multiple payments are recorded for a single order, each has a unique sequence number.
 */
export const checkoutPayment = async (req, res) => {
  try {
    const { order_id, payment_type, payment_installments, payment_value } = req.body;

    // Validate required fields
    if (!order_id || !payment_type || payment_value == null) {
      return res.status(400).json({ message: "Missing required payment fields." });
    }

    // Set default installments if not provided
    const installments = payment_installments || 1;

    // Calculate payment_sequential:
    // Count existing payments for this order and add one to determine the new payment's sequence.
    const existingPayments = await Payment.findAll({ where: { order_id } });
    const payment_sequential = existingPayments.length + 1;

    // Create the new payment record with the calculated payment_sequential.
    const payment = await Payment.create({
      order_id,
      payment_sequential,
      payment_type,
      payment_installments: installments,
      payment_value,
    });

    return res.status(201).json({ 
      message: "Payment recorded successfully", 
      payment 
    });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Retrieve all payment records for a specific order.
 * This can be useful for admin dashboards or debugging purposes.
 * Expects order_id as a URL parameter.
 */
export const getPaymentsByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const payments = await Payment.findAll({ where: { order_id } });

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found for this order" });
    }

    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
