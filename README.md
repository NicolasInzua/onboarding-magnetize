# Gestor de Notas Persistente con JSONBin

## Overview

Este proyecto es una aplicación web simple construida con React para gestionar una lista de notas personales. Permite a los usuarios ver, añadir, editar y eliminar notas. Toda la información se persiste utilizando [JSONBin.io](https://jsonbin.io/) como backend de almacenamiento JSON simple.

El objetivo principal de este proyecto fue servir como un ejercicio práctico y de aprendizaje (onboarding) para profundizar en tecnologías específicas del ecosistema React/Redux, especialmente en el manejo de estado asíncrono y mutaciones con RTK Query.

## Tecnologías Utilizadas

Este proyecto está construido utilizando las siguientes tecnologías principales:

* **React:** 
* **TypeScript:** 
* **Redux Toolkit (RTK):** Para la gestión de estado en React con Redux.
    * **RTK Query:** Utilizado para todo el manejo de la comunicación con la API de JSONBin.io, incluyendo fetching de datos, caching automático, y manejo de mutaciones (Crear, Actualizar, Eliminar notas) con invalidación de caché y refetching automático (`providesTags`/`invalidatesTags`).
    * **Slices:** Potencialmente para manejar algún estado de UI global no relacionado directamente con el servidor.
* **Webpack:** Utilizado como bundler principal para empaquetar los módulos de la aplicación (JS, CSS, etc.) para el navegador.
* **Babel:** Utilizado para transpilar código JavaScript moderno (y TypeScript, si se configura) a una versión compatible con la mayoría de los navegadores.
* **Jest / Vitest & Testing Library:** Para escribir y ejecutar tests unitarios y de integración para componentes, hooks y lógica de estado.
* **JSONBin.io API:** Utilizada como backend simple para persistir los datos de las notas en formato JSON.
* **ESLint / Prettier:** Para linting y formateo de código, asegurando la calidad y consistencia.
* **(Opcional Avanzado) Webpack Module Federation:** Explorado como una forma de estructurar la aplicación en micro-frontends.

## Configuración

Para ejecutar este proyecto localmente, necesitarás:

1.  Clonar el repositorio.
2.  Instalar las dependencias (`npm install` o `yarn install`).
3.  Crear una cuenta en [JSONBin.io](https://jsonbin.io/).
4.  Crear un Bin vacío en JSONBin.io y obtener su **Bin ID**.
5.  Obtener tu **API Key** de JSONBin.io (`X-Master-Key` o `X-Access-Key`).
6.  Crear un archivo `.env` en la raíz del proyecto y añadir tus credenciales:
    ```
    VITE_JSONBIN_API_KEY=TU_API_KEY_AQUI
    VITE_JSONBIN_BIN_ID=TU_BIN_ID_AQUI
    ```
    *(Asegúrate de que `.env` esté en tu `.gitignore`)*
7.  Iniciar el servidor de desarrollo (`npm run dev` o `yarn dev`).
