import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

interface EmailData {
  to: string;
  userName?: string;
  offerName: string;
  price: number;
  period: string;
  policyNumber: string;
  features: string[];
  vehicleData: any;
  addressData?: any;
}

export const sendQuoteEmail = async (data: EmailData): Promise<void> => {
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu Cotización KAVAK SEGUROS</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; background-color: #f5f5f5; padding: 20px 0;">
        <tr>
          <td align="center">
            <table role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #007AFF 0%, #00D4FF 100%); padding: 30px 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">KAVAK SEGUROS</h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">Tu cotización está lista</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #333333; margin-top: 0;">¡Hola${data.userName ? ` ${data.userName}` : ''}! 🚗</h2>
                  <p style="color: #666666; line-height: 1.6;">
                    Gracias por elegir KAVAK SEGUROS. Tu cotización personalizada está lista:
                  </p>
                  
                  <!-- Offer Details -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #007AFF; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <h3 style="color: #007AFF; margin-top: 0;">${data.offerName}</h3>
                    <p style="font-size: 36px; font-weight: bold; color: #333333; margin: 10px 0;">
                      ${data.price.toLocaleString('es-AR')} <span style="font-size: 18px; color: #666666;">/${data.period}</span>
                    </p>
                  </div>
                  
                  <!-- Policy Number -->
                  <div style="background-color: #ffffff; border: 1px solid #e0e0e0; padding: 15px; margin: 30px 0; border-radius: 4px;">
                    <p style="color: #666666; font-size: 14px; margin: 0 0 5px 0;">Número de Póliza</p>
                    <p style="font-family: monospace; font-size: 16px; font-weight: bold; color: #333333; margin: 0;">
                      ${data.policyNumber}
                    </p>
                  </div>
                  
                  <!-- Coverages -->
                  <div style="margin: 30px 0;">
                    <h3 style="color: #333333; margin-bottom: 15px;">Coberturas incluidas:</h3>
                    <ul style="color: #666666; line-height: 1.8; padding-left: 20px;">
                      ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                  </div>

                  <!-- Vehicle Details -->
                  <div style="background-color: #f8f9fa; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <h3 style="color: #333333; margin-top: 0; margin-bottom: 15px;">📋 Información del vehículo</h3>
                    <table style="width: 100%; color: #666666;">
                      ${data.vehicleData.year ? `<tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Año:</td><td style="padding: 5px 0;">${data.vehicleData.year}</td></tr>` : ''}
                      ${data.vehicleData.brand ? `<tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Marca:</td><td style="padding: 5px 0;">${data.vehicleData.brand}</td></tr>` : ''}
                      ${data.vehicleData.model ? `<tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Modelo:</td><td style="padding: 5px 0;">${data.vehicleData.model}</td></tr>` : ''}
                      ${data.vehicleData.version ? `<tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Versión:</td><td style="padding: 5px 0;">${data.vehicleData.version}</td></tr>` : ''}
                      ${data.vehicleData.mileage ? `<tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Kilometraje:</td><td style="padding: 5px 0;">${data.vehicleData.mileage.toLocaleString()} km</td></tr>` : ''}
                      ${data.addressData?.address ? `<tr><td style="padding: 5px 0; font-weight: bold; color: #333;">Dirección:</td><td style="padding: 5px 0;">${data.addressData.address}, ${data.addressData.postalCode}</td></tr>` : ''}
                    </table>
                  </div>
                  
                  <!-- CTA -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="https://kavakseguros.com" style="display: inline-block; background-color: #007AFF; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold;">
                      Ver más detalles
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center;">
                  <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">
                    KAVAK SEGUROS - Protegiendo tu inversión
                  </p>
                  <div style="margin: 15px 0;">
                    <p style="color: #666666; margin: 5px 0; font-size: 13px;">
                      📞 Llamanos: 0800-123-KAVAK
                    </p>
                    <p style="color: #666666; margin: 5px 0; font-size: 13px;">
                      💬 WhatsApp: +54 9 11 1234-5678
                    </p>
                    <p style="color: #666666; margin: 5px 0; font-size: 13px;">
                      📧 Email: seguros@kavak.com
                    </p>
                  </div>
                  <p style="color: #999999; margin: 15px 0 0 0; font-size: 12px;">
                    Esta es una cotización automática. Para más información, contactá a nuestro equipo.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'KAVAK SEGUROS <noreply@kavakseguros.com>',
      to: data.to,
      subject: `Tu Cotización ${data.offerName} - KAVAK SEGUROS`,
      html: emailHtml,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('No se pudo enviar el email');
  }
};

