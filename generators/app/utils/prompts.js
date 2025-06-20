module.exports = [
  {
    type: "string",
    name: "appName",
    message: "What is the application name?",
    default: "myapp"
  },
  {
    type: "list",
    name: "dataBaseEngine",
    message: "Choose the database engine",
    choices: ["MySql", "Postgres", "Oracle", "MongoDB"],
    default: "MySql"
  },
  {
    type: "string",
    name: "groupID",
    message: "What is the groupID of the project?",
    default: "es.example"
  },
  {
    type: "string",
    name: "globalSnapShot",
    message: "What is the version of the project?",
    default: "0.0.1-SNAPSHOT"
  },
  {
    type: "confirm",
    name: "useDefinitionFile",
    message: "Do you want to include a data model definition file?",
    default: false
  },
  {
    type: "input",
    name: "definitionFile",
    message: "Enter the path to the entity definition file:",
    when: answers => answers.useDefinitionFile
  }
];
