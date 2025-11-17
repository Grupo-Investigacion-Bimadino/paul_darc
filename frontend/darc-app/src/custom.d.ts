// src/custom.d.ts

// Esto le dice a TypeScript que cualquier import que termine en .json es válido
// y que su contenido por defecto es de tipo 'any'.
declare module "*.json" {
    const value: any;
    export default value;
  }