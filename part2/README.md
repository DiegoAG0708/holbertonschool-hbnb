HBnB Project – Part 2  
Implementation of Business Logic and API Endpoints

📌 Descripción
En esta parte del proyecto HBnB se inicia la fase de implementación de la aplicación, basada en el diseño realizado en la Parte 1. El enfoque está en construir las capas de Presentación y Lógica de Negocio utilizando Python y Flask, implementando la funcionalidad principal mediante clases, métodos y endpoints que servirán como base para la operación de la aplicación.

En esta etapa se crean las estructuras del proyecto, las clases que definen la lógica de negocio y los endpoints de la API. El objetivo es dar vida a la arquitectura documentada, configurando funcionalidades clave como la creación y gestión de usuarios, lugares, reseñas y amenities, siguiendo buenas prácticas de diseño de APIs.

🎯 Objetivos
- Configurar la estructura del proyecto  
  - Organizar el proyecto en una arquitectura modular.  
  - Crear paquetes para las capas de Presentación y Lógica de Negocio.  

- Implementar la Lógica de Negocio 
  - Desarrollar las clases principales: `User`, `Place`, `Review`, `Amenity`.  
  - Definir relaciones entre entidades y su interacción.  
  - Aplicar el patrón **Facade** para simplificar la comunicación entre capas.  

- Construir Endpoints RESTful
  - Implementar endpoints CRUD para Usuarios, Lugares, Reseñas y Amenities.  
  - Usar flask-restx para definir y documentar la API.  
  - Implementar serialización de datos para incluir atributos extendidos (ejemplo: al obtener un `Place`, incluir datos del propietario y amenities relacionados).  

- Probar y validar la API
  - Verificar que cada endpoint funcione correctamente y maneje casos límite.  
  - Usar herramientas como Postman o cURL para pruebas.  

---
 🏗️ Alcance del Proyecto
- Capa de Presentación: Definición de servicios y endpoints con Flask y flask-restx.  
- Capa de Lógica de Negocio: Construcción de modelos y lógica que impulsan la funcionalidad.  
- Persistencia: En esta parte se usa un repositorio en memoria. La integración con base de datos (SQLAlchemy) se hará en la Parte 3.  

---

📚 Objetivos de Aprendizaje
- Diseño modular y arquitectura: estructurar aplicaciones Python con separación de responsabilidades.  
- Desarrollo de APIs con Flask y flask-restx: crear endpoints RESTful bien documentados y escalables.  
- Implementación de lógica de negocio: traducir diseños documentados en código funcional y mantenible.  
- Serialización de datos: manejar atributos extendidos y relaciones en respuestas de la API.  
- Pruebas y depuración: validar endpoints y asegurar respuestas correctas.

Resultado esperado:  
Un proyecto organizado, con separación clara de capas, un repositorio en memoria funcional y una aplicación Flask lista para integrar endpoints y lógica.
