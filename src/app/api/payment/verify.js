import { PaystackService } from '@/utils/paystack';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ 
        message: 'Transaction reference is required' 
      });
    }

    // Verify transaction
    const result = await PaystackService.verifyTransaction(reference);

    if (result.success) {
      const transaction = result.data;
      
      // Here you can save transaction to your database
      // await saveTransactionToDatabase(transaction);
      
      res.status(200).json({
        success: true,
        data: {
          reference: transaction.reference,
          amount: transaction.amount / 100, // Convert from kobo
          status: transaction.status,
          customer: transaction.customer,
          paidAt: transaction.paid_at,
          metadata: transaction.metadata
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}