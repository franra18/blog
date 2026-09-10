---
title: 'Organizando mi búsqueda de empleo con MCP'
pubDate: 2026-09-10
description: 'Presento un servidor MCP construido con Spring AI para registrar candidaturas, analizar mis brechas técnicas y preparar entrevistas a partir de los requisitos de cada oferta.'
image:
    url: 'https://i.ytimg.com/vi/3rtZRKM39BI/maxresdefault.jpg'
    alt: 'Diagrama de un cliente MCP conectado a una IA y a un servidor MCP construido con Spring, que consulta una base de datos'
---

Buscar trabajo como desarrollador no consiste únicamente en enviar currículums. Después de varias candidaturas empiezan a mezclarse las empresas, las versiones del CV, los requisitos de cada oferta y el estado de cada proceso. Preparar una entrevista técnica añade otra capa de trabajo: hay que volver a leer la descripción, identificar las **tecnologías importantes** y decidir qué temas conviene repasar.

Por eso he decidido construir una herramienta que me ayude a organizar mi búsqueda de empleo mientras aprendo sobre **MCP**, **Spring AI** y las aplicaciones con modelos de lenguaje. La idea es crear un **copiloto de candidaturas** que pueda consultar desde Claude Desktop, Cursor u otro cliente compatible.

## La idea del copiloto

Quiero poder hablar con el copiloto de una forma sencilla, como si estuviera poniéndome al día con alguien que conoce mi búsqueda. Por ejemplo, podría decirle:

> Acabo de enviar mi CV a una oferta de Backend en esta empresa. Guarda el texto de la oferta y marca la candidatura como aplicada.

Más adelante, también podría preguntarle:

> Tengo una entrevista técnica mañana con esta empresa. ¿Qué preguntas difíciles sobre su stack pueden hacerme según los requisitos que guardamos?

Y, cuando tenga suficientes datos, me gustaría obtener una visión general de mi progreso:

> Muestra el embudo de mis candidaturas este mes y las tecnologías que más se repiten en las ofertas que me han rechazado.

La clave será que la información no se quede perdida en una conversación. Cada oferta, cada cambio de estado y cada nota importante deberán quedar **guardados para poder consultarlos más adelante**.

## Qué quiero conseguir

La primera versión será sencilla: **registrar ofertas**, guardar en qué punto está cada proceso y **comparar los requisitos de una oferta con mis conocimientos**. Con eso ya podré detectar qué habilidades debería reforzar antes de una entrevista o de una nueva tanda de candidaturas.

También quiero que el proyecto me ayude a **encontrar patrones**. Quizá descubra que ciertas tecnologías aparecen constantemente en las ofertas que me interesan, o que siempre tengo dificultades en la misma fase del proceso. Convertir esas observaciones en datos puede ayudarme a estudiar con más intención.

No busco construir una solución enorme desde el primer día. Prefiero empezar con una **base útil**, probarla con mis propias candidaturas y mejorarla a medida que entienda qué información necesito de verdad.

## Un proyecto para aprender

Este proyecto me interesa porque une aprendizaje y una necesidad muy concreta. Mientras construyo el copiloto podré practicar **Java**, **Spring** y el uso responsable de la **inteligencia artificial**, pero también tendré una herramienta que me acompañe durante una etapa importante.

La intención es contar en próximas publicaciones cómo avanzo, qué decisiones tomo y qué problemas aparecen por el camino. Si todo sale bien, al final no solo tendré un proyecto más en mi portfolio: también habré entendido mejor mi propia forma de **buscar trabajo**.
