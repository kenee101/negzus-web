import crypto from 'crypto';
// import { PaystackService } from '@/utils/paystack';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const hash = crypto
      .createHmac('sha512', process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const event = req.body;

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        // Payment was successful
        console.log('Payment successful:', event.data);
        // Update your database
        // await updateTransactionStatus(event.data.reference, 'success');
        break;
        
      case 'charge.failed':
        // Payment failed
        console.log('Payment failed:', event.data);
        // await updateTransactionStatus(event.data.reference, 'failed');
        break;
        
      default:
        console.log('Unhandled event:', event.event);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}