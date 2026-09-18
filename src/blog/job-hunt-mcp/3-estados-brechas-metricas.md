---
title: 'Estados, brechas técnicas y métricas: dando vida a las candidaturas'
pubDate: 2026-09-16
description: 'Implementación del seguimiento de estados de postulación, análisis de brechas (Gap Analysis) y consultas analíticas sobre las candidaturas.'
image:
  url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85'
  alt: 'Panel con gráficos y métricas para analizar el rendimiento de un proceso'
---

Una vez que el copiloto es capaz de almacenar ofertas y extraer automáticamente las tecnologías que piden, surge la siguiente necesidad práctica: ¿en qué estado se encuentra cada proceso y qué posibilidades reales tengo de superarlo con mi perfil actual?

En esta segunda fase del desarrollo de **Job Hunt Copilot**, me concentré en tres funcionalidades esenciales: modelar el estado actual de una postulación, automatizar el análisis de brechas (*Gap Analysis*) y construir métricas agregadas de las candidaturas.

## El ciclo de vida de una candidatura

Un proceso de selección pasa por estados bien diferenciados: desde la candidatura enviada (*APPLIED*) y el primer filtro (*SCREENING*) hasta la entrevista técnica (*TECHNICAL_INTERVIEW*), culminando en una oferta (*OFFER*), un rechazo (*REJECTED*) o una retirada (*WITHDRAWN*).

En esta versión mantengo el estado actual y una fecha de creación y actualización de cada candidatura. Al cambiarlo, puedo añadir notas de seguimiento que se acumulan en la candidatura. Desde la herramienta MCP `actualizar_estado_proceso`, basta con indicar al modelo:

> Actualiza mi postulación en esta empresa a entrevista técnica programada para el próximo martes.

El servicio `JobApplicationService` actualiza la entidad y guarda las notas proporcionadas. El historial detallado de transiciones y los tiempos de cada fase quedan como una posible evolución, no como una capacidad de esta versión.

## Análisis de brechas: oferta vs. perfil real

Uno de los puntos más valiosos del sistema es `GapAnalysisService`. Cuando postulamos a una vacante, a menudo dudamos si cumplimos con el perfil o qué aspectos debemos justificar mejor en una carta de presentación o llamada inicial.

Dado que en PostgreSQL disponemos tanto de mis habilidades (`UserSkill`) como de las competencias asociadas a la oferta (`JobApplicationSkill`), el servicio realiza una intersección determinista por nombre:

1. **Habilidades coincidentes (*Matching Skills*):** competencias obligatorias de la oferta que figuran en mi perfil.
2. **Habilidades faltantes (*Missing Skills*):** competencias obligatorias que no figuran en mi perfil.
3. **Deseables conocidas:** competencias opcionales de la oferta que sí figuran en mi perfil.

Esta separación evita el autoengaño y me da una foto nítida de qué puntos débiles debo mitigar antes de dar el siguiente paso.

## Analítica y métricas del embudo

Tener los datos estructurados abre la puerta a consultas que un bloc de notas nunca podría responder. Implementé `AnalyticsService` y expuse la herramienta `obtener_resumen_metricas`, que puede devolver el recuento actual por estado y las competencias más frecuentes en candidaturas rechazadas.

Con estas funciones puedo solicitar resúmenes como:
- **Distribución por estado:** cuántas candidaturas están actualmente aplicadas, en screening, en entrevista, con oferta, rechazadas o retiradas.
- **Top de tecnologías en rechazos:** qué competencias se repiten con mayor frecuencia en aquellas candidaturas que resultaron descartadas. Esta métrica orienta qué temas podría priorizar en mis próximas horas de estudio.

```text
APPLIED (12) | SCREENING (4) | TECHNICAL_INTERVIEW (2) | OFFER (1) | REJECTED (5)
                                                     |
                                                     +--> Competencias frecuentes en rechazos
```

## Lo que me llevo

Pasar de registrar información pasiva a obtener retroalimentación activa transforma la dinámica de buscar empleo. El copiloto ya no solo recuerda qué hice, sino que me ayuda a decidir si merece la pena aplicar a una oferta concreta y en qué temas concentrarme según el retorno que estoy obteniendo. En la última entrega, abordaremos la preparación de entrevistas técnicas con IA, la contenedorización con Docker Compose y las lecciones aprendidas construyendo este servidor MCP.
