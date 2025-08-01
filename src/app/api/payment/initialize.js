import { PaystackService } from '@/utils/paystack';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, amount, customerName, stationId, serviceType } = req.body;

    // Validate required fields
    if (!email || !amount || !customerName) {
      return res.status(400).json({ 
        message: 'Missing required fields: email, amount, customerName' 
      });
    }

    // Initialize transaction
    const result = await PaystackService.initializeTransaction({
      email,
      amount: parseFloat(amount),
      customerName,
      stationId,
      serviceType
    });

    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    console.error('Initialize payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
