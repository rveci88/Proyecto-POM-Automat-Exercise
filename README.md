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
