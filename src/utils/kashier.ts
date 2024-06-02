import crypto from 'crypto';

import axios from 'axios';

import {logger} from './winston.logger';
import { env } from '../config/env';

export class KashierPayment {
  private static generateSignature(data: string): string {
    return crypto.createHmac('sha256', env.payment.apiSecret).update(data).digest('hex');
  }

  public static async createPayment(amount: number, currency: string, orderId: string): Promise<any> {
    const endpoint = env.payment.baseUrl;

    const payload = {
      amount: amount * 100,
      currency,
      merchant_order_id: orderId,
      merchant_id: env.payment.marchent_id,
      source: {
        identifier: 'CARD',
        subtype: 'CREDIT'
      }
    };

    const dataString = JSON.stringify(payload);
    const signature = KashierPayment.generateSignature(dataString);

    const headers = {
      'Authorization': `Bearer ${env.payment.apiKey}`,
      'Content-Type': 'application/json',
      'signature': signature
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
