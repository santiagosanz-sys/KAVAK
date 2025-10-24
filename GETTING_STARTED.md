# 🚀 Guía de Inicio Rápido - KAVAK SEGUROS

## Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <repository-url>
cd kavakook

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## 🎯 Cómo Usar la Aplicación

### 1. Landing Page
- Abrí la aplicación en tu navegador
- Seleccioná tu país (Argentina 🇦🇷 o Chile 🇨🇱)
- Hacé clic en "Cotizar ahora"

### 2. Registro/Login
- Si es tu primera vez, hacé clic en "Registrate acá"
- Completá el formulario con:
  - Nombre completo
  - Email
  - Contraseña
  - País
- O si ya tenés cuenta, ingresá con tu email y contraseña

**Nota:** La autenticación es mockeada, cualquier email/contraseña funcionará.

### 3. Cotizador (Wizard de 3 pasos)

#### Paso 1: Datos del Vehículo
- **Año**: Seleccioná el año de tu auto (2008-2025)
- **Marca**: Elegí la marca del vehículo
- **Modelo**: Seleccioná el modelo (se filtra según la marca)
- **Versión**: Ingresá la versión (ej: "1.6 GLX")
- **Kilometraje**: Ingresá los kilómetros recorridos
- **Uso**: Seleccioná si es particular o comercial
- **VIN** (opcional): Número de serie del vehículo

#### Paso 2: Datos del Conductor
- **Nombre completo**: Tu nombre
- **Edad**: Debe ser mayor de 18 años
- **Género**: Seleccioná tu género
- **Código postal**: Tu código postal
- **Número de licencia**: Tu número de licencia de conducir
- **Siniestros**: Indicá si tuviste siniestros en los últimos 3 años
  - Si respondés "Sí", indicá la cantidad

#### Paso 3: Tipo de Cobertura
Seleccioná las coberturas que necesitás:
- ✅ **Responsabilidad civil** (obligatorio)
- **Daños materiales**
- **Robo total y parcial**
- **Gastos médicos**
- **Cristales**
- **Asistencia vial 24/7**

### 4. Resultados
Verás 3 opciones de aseguradoras:
- 🛡️ **SegurosPro** - Premium (más caro, más coberturas)
- 🚗 **AutoSeguro** - Económico (más barato, coberturas básicas)
- ⭐ **Kavak Seguros** - Balanceado (recomendado)

Cada card muestra:
- Precio mensual y anual
- Coberturas incluidas
- Características especiales

Hacé clic en "Contratar" para continuar.

### 5. Checkout
- Revisá el resumen de tu seguro
- Seleccioná método de pago (tarjeta de crédito o débito)
- Los campos de pago están deshabilitados (es mock)
- Hacé clic en "Confirmar compra"

### 6. Éxito
- Verás tu número de póliza generado
- Podés "descargar" la póliza (mock)
- Hacer una nueva cotización

## 💡 Datos de Prueba

### Marcas y Modelos Disponibles
- **Toyota**: Corolla, Hilux, Etios, Yaris, RAV4, Camry
- **Volkswagen**: Gol, Polo, Vento, Amarok, Tiguan, Golf
- **Ford**: Focus, Fiesta, Ranger, EcoSport, Ka, Mondeo
- **Chevrolet**: Onix, Cruze, S10, Tracker, Spin, Prisma
- Y muchas más...

### Ejemplos de Cotización

#### Cotización Económica
- Año: 2015
- Marca: Chevrolet
- Modelo: Onix
- Kilometraje: 80000
- Uso: Particular
- Edad: 35 años
- Sin siniestros
- Solo responsabilidad civil

#### Cotización Premium
- Año: 2023
- Marca: Toyota
- Modelo: Corolla
- Kilometraje: 15000
- Uso: Particular
- Edad: 28 años
- Sin siniestros
- Todas las coberturas

## 🎨 Características del MVP

✅ Selector de país (Argentina/Chile)
✅ Autenticación básica (mock)
✅ Wizard multi-paso con validación
✅ Comparación de 3 aseguradoras
✅ Algoritmo de cálculo de precios
✅ Diseño responsive
✅ Animaciones y transiciones
✅ Estados de carga
✅ Manejo de errores

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Preview del build

# Linting
npm run lint         # Ejecuta ESLint
```

## 📱 Responsive

La aplicación está optimizada para:
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de compilación
```bash
# Limpiar cache de Vite
rm -rf dist .vite
npm run build
```

### Estilos no se aplican
- Verificá que Tailwind esté configurado correctamente
- Revisá que el archivo `index.css` esté importado en `main.tsx`

## 📞 Soporte

Para cualquier consulta o problema:
- 📧 Email: ayuda@kavakseguros.com
- 📞 Teléfono: 0800-123-4567

---

¡Disfrutá cotizando tu seguro con KAVAK SEGUROS! 🚗💙

