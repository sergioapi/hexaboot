"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "string",
        name: "appName",
        message: "What is the application name?",
        default: "myapp"
      },
      {
        type: "string",
        name: "groupID",
        message: "What is the groupID of the project?",
        default: "es.hexagonal"
      },
      {
        type: "string",
        name: "entityName",
        message: "What is the name of the main entity?",
        default: "User"
      }
    ]);
  }

  writing() {
    const { appName, groupID, entityName } = this.answers;

    // Convertimos "User" en "user" para nombres de variables
    const entityVarName =
      entityName.charAt(0).toLowerCase() + entityName.slice(1);

    // Convertimos "es.hexagonal" en "es/hexagonal"
    const packagePath = groupID.replace(/\./g, "/");

    // 📌 Generar la interfaz CreateUseCase
    this.fs.copyTpl(
      this.templatePath("application/ports/in/CreateUseCase.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/ports/in/Create${entityName}UseCase.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la clase CreateUseCaseImpl
    this.fs.copyTpl(
      this.templatePath("application/usecases/CreateUseCaseImpl.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/usecases/Create${entityName}UseCaseImpl.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la interfaz RetrieveUseCase
    this.fs.copyTpl(
      this.templatePath("application/ports/in/RetrieveUseCase.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/ports/in/Retrieve${entityName}UseCase.java`
      ),
      { groupID, entityName }
    );

    // 📌 Generar la clase RetrieveUseCaseImpl
    this.fs.copyTpl(
      this.templatePath("application/usecases/RetrieveUseCaseImpl.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/usecases/Retrieve${entityName}UseCaseImpl.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la interfaz UpdateUseCase
    this.fs.copyTpl(
      this.templatePath("application/ports/in/UpdateUseCase.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/ports/in/Update${entityName}UseCase.java`
      ),
      { groupID, entityName }
    );

    // 📌 Generar la clase UpdateUseCaseImpl
    this.fs.copyTpl(
      this.templatePath("application/usecases/UpdateUseCaseImpl.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/usecases/Update${entityName}UseCaseImpl.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la interfaz DeleteUseCase
    this.fs.copyTpl(
      this.templatePath("application/ports/in/DeleteUseCase.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/ports/in/Delete${entityName}UseCase.java`
      ),
      { groupID, entityName }
    );

    // 📌 Generar la clase DeleteUseCaseImpl
    this.fs.copyTpl(
      this.templatePath("application/usecases/DeleteUseCaseImpl.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/usecases/Delete${entityName}UseCaseImpl.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la clase Service
    this.fs.copyTpl(
      this.templatePath("application/services/Service.java.tpl"),
      this.destinationPath(
        `${appName}/application/src/main/java/${packagePath}/application/services/${entityName}Service.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la clase de dominio (Entidad)
    this.fs.copyTpl(
      this.templatePath("domain/models/BusinessEntity.java.tpl"),
      this.destinationPath(
        `${appName}/domain/src/main/java/${packagePath}/domain/models/${entityName}.java`
      ),
      { groupID, entityName }
    );

    // 📌 Generar el repositorio de dominio
    this.fs.copyTpl(
      this.templatePath("domain/ports/driven/BusinessRepository.java.tpl"),
      this.destinationPath(
        `${appName}/domain/src/main/java/${packagePath}/domain/ports/driven/${entityName}Repository.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la clase Controller
    this.fs.copyTpl(
      this.templatePath("infrastructure/controllers/Controller.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/src/main/java/${packagePath}/infrastructure/controllers/${entityName}Controller.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la Entidad de persistencia
    this.fs.copyTpl(
      this.templatePath("infrastructure/persistence/entities/Entity.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/src/main/java/${packagePath}/infrastructure/persistence/entities/${entityName}Entity.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la interfaz JPA Repository
    this.fs.copyTpl(
      this.templatePath(
        "infrastructure/persistence/repositories/JpaRepository.java.tpl"
      ),
      this.destinationPath(
        `${appName}/infrastructure/src/main/java/${packagePath}/infrastructure/persistence/repositories/Jpa${entityName}Repository.java`
      ),
      { groupID, entityName, entityVarName }
    );

     // 📌 Generar la interfaz JPA Repository
     this.fs.copyTpl(
      this.templatePath(
        "infrastructure/persistence/repositories/JpaRepositoryAdapter.java.tpl"
      ),
      this.destinationPath(
        `${appName}/infrastructure/src/main/java/${packagePath}/infrastructure/persistence/repositories/Jpa${entityName}RepositoryAdapter.java`
      ),
      { groupID, entityName, entityVarName }
    );

    // 📌 Generar la clase de configuración
    this.fs.copyTpl(
      this.templatePath(
        "infrastructure/config/ApplicationConfig.java.tpl"
      ),
      this.destinationPath(
        `${appName}/infrastructure/src/main/java/${packagePath}/infrastructure/config/ApplicationConfig.java`
      ),
      { groupID, entityName, entityVarName }
    );

     // 📌 Generar la clase principal
     this.fs.copyTpl(
      this.templatePath(
        "Application.java.tpl"
      ),
      this.destinationPath(
        `${appName}/infrastructure/src/main/java/${packagePath}/infrastructure/${entityName}Application.java`
      ),
      { groupID, entityName }
    );

    // 📌 Generar el archivo pom.xml
    this.fs.copyTpl(
      this.templatePath("pom.xml.tpl"),
      this.destinationPath(`${appName}/pom.xml`),
      { appName, groupID }
    );

    // 📌 Generar el archivo pom.xml de dominio
    this.fs.copyTpl(
      this.templatePath("domain/pom.xml.tpl"),
      this.destinationPath(`${appName}/domain/pom.xml`),
      { appName, groupID }
    );

    // 📌 Generar el archivo pom.xml de aplicación
    this.fs.copyTpl(
      this.templatePath("application/pom.xml.tpl"),
      this.destinationPath(`${appName}/application/pom.xml`),
      { appName, groupID }
    );

    // 📌 Generar el archivo pom.xml de infraestructura
    this.fs.copyTpl(
      this.templatePath("infrastructure/pom.xml.tpl"),
      this.destinationPath(`${appName}/infrastructure/pom.xml`),
      { appName, groupID }
    );

    // 📌 Generar README
    this.fs.copyTpl(
      this.templatePath("_README.md.tpl"),
      this.destinationPath(`${appName}/README.md`),
      { appName, groupID }
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
