# Documentación del Sitio Web — Bravd Studios
**Versión:** 2.0  
**Fecha:** Abril 2026  
**Desarrollado con:** HTML, CSS y JavaScript  
**Repositorio:** https://github.com/Zzzono/blog_frases_dev

---

## ¿Qué es este proyecto?

**Bravd Studios** es un sitio web de comercio electrónico (tienda en línea) para una empresa de impresión de camisas con tecnología DTF (Direct to Film). El sitio permite a los clientes:

- Ver los diseños de camisas disponibles
- Seleccionar productos y agregarlos a un carrito de compras
- Completar su pedido enviando los detalles por WhatsApp

> En términos simples: es la vitrina digital de Bravd Studios, donde la gente puede ver, escoger y ordenar sus camisas personalizadas desde su celular o computadora.

---

## Estructura de Archivos

```
dtf-camisas-web/
│
├── index.html          → Página principal (inicio)
├── nosotros.html       → Página "Acerca de nosotros"
├── servicios.html      → Página de servicios y precios
├── checkout.html       → Página de finalización de compra
├── styles.css          → Todos los estilos visuales del sitio
├── script.js           → Toda la lógica e interactividad del sitio
│
└── assets/             → Carpeta de imágenes
    ├── logo1.png           → Logo oficial de Bravd Studios
    ├── foto1.jpg ... foto10.jpg  → Galería de trabajos realizados
    ├── product-individual.png   → Imagen del paquete individual
    ├── product-corporate.png    → Imagen del paquete corporativo
    ├── product-pack.png         → Imagen del paquete mayoreo
    └── spot-*.jpg          → 20 imágenes de mockups de la colección SPOT
```

---

## Tecnologías Utilizadas

| Tecnología | ¿Qué es? | ¿Para qué se usa aquí? |
|---|---|---|
| **HTML** | El esqueleto de la página | Define la estructura: menú, secciones, botones |
| **CSS** | El diseño visual | Colores, tipografías, animaciones, diseño responsivo |
| **JavaScript** | La lógica e interactividad | Carrito de compras, filtros, modales, cálculo de precios |
| **Git + GitHub** | Control de versiones | Guarda el historial de cambios y aloja el código en la nube |
| **Google Fonts (Outfit)** | Tipografía | La fuente de letras moderna usada en todo el sitio |

---

## Páginas del Sitio

### 1. Página Principal (`index.html`)

Es la página de entrada. Contiene todas las secciones principales:

#### a) Barra de Navegación (Navbar)
- Logo de Bravd Studios en la esquina superior izquierda
- Links de navegación: **Inicio**, **Nosotros**, **Servicios & Precios**, **SPOT**
- Ícono del carrito de compras con contador de artículos
- En dispositivos móviles: menú hamburguesa (las tres rayitas)

#### b) Hero (Pantalla de Bienvenida)
- Título principal animado: *"Camisas Originales"*
- Subtítulo descriptivo del servicio
- Dos botones: "Ver Precios" y "Conócenos"
- Fondo con el logo de Bravd como marca de agua decorativa

#### c) Sección de Estadísticas
- Contadores animados que muestran números clave del negocio
- Se activan automáticamente cuando el usuario hace scroll hasta ellos

#### d) Nuestros Paquetes (Productos)
Muestra tres opciones de compra con sus precios:

| Paquete | Precio | Descripción |
|---|---|---|
| Camisa Personal | C$ 500 | 1-2 camisas, diseño único |
| Pack Equipo (3+) | C$ 400 | 3-11 camisas, diseños variados |
| Pack Mayoreo (12+) | C$ 350 | 12 o más camisas |

Cada paquete tiene un botón **"Agregar 1 Camisa"** que añade el producto al carrito.

#### e) Galería de Trabajos
- 10 fotografías de trabajos reales realizados por Bravd Studios
- Al hacer clic en una imagen se abre en tamaño completo (lightbox)
- Permite navegar entre imágenes con flechas

#### f) Sección SPOT — Colección Bravd
*(Sección nueva — ver detalle más abajo)*

#### g) Sección CTA (Llamado a la Acción)
- Texto motivador para impulsar al cliente a ordenar
- Botón directo a WhatsApp para contacto inmediato

#### h) Sección de Testimonios
- Comentarios de clientes satisfechos con calificación de estrellas

#### i) Preguntas Frecuentes (FAQ)
- Acordeón interactivo con las preguntas más comunes
- Al hacer clic en una pregunta, se despliega la respuesta

#### j) Pie de Página (Footer)
- Logo, links de navegación y derechos reservados

---

### 2. Sección SPOT — Colección Bravd

Esta es la galería de mockups (diseños preestablecidos) disponibles para ordenar. Contiene **20 diseños** de camisas impresas con DTF.

**Características:**

**Filtros por categoría:** El cliente puede filtrar los diseños por tipo:
- Todos
- Religiosa (ej: San Judas Tadeo)
- Música (ej: Guns N' Roses, Madonna)
- Deportes (ej: Jordan, LeBron, NCAA)
- Lifestyle (ej: Yamaha, Anti Social Club)
- Artistas (ej: Natanael Cano, Nata Montana)

**Tarjetas de producto:** Cada diseño tiene:
- Foto del mockup (camisa con el diseño puesto)
- Badge de disponibilidad ("DISPONIBLE" o "NEW DROP" en rojo para lanzamientos)
- Nombre del diseño
- Descripción breve
- Chips informativos: material y tallas disponibles
- Precio: **C$ 500**
- Botón **"+ Carrito"** para agregar directamente

**Quick View (Vista Rápida):** Al pasar el mouse sobre una tarjeta aparece un botón "Ver diseño". Al hacer clic se abre un modal (ventana emergente) con:
- La imagen del diseño en tamaño grande
- Nombre y descripción
- Precio
- Selector de talla (S, M, L, XL, XXL)
- Botón "Agregar al Carrito"

**Lista de los 20 diseños disponibles:**
1. San Judas Tadeo
2. Guns N' Roses
3. Club Hípico Cayanl Ipe
4. NCAA Regional Champ
5. Colección Íconos #28
6. Anti Social Sad Boyz (Mariposas)
7. Nata Montana (Cadena)
8. Sadboys El Angel Azul
9. Anti Social Social Club (Dragón)
10. Sad Boyz Rosas
11. Natanael Cano (Rojo)
12. Madonna Flow Rockstar
13. Natanael Cano Collage
14. Natanael Tumbado Tour
15. Natanael LA Dodgers
16. Nata Montana Firma
17. Jordan #23 Bulls
18. LeBron James Lakers
19. Yamaha Motocross Life
20. Michael Jordan 6 Rings

---

### 3. Página de Servicios (`servicios.html`)

Explica en detalle los servicios ofrecidos, el proceso de impresión DTF y las opciones disponibles. Incluye una calculadora de precio interactiva donde el cliente puede estimar el costo de su pedido.

### 4. Página Nosotros (`nosotros.html`)

Presenta la historia, misión y equipo de Bravd Studios.

### 5. Página de Checkout (`checkout.html`)

Es donde el cliente finaliza su compra. Contiene:
- **Resumen del pedido:** lista todos los productos en el carrito con precios
- **Indicador de tier:** muestra el precio por camisa según la cantidad
- **Formulario de contacto:** nombre, teléfono, dirección de entrega y notas
- **Botón de WhatsApp:** genera automáticamente un mensaje con todos los detalles del pedido y lo abre en WhatsApp

---

## Sistema de Carrito de Compras

El carrito es el corazón de la tienda. Funciona completamente en el navegador del cliente (sin necesidad de servidor).

### ¿Cómo funciona?

1. El cliente hace clic en "Agregar al Carrito" en cualquier producto
2. El ítem se guarda en la memoria del navegador (localStorage)
3. El ícono del carrito muestra el número de artículos con una animación
4. Se puede abrir el carrito desde cualquier página haciendo clic en el ícono
5. Dentro del carrito se puede: aumentar cantidad, disminuir o eliminar ítems
6. El total se recalcula automáticamente

### Sistema de Precios Dinámicos por Volumen

El precio por camisa **baja automáticamente** según la cantidad total en el carrito:

| Cantidad total en carrito | Precio por camisa |
|---|---|
| 1 – 2 camisas | **C$ 500** |
| 3 – 11 camisas | **C$ 400** |
| 12 o más camisas | **C$ 350** |

**Regla importante:** El sistema siempre aplica el precio *más conveniente* para el cliente. Si ya agregaste un producto de Pack Mayoreo (C$ 350), ese precio no sube aunque el total sea menor a 12 unidades.

**Indicadores en el carrito:**
- Si estás en tier de C$ 500: te avisa cuántas camisas más necesitas para bajar a C$ 400
- Si estás en tier de C$ 400: te avisa cuántas más necesitas para bajar a C$ 350
- Si ya estás en el mejor precio: muestra confirmación del tier activo

### Flujo de Pago

El sitio no procesa pagos con tarjeta directamente. El proceso es:

1. Cliente agrega productos al carrito
2. Va al checkout y llena sus datos de contacto
3. Hace clic en **"Ordenar por WhatsApp"**
4. Se abre WhatsApp con un mensaje pre-escrito que incluye:
   - Lista de productos con cantidades y precios
   - Total del pedido
   - Nombre, teléfono y dirección del cliente
5. El cliente solo tiene que enviarlo y el equipo de Bravd confirma el pedido

---

## Diseño Visual

### Paleta de Colores

| Color | Uso |
|---|---|
| Negro (#000) | Fondo principal |
| Blanco (#fff) | Texto principal, botones |
| Gris (#999) | Texto secundario |
| Gradientes sutiles | Fondos de secciones |

### Estilo General: Glassmorphism

El sitio usa un estilo moderno llamado *glassmorphism* (efecto vidrio): elementos con fondos semitransparentes, bordes sutiles y desenfoque de fondo. Esto da una apariencia premium y contemporánea.

### Tipografía
- **Outfit** (Google Fonts): fuente sans-serif moderna, usada en todo el sitio
- Pesos utilizados: 400 (regular), 600 (semibold), 700 (bold), 900 (black)

### Animaciones
- **Fade-in al hacer scroll:** los elementos aparecen suavemente cuando el usuario llega a ellos
- **Hover en tarjetas:** las tarjetas se elevan al pasar el mouse
- **Zoom en imágenes:** las imágenes hacen un ligero zoom al hover
- **Pulso en badges "New Drop":** animación de resplandor rojo pulsante
- **Transición de página:** efecto de entrada suave al navegar entre páginas
- **Barra de progreso de scroll:** línea en la parte superior que indica cuánto se ha desplazado la página

### Diseño Responsivo

El sitio se adapta a todos los tamaños de pantalla:
- **Desktop (computadora):** grid de 3-4 columnas
- **Tablet:** grid de 2 columnas
- **Móvil:** 1-2 columnas, menú hamburguesa

---

## Elementos de UX/UI Especiales

### Barra de Progreso de Scroll
Una línea blanca en la parte superior de la página que crece conforme el usuario hace scroll. Indica visualmente cuánto del contenido ha leído.

### Botón de WhatsApp Flotante
Un botón verde fijo en la esquina inferior derecha que siempre está visible. Al hacer clic abre WhatsApp directamente. Al pasar el mouse muestra el tooltip "¿Necesitas ayuda?".

### Lightbox de Galería
Al hacer clic en cualquier imagen de la galería de trabajos, se abre en pantalla completa con fondo oscuro. Se puede cerrar con la X o presionando Escape.

### FAQ Acordeón
Las preguntas frecuentes usan un efecto acordeón: al hacer clic en una pregunta se expande para mostrar la respuesta, y se cierra al hacer clic nuevamente.

### Contador de Estadísticas Animado
Los números (clientes atendidos, diseños realizados, etc.) se animan contando desde 0 hasta el número final cuando el usuario llega a esa sección de la página.

---

## Mantenimiento y Actualización

### Agregar un nuevo diseño SPOT

1. Guardar la imagen del mockup en la carpeta `assets/` con el formato: `spot-nombre-diseño.jpg`
2. En `index.html`, dentro de `<div class="spot-grid">`, copiar un bloque `<div class="spot-card">` existente y modificar:
   - `data-category="categoria"` (religiosa/musica/deportes/lifestyle/artistas)
   - `src="assets/spot-nombre.jpg"` en la imagen
   - El nombre, descripción y precio
   - `data-id`, `data-name` en el botón de carrito

### Cambiar los precios

Los precios se definen en dos lugares:

**En `index.html`:** en el atributo `data-price` de cada botón:
```html
data-price="500"
```

**En `script.js`:** la función `getEffectiveItemPrice` define los tiers:
```javascript
const tier = count >= 12 ? 350 : count >= 3 ? 400 : 500;
```
Cambia los números 350, 400 y 500 por los precios nuevos, y los umbrales 12 y 3 por las cantidades que desees.

### Cambiar el número de WhatsApp

En `script.js` busca:
```javascript
https://wa.me/50576292240
```
Reemplaza `50576292240` con el nuevo número (incluye el código de país, sin + ni espacios).

### Actualizar el repositorio de GitHub

Después de hacer cambios, en la terminal de VS Code dentro de la carpeta del proyecto:
```
git add -A
git commit -m "Descripción del cambio"
git push
```

---

## Compatibilidad

| Navegador | Soporte |
|---|---|
| Google Chrome | ✅ Completo |
| Firefox | ✅ Completo |
| Safari (Mac/iPhone) | ✅ Completo |
| Edge | ✅ Completo |
| Internet Explorer | ❌ No soportado |

El sitio es compatible con dispositivos móviles iOS y Android.

---

## Glosario (Para quienes no son del área técnica)

| Término | Significado sencillo |
|---|---|
| **HTML** | El "esqueleto" de la página. Define qué elementos existen: botones, textos, imágenes |
| **CSS** | El "maquillaje" de la página. Define cómo se ven los elementos: colores, tamaños, posiciones |
| **JavaScript** | El "cerebro" de la página. Hace que las cosas funcionen: el carrito, los filtros, las animaciones |
| **Repositorio (GitHub)** | Una carpeta en internet que guarda todas las versiones del código, como un historial de cambios |
| **Commit** | Guardar un punto de control en el historial del código (como un "save" en un videojuego) |
| **Push** | Enviar los cambios guardados localmente hacia GitHub (subir a la nube) |
| **Responsive** | Que la página se adapta bien a cualquier tamaño de pantalla (celular, tablet, computadora) |
| **localStorage** | Memoria del navegador donde se guarda el carrito aunque el usuario cierre la pestaña |
| **Modal** | Una ventana emergente que aparece encima del contenido principal |
| **DTF** | Direct to Film: tecnología de impresión de alta calidad para camisas |
| **Mockup** | Una fotografía de cómo se vería el diseño puesto en la camisa real |
| **Tier** | Nivel de precio según la cantidad (ej: tier 1 = 500, tier 2 = 400, tier 3 = 350) |
| **Glassmorphism** | Estilo de diseño que simula vidrio esmerilado con transparencia y desenfoque |
| **Lightbox** | Efecto donde al hacer clic en una imagen se abre en pantalla completa con fondo oscuro |
| **FAQ** | Frequently Asked Questions = Preguntas Frecuentes |
| **CTA** | Call to Action = Llamado a la Acción (botones como "Ordena Ahora") |

---

*Documento generado por el equipo de desarrollo — Bravd Studios © 2026*
