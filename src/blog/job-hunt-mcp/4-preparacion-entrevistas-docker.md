---
title: 'Cerrando el ciclo: preparación de entrevistas, Docker Compose y lecciones MCP'
pubDate: 2026-09-18
description: 'Cerrando el ciclo del copiloto: generación de preguntas de entrevista contextualizadas, ejecución local con Docker Compose y reflexiones tras construir un servidor MCP real.'
image:
  url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85'
  alt: 'Equipo reunido alrededor de una mesa durante una conversación de trabajo'
---

Con el modelo de datos consolidado, las postulaciones bajo seguimiento y el análisis de compatibilidad en marcha, llegamos a la última milla del proyecto: aprovechar toda esa información contextualizada para preparar entrevistas técnicas reales, simplificar el entorno local y evaluar qué aporta verdaderamente el protocolo MCP frente a los enfoques tradicionales.

## Preparando entrevistas técnicas a partir de los requisitos

El día antes de una entrevista técnica suele reinar la dispersión: repasamos conceptos al azar o buscamos listas genéricas de "las 50 preguntas más frecuentes de Java". Sin embargo, Job Hunt Copilot tiene una ventaja competitiva: conoce la descripción exacta del puesto, la empresa y las tecnologías asociadas.

Para capitalizar esto, desarrollé `InterviewPrepService`. Cuando invoco la herramienta MCP `generar_preguntas_entrevista`, el sistema:

1. Recupera la oferta, el rol y todas las competencias vinculadas, distinguiendo obligatorias y deseables.
2. Construye un prompt contextualizado con Spring AI y Gemini pidiendo entre 4 y 6 preguntas técnicas sobre escenarios prácticos, trade-offs y debugging, clasificadas por dificultad (*EASY*, *MEDIUM*, *HARD*).
3. Persiste las preguntas generadas en la tabla `InterviewPrepQuestion`, junto con la competencia relacionada y los puntos de una respuesta sugerida.

El resultado es un entrenamiento hiperenfocado: si la oferta hace hincapié en concurrencia y microservicios con Spring Boot, las preguntas incidirán exactamente en esos puntos críticos.

## Despliegue y configuración con Docker Compose

Para simplificar el entorno local, el proyecto incluye en `docker-compose.yaml` un servicio de PostgreSQL.

El despliegue orquesta:
- **PostgreSQL:** con un volumen persistente para conservar los datos entre reinicios.
- **Servidor MCP:** se ejecuta aparte con Maven (`mvnw spring-boot:run` o `mvnw.cmd spring-boot:run`) y se conecta a la base de datos local. Hibernate actualiza el esquema mediante `spring.jpa.hibernate.ddl-auto=update`.

```yaml
services:
  postgres:
    image: postgres:17-alpine
    container_name: job_hunt_copilot_db
    environment:
      POSTGRES_DB: job_hunt_copilot
      POSTGRES_USER: postgres
      POSTGRES_HOST_AUTH_METHOD: trust
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
```

Con `docker compose up -d` queda lista la base de datos. Después, el servidor se inicia con Maven y expone el endpoint SSE en `http://localhost:8080/sse`, listo para conectarse a GitHub Copilot, Cursor u otro cliente MCP compatible.

## Qué aprendí construyendo una aplicación MCP para un problema real

Desarrollar Job Hunt Copilot me ha dejado varias conclusiones fundamentales sobre el desarrollo de software asistido por IA:

- **MCP desacopla el cliente de la lógica:** las herramientas anotadas con `@Tool` se registran en Spring AI y el servidor las ofrece mediante SSE. El backend se centra en la lógica de candidaturas, mientras el cliente decide cómo interactuar con ellas.

- **La persistencia relacional sigue siendo insustituible:** los LLM son excelentes razonando e interactuando, pero pésimos recordando estados a largo plazo o computando agregaciones matemáticas exactas. Delegar el almacenamiento y las consultas estadísticas en PostgreSQL y dejar que el LLM actúe como orquestador y sintetizador es la combinación ganadora.

- **El valor del contexto acotado:** preparar una entrevista técnica no requiere un modelo gigante con billones de parámetros que lo sepa todo; requiere un modelo competente que reciba el contexto exacto de la vacante: su rol, descripción y competencias asociadas.

Este proyecto empezó como un ejercicio de aprendizaje y se ha convertido en mi herramienta diaria de trabajo. Resolver un problema propio es siempre la mejor manera de poner a prueba la tecnología real.
