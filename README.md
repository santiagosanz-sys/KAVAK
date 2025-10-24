# KAVAK SEGUROS - MVP

Broker de seguros de auto para Argentina y Chile.

## 🚀 Características

- **Cotización rápida**: Obtén cotizaciones en menos de 3 minutos
- **Comparación de aseguradoras**: Comparamos múltiples opciones para encontrar la mejor
- **Multi-país**: Soporte para Argentina y Chile
- **Wizard intuitivo**: Proceso paso a paso para cotizar tu seguro
- **Responsive**: Diseño optimizado para mobile y desktop

## 🛠️ Stack Tecnológico

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **React Router v6** - Navegación
- **Zustand** - Estado global
- **React Hook Form** + **Zod** - Formularios y validación
- **React Query** - Cache y estado del servidor

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes reutilizables
│   ├── layout/          # Layouts (Navbar, Footer, etc.)
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Quote/
│   │   ├── Steps/       # Pasos del wizard
│   │   └── QuoteWizard.tsx
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Results.tsx
│   ├── Checkout.tsx
│   └── Success.tsx
├── services/
│   └── mockApi.ts       # API mockeada
├── store/
│   ├── authStore.ts     # Estado de autenticación
│   └── quoteStore.ts    # Estado del cotizador
├── types/
│   └── index.ts         # Tipos TypeScript
├── utils/
│   ├── formatters.ts    # Funciones de formateo
│   └── mockData.ts      # Datos mock
├── App.tsx
└── main.tsx
```

## 🎨 Design System

### Colores

- **Azul principal**: `#2B5FCC`
- **Azul claro**: `#4A90E2`
- **Verde agua**: `#7DD3C0`

### Tipografía

- **Fuente**: Inter (Google Fonts)

## 🔐 Autenticación

La autenticación está mockeada y usa `localStorage` para persistir la sesión.

### Credenciales de prueba

Cualquier email y contraseña funcionará (es mock).

## 📱 Flujo de Usuario

1. **Landing Page**: Selección de país (Argentina/Chile)
2. **Registro/Login**: Autenticación básica
3. **Cotizador (Wizard)**:
   - Paso 1: Datos del vehículo
   - Paso 2: Datos del conductor
   - Paso 3: Selección de coberturas
4. **Resultados**: Comparación de 3 aseguradoras
5. **Checkout**: Confirmación de compra
6. **Éxito**: Número de póliza y próximos pasos

## 🏢 Aseguradoras Mock

1. **SegurosPro** - Premium (30% más caro)
2. **AutoSeguro** - Económico (15% más barato)
3. **Kavak Seguros** - Balanceado (recomendado)

## 💰 Cálculo de Precios

El algoritmo de precios considera:

- Año del vehículo
- Kilometraje
- Uso (particular/comercial)
- Edad del conductor
- Historial de siniestros
- Coberturas seleccionadas
- País (Chile es ~20% más caro)

## 🌐 Internacionalización

- **Argentina**: Precios en ARS, formato argentino
- **Chile**: Precios en CLP, formato chileno

## 📝 Notas de Implementación

- Todas las APIs están mockeadas con delays simulados (500-1500ms)
- Los datos se guardan en el estado global con Zustand
- La autenticación persiste en localStorage
- Validación exhaustiva en cada paso del wizard
- Manejo de errores con mensajes amigables

## 🚧 Próximas Mejoras

- [ ] Integración con APIs reales
- [ ] Dashboard de usuario
- [ ] Gestión de pólizas activas
- [ ] Reporte de siniestros
- [ ] Notificaciones por email
- [ ] Más tipos de seguros (vida, hogar, etc.)

## 📄 Licencia

© 2024 KAVAK SEGUROS. Todos los derechos reservados.
# KAVAK-Seguros
