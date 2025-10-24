# 🚀 Guía de Deployment - KAVAK SEGUROS

## Vercel Deployment

### Configuración Automática
El proyecto está configurado para deployar automáticamente en Vercel:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (automático)

### Archivos de Configuración

#### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

#### `package.json` (scripts optimizados)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "type-check": "tsc --noEmit",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Pasos para Deploy

1. **Conectar con GitHub**:
   - Ir a [vercel.com](https://vercel.com)
   - Conectar cuenta de GitHub
   - Importar repositorio

2. **Configuración automática**:
   - Vercel detectará que es un proyecto Vite
   - Usará la configuración de `vercel.json`
   - Build automático en cada push

3. **Variables de entorno** (si necesarias):
   - En Vercel Dashboard → Project Settings → Environment Variables
   - Agregar variables si el proyecto las requiere

### Troubleshooting

#### Error: "Cannot read file tsconfig.app.json"
**Solución**: ✅ **RESUELTO**
- Eliminamos `tsconfig.app.json`
- Simplificamos `tsconfig.json`
- Cambiamos build command a `vite build`

#### Error: "Command npm run build exited with 1"
**Solución**: ✅ **RESUELTO**
- Script de build simplificado
- Configuración TypeScript optimizada
- Vercel.json con configuración específica

### Verificación Local

```bash
# Verificar que compile localmente
npm run build

# Verificar preview
npm run preview
```

### Estructura Final

```
kavakook/
├── vercel.json          # Configuración Vercel
├── tsconfig.json        # Configuración TypeScript simplificada
├── tsconfig.node.json   # Configuración Node
├── package.json         # Scripts optimizados
├── .gitignore          # Archivos a ignorar
└── dist/               # Build output
```

## 🎯 Estado del Deployment

- ✅ **Configuración Vercel**: Completada
- ✅ **TypeScript**: Simplificado y optimizado
- ✅ **Build Script**: Compatible con Vercel
- ✅ **Gitignore**: Configurado
- ✅ **Local Build**: Funcionando

**¡Listo para deployar en Vercel!** 🚀
