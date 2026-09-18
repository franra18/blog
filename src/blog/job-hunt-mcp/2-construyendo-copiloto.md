---
title: 'Construyendo el copiloto: Spring Boot, PostgreSQL y extracción con IA'
pubDate: 2026-09-13
description: 'Primeros pasos en la creación de un servidor MCP con Spring Boot y Gemini: configuración del protocolo, diseño del modelo relacional y extracción automática de competencias.'
image:
  url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85'
  alt: 'Código fuente mostrado en una pantalla durante la construcción de una aplicación de software'
---

En esta primera etapa del proyecto tocaba resolver tres retos fundamentales: levantar la arquitectura base de Spring Boot con el starter de MCP, modelar la persistencia en PostgreSQL y aprovechar Gemini mediante Spring AI para procesar las descripciones desestructuradas de las ofertas.

## Conectando el primer cliente MCP en Spring Boot

El primer paso fue configurar un proyecto con **Spring Boot 4.1.1**, **Spring AI 2.0.1** y el starter de servidor MCP para Web MVC. Integrar el protocolo MCP en el ecosistema de Spring resulta sorprendentemente limpio gracias al soporte de herramientas (`@Tool`), que permite exponer métodos Java convencionales como capacidades que el modelo puede invocar de forma determinista.

El protocolo MCP permite que un asistente entienda qué funciones tiene a su alcance y con qué parámetros llamarlas. En la configuración actual, el servidor usa transporte **SSE** sobre Web MVC y expone el endpoint `/sse`. Los objetos anotados con `@Tool` se registran mediante `MethodToolCallbackProvider`, de modo que un cliente MCP compatible puede descubrir y ejecutar las capacidades del servidor.

## El modelo de datos en PostgreSQL

Para no depender de texto plano o memorias volátiles de chat, diseñé un esquema relacional centrado en las necesidades de una búsqueda de empleo seria:

- **Empresas (`Company`):** almacena la organización, sitio web e industria.
- **Habilidades (`Skill` y `UserSkill`):** un catálogo normalizado de tecnologías, frameworks y conceptos (Java, Docker, Kubernetes, etc.) junto con las competencias que configuro para mi perfil.
- **Postulaciones (`JobApplication`):** la entidad central, con el título del puesto, la URL, la descripción original, notas de seguimiento, rango salarial y estado actual.
- **Requisitos de la oferta (`JobApplicationSkill`):** tabla intermedia que vincula cada oferta con las competencias detectadas, marcando si cada una es obligatoria o deseable.

Este diseño permite que las comparaciones futuras no dependan de búsquedas semánticas difusas, sino de relaciones explícitas en base de datos.

## De texto sin formato a datos estructurados: extracción de habilidades

El problema recurrente al aplicar a ofertas de empleo es que cada empresa redacta sus descripciones como quiere: algunas usan listas de viñetas, otras párrafos densos y otras combinan requerimientos técnicos con beneficios de oficina.

Para solucionar esto sin tener que rellenar formularios infinitos a mano, implementé `SkillExtractorService`. Apoyándome en el cliente de chat de Spring AI y estructuración de salidas (structured output), el servicio toma el texto sin formato de la oferta y le pide al LLM:

1. Identificar las tecnologías y habilidades clave mencionadas.
2. Clasificar cada una entre obligatoria o secundaria.
3. Organizar las competencias por categorías cuando el modelo las identifica.

El resultado devuelve un DTO `SkillExtractionResponse`. Al registrar la candidatura, las competencias obligatorias y deseables se normalizan y se guardan vinculadas al catálogo general de `Skill`. Con esto, registrar una oferta pasa de ser un tedioso copia-pega a una simple orden conversacional: *"He encontrado esta oferta de Backend; guarda el texto y extrae sus requisitos"*.

## Lo que me llevo

Comenzar un proyecto de IA estructurando bien los cimientos clásicos de software (modelo relacional limpio, tipado estricto en Java y servicios bien delimitados) marca la diferencia. La IA no sustituye la arquitectura: la potencia cuando se le da un esquema claro donde escribir. En la próxima entrega, veremos cómo dotar de dinamismo a estas candidaturas mediante un ciclo de estados y cómo cruzar estos requisitos contra mi perfil técnico.
