---
title: 'RAG: cómo dar contexto a los modelos de lenguaje'
pubDate: 2026-09-14
description: 'Una introducción práctica a RAG, el patrón que permite conectar modelos de lenguaje con información propia y actualizada.'
image:
    url: 'https://i.ytimg.com/vi/_B4jGz0JEGE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCcicxb-kICv8thEjniNjNmtQDnKQ'
    alt: 'Ilustración del flujo RAG: documentos convertidos en embeddings, almacenados en una base de datos y enviados a un modelo de lenguaje'
---

Últimamente estoy intentando entender mejor cómo se construyen aplicaciones útiles alrededor de los modelos de lenguaje. Una de las ideas que más se repite es **RAG**, siglas de *Retrieval-Augmented Generation* o generación aumentada mediante recuperación.

El nombre suena bastante más complicado de lo que realmente es. La idea básica consiste en que un modelo no tenga que responder únicamente con lo que aprendió durante su entrenamiento, sino que pueda consultar información relevante en el momento de recibir una pregunta y utilizarla para construir la respuesta.

## El problema que intenta resolver

Un modelo de lenguaje puede saber muchas cosas, pero no conoce automáticamente los documentos privados de una empresa, la documentación interna de un proyecto o los cambios que se han producido después de su entrenamiento. Tampoco es buena idea asumir que todo lo que responde es cierto: puede equivocarse, inventar datos o dar una respuesta demasiado general.

Por ejemplo, si le pregunto a un modelo cómo funciona mi blog, no tiene ninguna razón para saber qué componentes he creado, qué decisiones he tomado o cómo está organizada la documentación del proyecto. Podría darle todos esos datos en el prompt, pero repetirlos manualmente en cada consulta sería poco práctico y además ocuparía mucho contexto.

RAG propone separar el problema en dos momentos:

1. **Recuperar** los fragmentos de información relacionados con la pregunta.
2. **Generar** una respuesta utilizando esos fragmentos como contexto.

No se trata de entrenar de nuevo el modelo cada vez que cambia un documento. Se trata de buscar la información adecuada y pasársela cuando hace falta.

## Cómo funciona un sistema RAG

Aunque cada proyecto puede tener sus propios detalles, el flujo habitual tiene dos partes: la preparación de los documentos y la consulta.

### 1. Preparar la información

Primero hay que reunir las fuentes que queremos que el sistema pueda consultar. Pueden ser archivos Markdown, PDFs, páginas web, tickets de soporte, bases de datos o cualquier otra fuente de conocimiento.

Después, los documentos suelen dividirse en fragmentos pequeños (*chunks*). Un documento entero puede ser demasiado grande para recuperarlo de una vez y, además, una pregunta normalmente solo necesita una parte. Dividirlo permite trabajar con unidades más manejables.

A cada fragmento se le genera un **embedding**, que es una representación numérica de su significado. Estos vectores se guardan en una base de datos vectorial junto con el texto original y los metadatos que puedan ser útiles, como el nombre del archivo, el título o la fecha.

### 2. Responder una pregunta

Cuando llega una consulta, el sistema también la convierte en un embedding. Después busca en la base de datos los fragmentos que tienen un significado más parecido.

Los resultados más relevantes se añaden al prompt que recibe el modelo, normalmente con una instrucción parecida a: "responde usando el contexto proporcionado y reconoce si la información no es suficiente". Finalmente, el modelo redacta una respuesta basada en ese contexto.

De forma resumida:

```text
documentos -> fragmentos -> embeddings -> base vectorial

pregunta -> embedding -> búsqueda de fragmentos relevantes
		 -> prompt con contexto -> respuesta del modelo
```

## Un ejemplo sencillo

Imaginemos un asistente para consultar la documentación de una aplicación. Alguien pregunta:

> ¿Cómo se despliega el proyecto?

El modelo, por sí solo, podría responder con instrucciones genéricas de despliegue. Un sistema RAG buscaría primero los fragmentos donde se explica el despliegue concreto de esa aplicación: el comando que utiliza, las variables de entorno necesarias y el proveedor donde está alojada.

La respuesta tendría muchas más posibilidades de ser útil porque estaría basada en la documentación real del proyecto y no solamente en una explicación aprendida de forma general.

## RAG no es lo mismo que entrenar un modelo

Esta diferencia me parece importante. **El fine-tuning modifica o adapta el comportamiento del modelo** mediante un entrenamiento adicional. Puede ser útil para enseñar un estilo, un formato de respuesta o una tarea concreta.

**RAG no modifica el modelo**. Mantiene los documentos fuera de él y los recupera cuando son necesarios. Por eso suele ser una opción más sencilla cuando el problema principal es conectar el modelo con información que cambia, es privada o es demasiado específica para que el modelo la conozca.

También permite actualizar los documentos sin volver a entrenar el modelo completo. Eso no significa que RAG sea siempre la solución correcta, pero sí que es un punto de partida muy razonable para crear asistentes basados en documentación propia.

## Las piezas que hay que elegir

Para montar un sistema RAG hay varias decisiones técnicas que pueden cambiar bastante el resultado:

- **Cómo dividir los documentos.** Si los fragmentos son demasiado pequeños, pueden perder contexto. Si son demasiado grandes, la búsqueda puede ser menos precisa y el prompt crecerá innecesariamente.
- **Qué modelo de embeddings utilizar.** La calidad de la representación influye directamente en los documentos que se recuperan.
- **Qué base de datos usar.** Existen bases de datos vectoriales especializadas y también bases de datos tradicionales con soporte para búsquedas vectoriales.
- **Cuántos fragmentos recuperar.** Recuperar muy pocos puede dejar fuera información importante; recuperar demasiados puede añadir ruido.
- **Cómo construir el prompt.** El modelo necesita instrucciones claras sobre cómo utilizar el contexto y qué hacer cuando no encuentra una respuesta.

Por eso guardar vectores y conectar un modelo no garantiza automáticamente un buen RAG. La recuperación es una parte central del sistema. Si los fragmentos que llegan al modelo no son relevantes, el modelo tendrá poco margen para acertar, por muy bueno que sea.

## El vídeo que he encontrado

Para verlo de una forma más práctica, recomiendo el vídeo [Cómo montar un RAG paso a paso en YouTube](https://www.youtube.com/watch?v=_B4jGz0JEGE). En él se explica cómo construir uno desde cero, pasando por las piezas necesarias y conectándolas para obtener un sistema funcional.

Me parece un buen complemento para esta explicación porque aquí he intentado quedarme con la idea general y con el motivo de cada paso. Después, viendo una implementación completa, es más fácil entender qué papel juega cada componente y empezar a experimentar con documentos propios.

## Lo que me llevo

RAG me parece una de esas ideas que ayudan a entender mejor qué puede y qué no puede hacer un modelo de lenguaje. No convierte al modelo en una fuente perfecta de conocimiento, pero permite darle acceso controlado a información concreta en el momento adecuado.

La receta, simplificándola mucho, sería: recopilar documentos, dividirlos, generar embeddings, buscar los fragmentos relevantes y utilizarlos como contexto para generar la respuesta.

Ahora me gustaría probarlo con un conjunto pequeño de documentos y medir algo más que la sensación de que "responde bien". También quiero comprobar qué ocurre cuando la pregunta no tiene respuesta, cómo afectan los distintos tamaños de fragmento y qué metadatos merece la pena conservar. Ahí es donde, probablemente, empieza la parte realmente interesante de construir un sistema RAG.
