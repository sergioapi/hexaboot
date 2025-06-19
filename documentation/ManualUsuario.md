# HEXAGONAL ARCHETYPE GENERATOR 'hexagonal-test' by SERGIO
## Manual de usuario

> HEXAGONAL ARCHITECTURE PROJECT GENERATOR

## Requirements
Node v20.14.0

- BackEnd
  - Java 17

## Installation

First, install [Yeoman](http://yeoman.io) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
```

Download the repository:

```bash
git clone https://github.com/sergioapi/generator-hexagonal-test
cd generator-hexagonal-test
npm i
npm link
```

Then generate your new project.

## Generating a new project

```bash
yo hexagonal-test
```
- If you want to generate a project, these are the different options and configurations you must to enter.

<div style="background-color:black; padding:10px; border-radius:5px; font-family: monospace; margin-bottom: 30px">

<span style="color: green;">? </span> <span style="color: white;">What is the application name?</span> <your_application_name>

<span style="color: green;">? </span> <span style="color: white;">Choose the database engine</span> (Choose between Postgres, Oracle, MySql and MongoDB)

<span style="color: green;">? </span> <span style="color: white;">What is the groupID of the project?</span> <your_groupID>

<span style="color: green;">? </span> <span style="color: white;">What is the version of the project?</span> <your_project_version>

<span style="color: green;">? </span> <span style="color: white;">Enter the path to the entity definition file:</span> (./entities.json)

</div>

## Structure of the `entities.json` file
In this file you must follow the next structure so that it works correctly and not with errors.

You can write entities, relationships and enums, for doing that, you must write the specific word ('entity', 'relationship', 'enum') followed by the resource you need to create.

One example of entities, relationships and enums is:

```
{
  "entities": [
    {
      "name": "Factura",
      "fields": [
        { "name": "total", "type": "Double" },
        { "name": "fecha", "type": "String" }
      ],
      "relations": [
        {
          "type": "OneToMany",
          "targetEntity": "LineaFactura",
          "fieldName": "lineasFacturas",
          "mappedBy": "factura"
        }
      ]
    },
    {
      "name": "LineaFactura",
      "fields": [
        { "name": "total", "type": "Double" }
      ],
      "relations": [
        {
          "type": "ManyToOne",
          "targetEntity": "Factura",
          "fieldName": "factura"
        }
      ]
    }
  ]
}
```
Then you just need to repeat this structure whith all the ones you need to create.

## RULES FOR DATABASE:

- First of all, you must strictly follow the instructions in the `.properties` files for the name, user and the password of database.
- Tables and column names must be completely lowercase.
- If it is a relational database `id` column must be `bigInt`.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).