# 📧 Configuración del Envío de Emails

## 🚀 Pasos para Configurar Resend

### 1. Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Obtener API Key
1. Ve a [API Keys](https://resend.com/api-keys)
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "Portfolio Contact Form")
4. Copia la API key generada

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Tu email personal donde recibirás los mensajes
CONTACT_EMAIL=camilo.castillo88@outlook.com
```

### 4. Configurar Dominio (Opcional pero Recomendado)

#### Para usar tu propio dominio:
1. Ve a [Domains](https://resend.com/domains) en Resend
2. Agrega tu dominio (ej: `camilocastillo.dev`)
3. Configura los registros DNS que te proporcionen
4. Una vez verificado, actualiza el archivo `route.ts`:

```typescript
from: 'Portfolio Contact <contact@camilocastillo.dev>', // Tu dominio
```

#### Si no tienes dominio propio:
- Usa el dominio sandbox de Resend
- Cambia en `route.ts`:

```typescript
from: 'Portfolio Contact <onboarding@resend.dev>',
```

### 5. Deploy en Vercel

1. Sube tu código a GitHub
2. Conecta el repo en Vercel
3. En la configuración del proyecto en Vercel:
   - Ve a "Settings" > "Environment Variables"
   - Agrega `RESEND_API_KEY` con tu API key
   - Agrega `CONTACT_EMAIL` con tu email

### 6. Verificar Funcionamiento

1. Ve a tu formulario de contacto
2. Envía un mensaje de prueba
3. Revisa tu email para confirmar que llegó

## 📝 Límites de la Cuenta Gratuita

- **3,000 emails/mes**
- **100 emails/día**
- Solo puedes enviar desde dominios verificados o sandbox

## 🛠️ Troubleshooting

### Error: "Domain not verified"
- Verifica que tu dominio esté correctamente configurado en Resend
- Usa el dominio sandbox mientras configuras el tuyo

### Error: "API key invalid"
- Verifica que la API key esté correcta en las variables de entorno
- Asegúrate de que no tenga espacios extra

### No llegan los emails
- Revisa la carpeta de spam
- Verifica que la dirección de envío esté en dominios permitidos

## 🔧 Desarrollo Local

Para probar en desarrollo local:

1. Instala las dependencias: `npm install`
2. Configura `.env.local`
3. Ejecuta: `npm run dev`
4. Ve a `http://localhost:3000/contact-us`

## 🎨 Personalización

Puedes personalizar el template del email editando el HTML en `src/app/api/contact/route.ts`.

El email incluye:
- ✅ Diseño responsive
- ✅ Branding con tus colores
- ✅ Información del contacto organizada
- ✅ Enlaces directos para responder
