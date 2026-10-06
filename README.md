# Hexaboot

Hexaboot is a CLI generator for Java and Spring Boot backend projects following Hexagonal Architecture.

Built with Node.js and Yeoman, it scaffolds a multi-module Maven project from a few configuration options and an optional JSON entity definition. It reduces repetitive project setup by generating the base architecture, CRUD components and persistence configuration for PostgreSQL, MySQL, Oracle or MongoDB.

## What it generates

- Java 17 + Spring Boot backend project.
- Multi-module Maven structure following Hexagonal Architecture.
- Controllers, services, use cases, repositories, domain models and persistence entities.
- Base CRUD operations from an entity definition.
- Entity relationships defined in JSON.
- Database-specific dependencies and persistence configuration.
- Generated mappings and boilerplate using MapStruct and Lombok.

The generator itself uses JavaScript, Node.js, Yeoman and `.tpl` templates to produce the Java source code.

## Usage

### Requirements

- Node.js 20.14.0
- Java 17
- npm
- Yeoman CLI 4.3.1

> Yeoman CLI 4.3.1 is recommended because of file-overwrite issues with Yeoman CLI 5.x.

Install Yeoman:

```bash
npm install -g yo@4.3.1
```

Clone and install Hexaboot:

```bash
git clone https://github.com/sergioapi/hexaboot.git
cd hexaboot
npm install
npm link
```

Run the generator:

```bash
yo hexaboot
```

Hexaboot will guide you through the configuration:

```text
? What is the application name?
? Choose the database engine (MySql, Postgres, Oracle or MongoDB)
? What is the groupID of the project?
? What is the version of the project?
? Do you want to include a data model definition file?
? Enter the path to the entity definition file:
```

## Entity definition

An optional JSON file can define the entities, fields and relationships used to generate the base application code.

```json
{
  "entities": [
    {
      "name": "Student",
      "fields": [
        { "name": "name", "type": "String" }
      ],
      "relations": [
        {
          "type": "ManyToMany",
          "targetEntity": "Course",
          "fieldName": "courses"
        }
      ]
    }
  ]
}
```

The definition is parsed by the generator and used by the `.tpl` templates to create the corresponding components in the generated project.

## Generated structure

```text
generated-project/
├── application/
├── domain/
├── infrastructure/
└── shared-kernel/
```

The generated modules separate application logic, domain code and infrastructure concerns. The `shared-kernel` module contains shared elements such as the custom `@UseCase` annotation, allowing use cases to be identified without introducing Spring-specific logic into the application layer.

## Documentation

More detailed usage and implementation documentation is available in the [`documentation`](./documentation) directory.
