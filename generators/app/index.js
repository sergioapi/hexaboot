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
        default: "es.example"
      },
      {
        type: "string",
        name: "globalSnapShot",
        message: "What is the version of the project?",
        default: "0.0.1-SNAPSHOT"
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
    const { appName, groupID, globalSnapShot, entityName } = this.answers;

    // Convertimos "User" en "user" para nombres de variables
    const entityVarName =
      entityName.charAt(0).toLowerCase() + entityName.slice(1);

    // Convertimos "es.hexagonal" en "es/hexagonal"
    const packagePath = groupID.replace(/\./g, "/");
    const baseDirectoryDest = 'src/main/java/' + packagePath

    const entityFolderName = entityName.toLowerCase();

    //copy project pom.xml
    this.fs.copyTpl(
      this.templatePath("pom.xml.tpl"),
      this.destinationPath(
        `${appName}/pom.xml`
      ),
      {
        appName,
        groupID,
        globalSnapShot,
      }
    );
    // Application layer
    this.fs.copyTpl(
    this.templatePath("application/pom.xml.tpl"),
    this.destinationPath(
      `${appName}/application/pom.xml`
    ),
    {
      appName,
      groupID,
      globalSnapShot,
    }
  );
    this.fs.copyTpl(
      this.templatePath("application/UseCase.java.tpl"),
      this.destinationPath(
        `${appName}/application/${baseDirectoryDest}/${entityFolderName}s/ports/driving/${entityName}UseCase.java`
      ),
      {
        model: `${entityName}`,
        entityVarName: `${entityVarName}`,
        groupID: `${groupID}.${entityFolderName}s.ports.driving`,
        pathModel: `${groupID}.${entityFolderName}s.models`
      }
    );
    this.fs.copyTpl(
      this.templatePath("application/UseCaseImpl.java.tpl"),
      this.destinationPath(
        `${appName}/application/${baseDirectoryDest}/${entityFolderName}s/usecases/${entityName}UseCaseImpl.java`
      ),
      {
        model: `${entityName}`,
        entityVarName: `${entityVarName}`,
        groupID: `${groupID}.${entityFolderName}s.usecases`,
        pathModel: `${groupID}.${entityFolderName}s.models`,
        pathUseCase: `${groupID}.${entityFolderName}s.ports.driving`,
        pathRepository: `${groupID}.${entityFolderName}s.ports.driven`
      }
    );

    //Domain layer
    this.fs.copyTpl(
      this.templatePath("domain/pom.xml.tpl"),
      this.destinationPath(
        `${appName}/domain/pom.xml`
      ),
      {
        appName,
        groupID,
        globalSnapShot,
      }
    );
    this.fs.copyTpl(
      this.templatePath("domain/Model.java.tpl"),
      this.destinationPath(
        `${appName}/domain/${baseDirectoryDest}/${entityFolderName}s/models/${entityName}.java`
      ),
      {
        model: `${entityName}`,
        groupID: `${groupID}.${entityFolderName}s.models`
      }
    );

    this.fs.copyTpl(
      this.templatePath("domain/Repository.java.tpl"),
      this.destinationPath(
        `${appName}/domain/${baseDirectoryDest}/${entityFolderName}s/ports/driven/${entityName}Repository.java`
      ),
      {
        model: `${entityName}`,
        entityVarName: `${entityVarName}`,
        groupID: `${groupID}.${entityFolderName}s.ports.driven`,
        pathModel: `${groupID}.${entityFolderName}s.models`
      }
    );

    //Infrastructure
    this.fs.copyTpl(
      this.templatePath("infrastructure/pom.xml.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/pom.xml`
      ),
      {
        appName,
        groupID,
        globalSnapShot,
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/adapters/Controller.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}s/adapters/rest/${entityName}Controller.java`
      ),
      {
        groupID: `${groupID}.${entityFolderName}s.adapters.rest`,
        entityName: `${entityName}`,
        entityVarName: `${entityVarName}`,
        pathModel: `${groupID}.${entityFolderName}s.models`,
        pathUseCase: `${groupID}.${entityFolderName}s.ports.driving`,
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/adapters/Entity.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}s/adapters/persistence/entities/${entityName}Entity.java`
      ),
      {
        groupID: `${groupID}.${entityFolderName}s.adapters.persistence.entities`,
        model: `${entityName}`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/adapters/Mapper.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}s/adapters/persistence/mappers/${entityName}Mapper.java`
      ),
      {
        groupID: `${groupID}.${entityFolderName}s.adapters.persistence.mappers`,
        entityName: `${entityName}`,
        entityVarName: `${entityVarName}`,
        pathModel: `${groupID}.${entityFolderName}s.models`,
        pathEntity: `${groupID}.${entityFolderName}s.adapters.persistence.entities`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/adapters/Repository.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}s/adapters/persistence/repositories/${entityName}JpaRepository.java`
      ),
      {
        groupID: `${groupID}.${entityFolderName}s.adapters.persistence.repositories`,
        entityName: `${entityName}`,
        pathEntity: `${groupID}.${entityFolderName}s.adapters.persistence.entities`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/adapters/RepositoryAdapter.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}s/adapters/persistence/repositories/${entityName}RepositoryAdapter.java`
      ),
      {
        groupID: `${groupID}.${entityFolderName}s.adapters.persistence.repositories`,
        entityName: `${entityName}`,
        entityVarName: `${entityVarName}`,
        pathModel: `${groupID}.${entityFolderName}s.models`,
        pathRepo: `${groupID}.${entityFolderName}s.ports.driven`,
        pathMapper: `${groupID}.${entityFolderName}s.adapters.persistence.mappers`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/Config.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}s/config/${entityName}Config.java`
      ),
      {
        entityName: `${entityName}`,
        entityVarName: `${entityVarName}`,
        groupID: `${groupID}.${entityFolderName}s.config`,
        useCaseImplPath: `${groupID}.${entityFolderName}s.usecases`,
        useCasePath: `${groupID}.${entityFolderName}s.ports.driving`,
        entityRepoPath: `${groupID}.${entityFolderName}s.ports.driven`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/Application.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${appName}App.java`
      ),
      {
        groupID: `${groupID}`,
        mainClassName: `${appName}App`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/application.properties.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/src/main/resources/application.properties`
      ),
      {}
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
