"use strict";
const Generator = require("yeoman-generator");
const fs = require("fs");
const path = require("path");
const prompts = require("./utils/prompts");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(prompts);
  }

  writing() {
    const { appName, groupID, globalSnapShot, definitionFile, databaseEngine} = this.answers;

    const definitionFilePath = path.resolve(definitionFile);
    const definitionContent = fs.readFileSync(definitionFilePath, "utf-8");
    const { entities = [], enums = [] } = JSON.parse(definitionContent);

    // Convertimos "es.hexagonal" en "es/hexagonal"
    const packagePath = groupID.replace(/\./g, "/");
    const baseDirectoryDest = "src/main/java/" + packagePath;

    // Archivos comunes
    this.fs.copyTpl(
      this.templatePath("pom.xml.tpl"),
      this.destinationPath(`${appName}/pom.xml`),
      {
        appName,
        groupID,
        globalSnapShot
      }
    );
    // Application layer pom
    this.fs.copyTpl(
      this.templatePath("application/pom.xml.tpl"),
      this.destinationPath(`${appName}/application/pom.xml`),
      {
        appName,
        groupID,
        globalSnapShot
      }
    );
    //Domain layer pom
    this.fs.copyTpl(
      this.templatePath("domain/pom.xml.tpl"),
      this.destinationPath(`${appName}/domain/pom.xml`),
      {
        appName,
        groupID,
        globalSnapShot
      }
    );
    //Infrastructure layer pom
    this.fs.copyTpl(
      this.templatePath("infrastructure/pom.xml.tpl"),
      this.destinationPath(`${appName}/infrastructure/pom.xml`),
      {
        appName,
        groupID,
        globalSnapShot,
        databaseEngine
      }
    );
    //Shared kernel pom
    this.fs.copyTpl(
      this.templatePath("shared-kernel/pom.xml.tpl"),
      this.destinationPath(`${appName}/shared-kernel/pom.xml`),
      {
        appName,
        groupID,
        globalSnapShot
      }
    );
    this.fs.copyTpl(
      this.templatePath("shared-kernel/application-inbound/pom.xml.tpl"),
      this.destinationPath(
        `${appName}/shared-kernel/application-inbound/pom.xml`
      ),
      {
        groupID,
        globalSnapShot
      }
    );
    this.fs.copyTpl(
      this.templatePath("shared-kernel/application-inbound/UseCase.java.tpl"),
      this.destinationPath(
        `${appName}/shared-kernel/application-inbound/${baseDirectoryDest}/annotations/UseCase.java`
      ),
      {
        package: `${groupID}.annotations`
      }
    );

    this.fs.copyTpl(
      this.templatePath("infrastructure/Application.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${appName}App.java`
      ),
      {
        package: `${groupID}`,
        groupID, 
        mainClassName: `${appName}App`,
        pathUseCaseAnnotation: `${groupID}.annotations`
      }
    );
    this.fs.copyTpl(
      this.templatePath("infrastructure/application.properties.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/src/main/resources/application.properties`
      ),
      {
        databaseEngine
      }
    );

    entities.forEach(entity => {
      const model = entity.name;
      const modelVarName =
        model.charAt(0).toLowerCase() + model.slice(1);
      const entityFolderName = model.toLowerCase() + "s";
      const fields = entity.fields;
      const relations = entity.relations || [];

      const relationImports = (entity.relations || []).map(rel => {
        const targetEntity = rel.targetEntity;
        const targetFolderName = targetEntity.toLowerCase() + "s";
        return `${groupID}.${targetFolderName}.adapters.persistence.entities.${targetEntity}Entity`;
      });

      const needsListImport = relations.some(
        rel => rel.type === "OneToMany" || rel.type === "ManyToMany"
      );

      // Application Layer
      this.fs.copyTpl(
        this.templatePath("application/UseCase.java.tpl"),
        this.destinationPath(
          `${appName}/application/${baseDirectoryDest}/${entityFolderName}/ports/driving/${entity.name}UseCase.java`
        ),
        {
          model,
          modelVarName,
          package: `${groupID}.${entityFolderName}.ports.driving`,
          pathModel: `${groupID}.${entityFolderName}.models`
        }
      );

      this.fs.copyTpl(
        this.templatePath("application/UseCaseImpl.java.tpl"),
        this.destinationPath(
          `${appName}/application/${baseDirectoryDest}/${entityFolderName}/usecases/${entity.name}UseCaseImpl.java`
        ),
        {
          model,
          modelVarName,
          package: `${groupID}.${entityFolderName}.usecases`,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathUseCase: `${groupID}.${entityFolderName}.ports.driving`,
          pathRepository: `${groupID}.${entityFolderName}.ports.driven`,
          pathUseCaseAnnotation: `${groupID}.annotations`
        }
      );

      // Domain Layer
      this.fs.copyTpl(
        this.templatePath("domain/Model.java.tpl"),
        this.destinationPath(
          `${appName}/domain/${baseDirectoryDest}/${entityFolderName}/models/${entity.name}.java`
        ),
        {
          model,
          package: `${groupID}.${entityFolderName}.models`,
          fields,
          relations,
          needsListImport
        }
      );

      this.fs.copyTpl(
        this.templatePath("domain/RepositoryPort.java.tpl"),
        this.destinationPath(
          `${appName}/domain/${baseDirectoryDest}/${entityFolderName}/ports/driven/${entity.name}RepositoryPort.java`
        ),
        {
          model,
          modelVarName,
          package: `${groupID}.${entityFolderName}.ports.driven`,
          pathModel: `${groupID}.${entityFolderName}.models`
        }
      );

      // Infrastructure Layer
      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Controller.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/rest/${entity.name}Controller.java`
        ),
        {
          package: `${groupID}.${entityFolderName}.adapters.rest`,
          model,
          modelVarName,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathUseCase: `${groupID}.${entityFolderName}.ports.driving`
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Entity.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/entities/${entity.name}Entity.java`
        ),
        {
          package: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
          model,
          fields,
          relations,
          relationImports,
          needsListImport,
          databaseEngine
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Mapper.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/mappers/${entity.name}Mapper.java`
        ),
        {
          package: `${groupID}.${entityFolderName}.adapters.persistence.mappers`,
          model,
          modelVarName,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathEntity: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
          databaseEngine
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/DataRepository.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/repositories/${entity.name}DataRepository.java`
        ),
        {
          package: `${groupID}.${entityFolderName}.adapters.persistence.repositories`,
          model,
          pathEntity: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
          databaseEngine
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/RepositoryAdapter.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/repositories/${entity.name}RepositoryAdapter.java`
        ),
        {
          package: `${groupID}.${entityFolderName}.adapters.persistence.repositories`,
          model,
          modelVarName,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathRepo: `${groupID}.${entityFolderName}.ports.driven`,
          pathMapper: `${groupID}.${entityFolderName}.adapters.persistence.mappers`,
          databaseEngine
        }
      );
    });

    enums.forEach(enumDef => {
      const enumName = enumDef.name;
      const values = enumDef.values;

      this.fs.copyTpl(
        this.templatePath("domain/Enum.java.tpl"),
        this.destinationPath(
          `${appName}/domain/${baseDirectoryDest}/enums/${enumName}.java`
        ),
        {
          enumName,
          values,
          package: `${groupID}.enums`
        }
      );
    });
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
