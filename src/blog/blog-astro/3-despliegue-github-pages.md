---
title: 'Despliegue en GitHub Pages'
pubDate: 2026-08-19
description: 'Explico cómo automatizar el despliegue de un sitio Astro en GitHub Pages con GitHub Actions y cómo configurar BASE_URL para evitar rutas rotas al publicarlo bajo un subdirectorio.'
image: 
    url: 'https://blog.dave.org.uk/wp-content/uploads/2018/08/Screenshot-from-2018-08-26-12-14-24.png'
    alt: 'Icono de GitHub Pages'
tags: ['Blog Astro']
---

Tras haber estructurado el blog con Astro, el siguiente paso natural era ponerlo en producción. Buscaba una solución sencilla que permitiera automatizar el despliegue con cada cambio en el repositorio, y GitHub Pages encajaba a la perfección con la arquitectura estática del proyecto.

En este artículo detallo el proceso de configuración del flujo de integración continua mediante GitHub Actions y la adaptación que tuve que realizar en todos los enlaces de la web para evitar rutas rotas en el entorno publicado.

## 1. Automatizando el despliegue con GitHub Actions

Para no depender de compilaciones manuales en local ni lidiar con scripts complejos, recurrí a la GitHub Action oficial proporcionada por el equipo de Astro, disponible en el Marketplace ([Astro Deploy](https://github.com/marketplace/actions/astro-deploy)).

El primer paso fue definir el flujo de trabajo dentro del repositorio en la ruta `.github/workflows/deploy.yml`.

Dado que utilizo pnpm como gestor de paquetes, la acción de Astro detecta automáticamente las dependencias, ejecuta el comando de construcción y sube los artefactos compilados para que el paso posterior de despliegue los publique.

Para completar la integración, en la pestaña **Settings > Pages** del repositorio en GitHub, seleccioné la opción **GitHub Actions** dentro de la sección *Source*.

## 2. El problema del subdirectorio en GitHub Pages

Al publicar un proyecto en GitHub Pages bajo un repositorio estándar (sin dominio personalizado), el sitio no se sirve en la raíz del dominio principal, sino bajo una subruta con el nombre del repositorio:

```text
https://<usuario>.github.io/<nombre-del-repo>/

```

Esto genera un problema inmediato con los enlaces relativos a la raíz. Si en componentes de navegación, enlaces a posts o rutas de recursos estáticos dejamos rutas absolutas directas:

```html
<!-- Esto busca en https://<usuario>.github.io/blog/ -->
<a href="/blog/">Blog</a>

```

El navegador intentará resolver la URL omitiendo el nombre del repositorio, lo que deriva en errores 404 generalizados, pérdida de estilos y fallos de navegación entre páginas.

## 3. Configuración del proyecto y uso de import.meta.env.BASE_URL

Para solventar este problema y mantener el proyecto desacoplado del entorno, realicé dos modificaciones clave:

### Configurar *site* y *base* en Astro

En el archivo `astro.config.mjs`, se define explícitamente la URL final del sitio y la subruta base asignada por el repositorio:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<usuario>.github.io',
  base: '/<nombre-del-repo>',
  ...
});

```

### Actualizar el enrutado en todos los componentes

Una vez declarada la propiedad *base*, Astro expone la variable `import.meta.env.BASE_URL`, que contiene la ruta base configurada.

Tuve que refactorizar los componentes de la interfaz (como `Navigation.astro`, `PostRow.astro` o las páginas de listados) para anteponer siempre esta variable a las rutas internas:

```astro
---
// src/components/Navigation.astro
---
<div class="nav-links">
  <a href=`${import.meta.env.BASE_URL}`>Inicio</a>
  <a href=`${import.meta.env.BASE_URL}projects/`>Proyectos</a>
  <a href=`${import.meta.env.BASE_URL}blog/`>Blog</a> 
</div>

```

## 4. Objetivo y ventajas de esta solución

Aplicar este cambio en toda la base de código garantiza:

1. **Portabilidad entre entornos:** En local, `BASE_URL` se resuelve de forma que la navegación sigue funcionando exactamente igual en el servidor de desarrollo.
2. **Despliegues sin rutas rotas:** En producción, GitHub Pages concatena el prefijo del repositorio de manera limpia en menús, listados, enlaces del layout y archivos estáticos.
3. **Mantenibilidad futura:** Si en el futuro decido añadir un dominio personalizado, solo será necesario ajustar o eliminar la propiedad `base` en `astro.config.mjs`, sin tener que modificar manualmente ningún componente ni plantilla del proyecto.
