# Proyecto Final

Este proyecto es una aplicación web diseñada para gestionar productos, carritos de compra y procesos relacionados con comercio electrónico. Se realizó inspirado en la página [Sponsor Dios](https://www.sponsordios.shop/), que es la tienda de ropa del artista YSY A. A continuación, se detalla la funcionalidad de los principales archivos y directorios del proyecto.

## Contenido del Proyecto

### HTML
Define las páginas principales de la aplicación:
- **Página principal (`index.html`)**: Presenta el inicio del sitio con enlaces y una vista general.
- **Productos (`productos.html`)**: Muestra una lista de productos disponibles con detalles como precio e imágenes.
- **Formulario de contacto (`contacto.html`)**: Permite a los usuarios enviar mensajes o consultas.
- **Patrocinadores (`sponsorDios.html`)**: Página dedicada a los patrocinadores del proyecto.

### SCSS
Los archivos SCSS contienen los estilos organizados y reutilizables:
- `scss/styles.scss`: Estilos globales del proyecto.
- Archivos específicos para cada página, como `styles-cambios.scss`, `styles-compra.scss`, `styles-contacto.scss`, etc.

### CSS
Los estilos compilados de SCSS se encuentran en el directorio `css/`. Ejemplo:
- `css/styles.css`: Estilos principales.
- `css/styles-productos.css`: Estilos específicos para la página de productos.

### JavaScript
Los scripts están diseñados para manejar la funcionalidad interactiva de la aplicación:
- `js/productos.js`: Maneja la lógica de la página de productos.
- `js/carrito.js`: Gestión del carrito de compras.
- `js/confirmacion.js`: Acciones relacionadas con la confirmación de compra.
- `js/contacto.js`: Validaciones del formulario de contacto.
- `js/alerta.js`: Módulo para mostrar alertas personalizadas.

### JSON
- `json/productos.json`: Datos de productos, incluidos nombres, precios y descripciones.

### Imágenes
Las imágenes utilizadas en la aplicación se encuentran en `img/` e incluyen logos, banners y productos.

### Dependencias y Configuración
- `package.json`: Lista de dependencias y configuración del proyecto.
- `package-lock.json`: Control de versiones específicas de dependencias.

🚀 *¡Gracias por visitar este proyecto!*
