module.exports = [
  {
    type: "string",
    name: "appName",
    message: "What is the application name?",
    default: "myapp"
  },
  {
    type: "list",
    name: "databaseEngine",
    message: "Choose the database engine",
    choices: ["mysql", "postgresql", "oracle", "mongodb"],
    default: "mysql"
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
    type: "input",
    name: "definitionFile",
    message: "Enter the path to the entity definition file:",
    default: "./entities.json"
  }
];
