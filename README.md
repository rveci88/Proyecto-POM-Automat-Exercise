Plataforma E-commerce Automation Exercices  Testing con Playwright
Descripción

Este proyecto contiene pruebas automatizadas end-to-end para una aplicación web de comercio 
electrónico utilizando Playwright. El objetivo es validar los flujos principales del usuario y garantizar 
la estabilidad de la aplicación mediante integración continua.

Alcance

La automatización cubre las funcionalidades más críticas de la aplicación:

Inicio de sesión (login)
Búsqueda de productos
Agregar productos al carrito
Eliminar productos del carrito
Flujo de compra (checkout)


Tecnologías utilizadas
Playwright (TypeScript)
Node.js
GitHub Actions para CI/CD


Estructura del proyecto
project-root/
│
├── tests/
│   ├── login.spec.ts
│   ├── search.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│
├── utils/
│   ├── test-data.ts
│   ├── helpers.ts
│
├── playwright.config.ts
├── package.json
└── README.md


Escenarios de prueba

Login
Inicio de sesión con credenciales válidas
Inicio de sesión con credenciales inválidas
Validación de campos vacíos

Búsqueda
Búsqueda de productos existentes
Búsqueda de productos inexistentes
Validación de resultados de búsqueda

Carrito
Agregar producto al carrito
Eliminar producto del carrito
Actualizar cantidad de productos

Checkout
Completar compra con datos válidos
Validación de campos obligatorios
Confirmación de orden
Configuración

El proyecto está configurado para ejecutar automáticamente las pruebas en cada push o pull request usando GitHub Actions.

Archivo de workflow

Crear el siguiente archivo:

.github/workflows/playwright.yml
Configuración del pipeline
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout del repositorio
      uses: actions/checkout@v4

    - name: Configurar Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Instalar dependencias
      run: npm install

    - name: Instalar navegadores de Playwright
      run: npx playwright install --with-deps

    - name: Ejecutar pruebas
      run: npx playwright test


Buenas prácticas implementadas:
Page Object Model (POM)
Datos de prueba reutilizables
Separación de responsabilidades
Estructura escalable y mantenible
Mejoras futuras
Integración con pruebas de API
Pruebas de rendimiento
Reportes de ejecución (Allure o HTML)
Ejecución paralela optimizada
Autor

Lic. Rafael Veci Aguilar, QA con experiencia en testing manual y automatizado utilizando Playwright, validación de APIs y consultas a bases de datos.
