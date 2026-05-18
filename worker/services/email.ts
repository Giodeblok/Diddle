import type { Env } from '../types/env.js';

export interface OrderConfirmationData {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  productName: string;
  productSubtitle: string;
  shippingOption: 'standard' | 'express';
  productPrice: number;
  shippingPrice: number;
  total: number;
  address: string;
  postalCode: string;
  city: string;
}

async function sendEmail(env: Env, payload: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API fout: ${err}`);
  }
}

export async function sendContactEmail(env: Env, data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  await sendEmail(env, {
    from: env.RESEND_FROM_EMAIL,
    to: env.RESEND_FROM_EMAIL,
    replyTo: data.email,
    subject: `Nieuw bericht van ${data.name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
        <h2 style="color: #8b7355; border-bottom: 1px solid #e8dfd0; padding-bottom: 12px;">
          Nieuw contactbericht — Eeuwig Hart
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #8b7355;">Naam:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8b7355;">E-mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #8b7355;">${data.email}</a></td>
          </tr>
        </table>
        <div style="background: #f9f5f0; border-left: 3px solid #8b7355; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="font-size: 12px; color: #999; margin-top: 32px; border-top: 1px solid #e8dfd0; padding-top: 12px;">
          Verzonden via het contactformulier op eeuwighart.nl
        </p>
      </div>
    `,
  });
}

export async function sendOrderConfirmationToCustomer(env: Env, data: OrderConfirmationData): Promise<void> {
  const shippingLabel = data.shippingOption === 'express' ? 'Express (1-2 werkdagen)' : 'Standaard (3-5 werkdagen)';

  await sendEmail(env, {
    from: env.RESEND_FROM_EMAIL,
    to: data.customerEmail,
    subject: `Orderbevestiging ${data.orderNumber} — Eeuwig Hart`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
        <div style="text-align: center; padding: 32px 0 24px;">
          <h1 style="color: #8b7355; font-size: 24px; margin: 0;">Eeuwig Hart</h1>
          <p style="color: #999; margin: 4px 0 0; font-size: 14px;">Een liefdevolle herinnering, voor altijd gevangen in glas</p>
        </div>

        <div style="background: #f9f5f0; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h2 style="color: #8b7355; margin-top: 0; font-size: 18px;">Bedankt voor uw bestelling, ${data.customerName}</h2>
          <p style="margin: 0; color: #555;">
            Wij hebben uw bestelling in goede orde ontvangen en gaan er zorgvuldig mee aan de slag.
            U ontvangt een e-mail zodra uw bestelling verzonden is.
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #e8dfd0;">
            <td style="padding: 12px 0; font-weight: bold; color: #8b7355;">Bestelnummer</td>
            <td style="padding: 12px 0; text-align: right;">${data.orderNumber}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8dfd0;">
            <td style="padding: 12px 0; color: #555;">Product</td>
            <td style="padding: 12px 0; text-align: right;">${data.productName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8dfd0;">
            <td style="padding: 12px 0; color: #555;">Uitvoering</td>
            <td style="padding: 12px 0; text-align: right;">${data.productSubtitle}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8dfd0;">
            <td style="padding: 12px 0; color: #555;">Productprijs</td>
            <td style="padding: 12px 0; text-align: right;">€${data.productPrice.toFixed(2)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8dfd0;">
            <td style="padding: 12px 0; color: #555;">Verzending (${shippingLabel})</td>
            <td style="padding: 12px 0; text-align: right;">${data.shippingPrice === 0 ? 'Gratis' : `€${data.shippingPrice.toFixed(2)}`}</td>
          </tr>
          <tr>
            <td style="padding: 16px 0 0; font-weight: bold; font-size: 18px; color: #8b7355;">Totaal</td>
            <td style="padding: 16px 0 0; text-align: right; font-weight: bold; font-size: 18px; color: #8b7355;">€${data.total.toFixed(2)}</td>
          </tr>
        </table>

        <div style="background: #fff; border: 1px solid #e8dfd0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="color: #8b7355; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Bezorgadres</h3>
          <p style="margin: 0; color: #555; line-height: 1.8;">
            ${data.customerName}<br>
            ${data.address}<br>
            ${data.postalCode} ${data.city}
          </p>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.7;">
          Heeft u vragen over uw bestelling? Neem gerust contact met ons op via
          <a href="mailto:${env.RESEND_FROM_EMAIL}" style="color: #8b7355;">${env.RESEND_FROM_EMAIL}</a>.
          Wij reageren binnen 1 werkdag.
        </p>

        <p style="font-size: 12px; color: #999; margin-top: 32px; border-top: 1px solid #e8dfd0; padding-top: 12px; text-align: center;">
          © Eeuwig Hart — eeuwighart.nl
        </p>
      </div>
    `,
  });
}

export async function sendOrderNotificationToAdmin(env: Env, data: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  total: number;
  address: string;
  postalCode: string;
  city: string;
}): Promise<void> {
  await sendEmail(env, {
    from: env.RESEND_FROM_EMAIL,
    to: env.RESEND_FROM_EMAIL,
    subject: `Nieuwe bestelling ${data.orderNumber} — ${data.customerName}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
        <h2 style="color: #8b7355; border-bottom: 1px solid #e8dfd0; padding-bottom: 12px;">
          Nieuwe websitebestelling
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 130px; color: #8b7355;">Bestelnummer</td>
            <td style="padding: 8px 0;">${data.orderNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8b7355;">Klant</td>
            <td style="padding: 8px 0;">${data.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8b7355;">E-mail</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.customerEmail}" style="color: #8b7355;">${data.customerEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8b7355;">Product</td>
            <td style="padding: 8px 0;">${data.productName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8b7355;">Totaal</td>
            <td style="padding: 8px 0; font-weight: bold;">€${data.total.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8b7355;">Adres</td>
            <td style="padding: 8px 0;">${data.address}, ${data.postalCode} ${data.city}</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #999; margin-top: 32px; border-top: 1px solid #e8dfd0; padding-top: 12px;">
          Binnengekomen via eeuwighart.nl
        </p>
      </div>
    `,
  });
}
