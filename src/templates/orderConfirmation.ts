// Order Confirmation Email Template
// This template can be used with email services like SendGrid, Mailgun, or AWS SES

interface OrderData {
  orderId: string;
  items: Array<{
    id: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  timestamp: string;
}

export const generateOrderConfirmationEmail = (orderData: OrderData): string => {
  const { orderId, items, customer, totals, timestamp } = orderData;
  
  const orderDate = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #eee;">
        <table style="width: 100%;">
          <tr>
            <td style="width: 80px; vertical-align: top;">
              <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 80px; object-fit: cover; border-radius: 4px;">
            </td>
            <td style="padding-left: 15px; vertical-align: top;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px; color: #333;">${item.title}</h3>
              <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">by ${item.author}</p>
              <p style="margin: 0; color: #888; font-size: 12px;">Quantity: ${item.quantity}</p>
            </td>
            <td style="text-align: right; vertical-align: top;">
              <p style="margin: 0; font-weight: bold; font-size: 16px; color: #333;">$${(item.price * item.quantity).toFixed(2)}</p>
              ${item.quantity > 1 ? `<p style="margin: 5px 0 0 0; color: #888; font-size: 12px;">$${item.price.toFixed(2)} each</p>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${orderId}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .content {
      padding: 30px;
    }
    .order-summary {
      background-color: #f8f9fa;
      border-radius: 6px;
      padding: 20px;
      margin: 20px 0;
    }
    .total-row {
      border-top: 2px solid #ddd;
      padding-top: 15px;
      margin-top: 15px;
      font-weight: bold;
      font-size: 18px;
    }
    .button {
      display: inline-block;
      background-color: #3B82F6;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 10px 0;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #eee;
    }
    @media (max-width: 600px) {
      body { padding: 10px; }
      .content { padding: 20px; }
      .header { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Order Confirmed!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase, ${customer.firstName}!</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      <!-- Order Info -->
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 20px; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; color: #666;">Order Number</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; font-family: monospace;">${orderId}</p>
        </div>
        <p style="margin: 15px 0 0 0; color: #666;">Order Date: ${orderDate}</p>
      </div>

      <!-- Items -->
      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">Your Order</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${itemsHtml}
      </table>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3 style="margin: 0 0 15px 0; color: #333;">Order Summary</h3>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 5px 0;">Subtotal:</td>
            <td style="text-align: right; padding: 5px 0;">$${totals.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;">Shipping:</td>
            <td style="text-align: right; padding: 5px 0;">${totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;">Tax:</td>
            <td style="text-align: right; padding: 5px 0;">$${totals.tax.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td>Total:</td>
            <td style="text-align: right;">$${totals.total.toFixed(2)}</td>
          </tr>
        </table>
      </div>

      <!-- Shipping Address -->
      <h3 style="color: #333;">Shipping Address</h3>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <p style="margin: 0; font-weight: bold;">${customer.firstName} ${customer.lastName}</p>
        <p style="margin: 5px 0 0 0;">${customer.address}</p>
        <p style="margin: 5px 0 0 0;">${customer.city}, ${customer.state} ${customer.zipCode}</p>
      </div>

      <!-- Next Steps -->
      <h3 style="color: #333;">What's Next?</h3>
      <ul style="color: #666; padding-left: 20px;">
        <li>Your order will be processed within 1-2 business days</li>
        <li>You'll receive a shipping confirmation with tracking information</li>
        <li>Estimated delivery: 5-7 business days</li>
      </ul>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://annalea.com/#books" class="button">Continue Shopping</a>
      </div>

      <!-- Support -->
      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; text-align: center;">
        <h4 style="margin: 0 0 10px 0; color: #333;">Need Help?</h4>
        <p style="margin: 0; color: #666;">
          Contact our support team at 
          <a href="mailto:support@annalea.com" style="color: #3B82F6;">support@annalea.com</a>
          or call 1-800-ANNALEA
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0 0 10px 0;">
        <strong>Anna Lea Books</strong><br>
        Inspiring Christian Literature
      </p>
      <p style="margin: 0;">
        This email was sent to ${customer.email}<br>
        © 2024 Anna Lea Books. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

// Plain text version for email clients that don't support HTML
export const generateOrderConfirmationText = (orderData: OrderData): string => {
  const { orderId, items, customer, totals, timestamp } = orderData;
  
  const orderDate = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const itemsList = items.map(item => 
    `- ${item.title} by ${item.author} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');

  return `
ORDER CONFIRMATION
==================

Hi ${customer.firstName},

Thank you for your order! Here are the details:

Order Number: ${orderId}
Order Date: ${orderDate}

ITEMS ORDERED:
${itemsList}

ORDER SUMMARY:
--------------
Subtotal: $${totals.subtotal.toFixed(2)}
Shipping: ${totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
Tax: $${totals.tax.toFixed(2)}
Total: $${totals.total.toFixed(2)}

SHIPPING ADDRESS:
${customer.firstName} ${customer.lastName}
${customer.address}
${customer.city}, ${customer.state} ${customer.zipCode}

WHAT'S NEXT?
- Your order will be processed within 1-2 business days
- You'll receive a shipping confirmation with tracking information
- Estimated delivery: 5-7 business days

NEED HELP?
Contact our support team at support@annalea.com or call 1-800-ANNALEA

Continue shopping: https://annalea.com/#books

---
Anna Lea Books - Inspiring Christian Literature
© 2024 Anna Lea Books. All rights reserved.

This email was sent to ${customer.email}
  `.trim();
};

// Usage example:
// const htmlEmail = generateOrderConfirmationEmail(orderData);
// const textEmail = generateOrderConfirmationText(orderData);
// 
// // Send with your email service
// await emailService.send({
//   to: orderData.customer.email,
//   subject: `Order Confirmation - ${orderData.orderId}`,
//   html: htmlEmail,
//   text: textEmail
// });