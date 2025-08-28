import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectDescription } = body;

    // Validación básica
    if (!name || !email || !projectDescription) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Dominio sandbox de Resend
      to: ['camilo.castillo88@outlook.com'], // Tu email personal
      subject: `💼 Nuevo mensaje de contacto de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header { 
                background: linear-gradient(135deg, #7E4AE7, #462981); 
                color: white; 
                padding: 30px; 
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content { 
                background: #f8f9fa; 
                padding: 30px; 
                border-radius: 0 0 10px 10px;
                border: 1px solid #e9ecef;
              }
              .info-item { 
                background: white; 
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 8px;
                border-left: 4px solid #7E4AE7;
              }
              .label { 
                font-weight: bold; 
                color: #7E4AE7; 
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 1px;
              }
              .value { 
                margin-top: 5px; 
                font-size: 16px;
              }
              .project-description {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e9ecef;
                margin-top: 15px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding: 20px;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📧 Nuevo Mensaje de Contacto</h1>
              <p>Alguien está interesado en trabajar contigo</p>
            </div>
            
            <div class="content">
              <div class="info-item">
                <div class="label">👤 Nombre</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="info-item">
                <div class="label">📧 Email</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #7E4AE7; text-decoration: none;">
                    ${email}
                  </a>
                </div>
              </div>
              
              <div class="info-item">
                <div class="label">💼 Descripción del Proyecto</div>
                <div class="project-description">
                  ${projectDescription.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>Este mensaje fue enviado desde tu portafolio web</p>
              <p>
                <a href="https://camilocastillo.dev" style="color: #7E4AE7;">
                  camilocastillo.dev
                </a>
              </p>
            </div>
          </body>
        </html>
      `,
      // También enviar versión de texto plano
      text: `
Nuevo mensaje de contacto

Nombre: ${name}
Email: ${email}

Descripción del proyecto:
${projectDescription}

---
Enviado desde tu portafolio web
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Email enviado exitosamente',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
