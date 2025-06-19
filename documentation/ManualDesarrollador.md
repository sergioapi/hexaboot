# HEXAGONAL ARCHETYPE GENERATOR 'hexagonal-test' by SERGIO
## Manual de desarrollador

## Requisitos previos

Para la correcta instalación y posterior prueba del generador, se deben seguir los pasos detallados en el documento [ManualUsuario](./ManualUsuario.md)
 que especifican los programas y paquetes necesarios junto con los pasos a seguir para generar un proyecto de prueba.

## Arquitectura del sistema

- El sistema permite crear proyectos Back-end siguiendo la Arquitectura Hexagonal.

- Las plantillas se han organizado según la capa a la que pertenezca (`application`, `domain`, `infrastructure`, `shared-kernel`).

- Además contamos con la carpeta `utils` donde se encuentran los archivos `prompts.js` y `entityParser.js`.

## Tecnologías utilizadas

- Lenguajes de programación utilizados:
  - JavaScript

- Plantillas TPL:
  - El proyecto utiliza plantillas para estandarizar la estructura del código a la hora de generar los proyectos. Estas tendrán la extensión `.tpl` y pueden utilizarse con diferentes lenguajes además de JavaScript.

## Bases de datos

- Soporta la generación con base de datos:
  - Postgres
  - Oracle
  - MySql
  - MongoDB