import crypto from 'crypto';

import axios from 'axios';

import { logger } from './winston.logger';
import { env } from '../config/env';

export class KashierPayment {
  private static generateSignature(data: string): string {
    return crypto.createHmac('sha256', env.payment.apiSecret).update(data).digest('hex');
  }

  private static generateKashierOrderHash(order: any): string {
    const mid = env.payment.marchent_id; // Use your merchant id from environment
    const CustomerReference = order.user; // Use the user field from the order as customer reference

    const amount = order.amount; // amount in the order
    const currency = order.currency; // fixed currency as 'EGP'
    const orderId = order.order; // order ID in the order
    const secret = env.payment.apiKey; // API secret from environment

    const path = `/?payment=${mid}.${orderId}.${amount}.${currency}${CustomerReference ? '.' + CustomerReference : ''}`;
    const hash = crypto.createHmac('sha256', secret).update(path).digest('hex');
    return hash;
  }

  public static async createPayment(
    amount: number,
    currency: string,
    orderId: string,
    userId: string,
  ): Promise<any> {
    const payload = {
      amount: amount * 100,
      currency,
      merchant_order_id: orderId,
      marchent_id: env.payment.marchent_id,
      source: {
        identifier: 'CARD',
        subtype: 'CREDIT',
      },
    };

    const dataString = JSON.stringify(payload);
    const signature = KashierPayment.generateSignature(dataString);
    const orderHash = KashierPayment.generateKashierOrderHash({
      amount: amount * 100,
      currency,
      order: orderId,
      user: userId,
    });

    const mid = env.payment.marchent_id;
    const CustomerReference = userId;
    const path = `/?payment=${mid}.${orderId}.${amount * 100}.${currency}${CustomerReference ? '.' + CustomerReference : ''}`;

    const endpoint = `${env.payment.baseUrl}${path}`;

    const headers = {
      Authorization: `Bearer ${env.payment.apiSecret}`,
      'Content-Type': 'application/json',
      signature: signature,
      'order-hash': orderHash, // Assuming the API requires this header
    };

    try {
      const response = await axios.post(endpoint, payload, { headers });
      return response.data;
    } catch (error) {
      logger.error('Error creating payment:', error);
      throw error;
    }
  }
}

// export class KashierPayment {
//   private static generateSignature(data: string): string {
//     return crypto.createHmac('sha256', env.payment.apiSecret).update(data).digest('hex');
//   }

//   private static generateKashierOrderHash(order: any): string {
//     const mid = env.payment.marchent_id;
//     const CustomerReference = order.user;

//     const amount = order.amount;
//     const currency = 'EGP';
//     const orderId = order.order;
//     const secret = env.payment.apiSecret;

//     const path = `/?payment=${mid}.${orderId}.${amount}.${currency}${CustomerReference ? ('.' + CustomerReference) : ''}`;
//     const hash = crypto.createHmac('sha256', secret).update(path).digest('hex');
//     return hash;
//   }

//   public static async createPayment(amount: number, currency: string, orderId: string): Promise<any> {
//     const payload = {
//       amount: amount * 100,
//       currency,
//       merchant_order_id: orderId,
//       marchent_id: env.payment.marchent_id,
//       source: {
//         identifier: 'CARD',
//         subtype: 'CREDIT'
//       }
//     };

//     const dataString = JSON.stringify(payload);
//     const signature = KashierPayment.generateSignature(dataString);
//     const orderHash = KashierPayment.generateKashierOrderHash({
//       amount: amount * 100,
//       currency,
//       order: orderId,
//       user: '1' // assuming user reference is '1', this should be dynamic based on your requirements
//     });

//     const headers = {
//       'Authorization': `Bearer ${env.payment.apiSecret}`,
//       'Content-Type': 'application/json',
//       'signature': signature,
//       'order-hash': orderHash // Assuming the API requires this header
//     };

//     try {
//       const response = await axios.post(`${env.payment.baseUrl}`, payload, { headers });
//       return response.data;
//     } catch (error) {
//       logger.error('Error creating payment:', error);
//       throw error;
//     }
//   }

//   public static generateCheckoutUrl(order: any): string {
//     const orderHash = KashierPayment.generateKashierOrderHash(order);

//     const queryParams = new URLSearchParams({
//       merchantId: env.payment.marchent_id,
//       orderId: order.order,
//       amount: order.amount.toString(),
//       currency: 'EGP',
//       hash: orderHash,
//       merchantRedirect: 'https://your-success-redirect-url.com',
//       serverWebhook: 'https://your-webhook-url.com'
//     });

//     return `https://checkout.kashier.io/?${queryParams.toString()}`;
//   }
// }
