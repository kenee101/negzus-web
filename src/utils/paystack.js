import axios from 'axios';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Create axios instance with default headers
const paystackAPI = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

export class PaystackService {
  // Initialize transaction
  static async initializeTransaction(data) {
    try {
      const response = await paystackAPI.post('/transaction/initialize', {
        email: data.email,
        amount: data.amount * 100, // Convert to kobo
        currency: 'NGN',
        reference: data.reference || this.generateReference(),
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: data.customerName
            },
            {
              display_name: "Service Type",
              variable_name: "service_type", 
              value: data.serviceType || "fuel_purchase"
            },
            {
              display_name: "Station ID",
              variable_name: "station_id",
              value: data.stationId
            }
          ]
        },
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      });

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Initialize transaction error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to initialize transaction'
      };
    }
  }

  // Verify transaction
  static async verifyTransaction(reference) {
    try {
      const response = await paystackAPI.get(`/transaction/verify/${reference}`);
      
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Verify transaction error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to verify transaction'
      };
    }
  }

  // Get transaction details
  static async getTransaction(transactionId) {
    try {
      const response = await paystackAPI.get(`/transaction/${transactionId}`);
      
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Get transaction error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Transaction not found'
      };
    }
  }

  // List transactions with filters
  static async listTransactions(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        perPage: params.limit || 50,
        page: params.page || 1,
        ...(params.customer && { customer: params.customer }),
        ...(params.status && { status: params.status }),
        ...(params.from && { from: params.from }),
        ...(params.to && { to: params.to }),
      });

      const response = await paystackAPI.get(`/transaction?${queryParams}`);
      
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('List transactions error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch transactions'
      };
    }
  }

  // Create customer
  static async createCustomer(customerData) {
    try {
      const response = await paystackAPI.post('/customer', {
        email: customerData.email,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
      });

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Create customer error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create customer'
      };
    }
  }

  // Generate unique reference
  static generateReference(prefix = 'NEG') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  }

  // Format amount for display
  static formatAmount(amount) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  }
}
