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
        groupID: `${groupID}.annotations`
      }
    );

    this.fs.copyTpl(
      this.templatePath("infrastructure/Application.java.tpl"),
      this.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${appName}App.java`
      ),
      {
        groupID: `${groupID}`,
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
      const entityName = entity.name;
      const entityVarName =
        entityName.charAt(0).toLowerCase() + entityName.slice(1);
      const entityFolderName = entityName.toLowerCase() + "s";
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
          `${appName}/application/${baseDirectoryDest}/${entityFolderName}/ports/driving/${entityName}UseCase.java`
        ),
        {
          model: entityName,
          entityVarName,
          groupID: `${groupID}.${entityFolderName}.ports.driving`,
          pathModel: `${groupID}.${entityFolderName}.models`
        }
      );

      this.fs.copyTpl(
        this.templatePath("application/UseCaseImpl.java.tpl"),
        this.destinationPath(
          `${appName}/application/${baseDirectoryDest}/${entityFolderName}/usecases/${entityName}UseCaseImpl.java`
        ),
        {
          model: entityName,
          entityVarName,
          groupID: `${groupID}.${entityFolderName}.usecases`,
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
          `${appName}/domain/${baseDirectoryDest}/${entityFolderName}/models/${entityName}.java`
        ),
        {
          model: entityName,
          groupID: `${groupID}.${entityFolderName}.models`,
          fields
        }
      );

      this.fs.copyTpl(
        this.templatePath("domain/Repository.java.tpl"),
        this.destinationPath(
          `${appName}/domain/${baseDirectoryDest}/${entityFolderName}/ports/driven/${entityName}Repository.java`
        ),
        {
          model: entityName,
          entityVarName,
          groupID: `${groupID}.${entityFolderName}.ports.driven`,
          pathModel: `${groupID}.${entityFolderName}.models`
        }
      );

      // Infrastructure Layer
      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Controller.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/rest/${entityName}Controller.java`
        ),
        {
          groupID: `${groupID}.${entityFolderName}.adapters.rest`,
          entityName,
          entityVarName,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathUseCase: `${groupID}.${entityFolderName}.ports.driving`
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Entity.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/entities/${entityName}Entity.java`
        ),
        {
          groupID: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
          model: entityName,
          fields,
          relations,
          relationImports,
          needsListImport
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Mapper.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/mappers/${entityName}Mapper.java`
        ),
        {
          groupID: `${groupID}.${entityFolderName}.adapters.persistence.mappers`,
          entityName,
          entityVarName,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathEntity: `${groupID}.${entityFolderName}.adapters.persistence.entities`
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/Repository.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/repositories/${entityName}JpaRepository.java`
        ),
        {
          groupID: `${groupID}.${entityFolderName}.adapters.persistence.repositories`,
          entityName,
          pathEntity: `${groupID}.${entityFolderName}.adapters.persistence.entities`
        }
      );

      this.fs.copyTpl(
        this.templatePath("infrastructure/adapters/RepositoryAdapter.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/repositories/${entityName}RepositoryAdapter.java`
        ),
        {
          groupID: `${groupID}.${entityFolderName}.adapters.persistence.repositories`,
          entityName,
          entityVarName,
          pathModel: `${groupID}.${entityFolderName}.models`,
          pathRepo: `${groupID}.${entityFolderName}.ports.driven`,
          pathMapper: `${groupID}.${entityFolderName}.adapters.persistence.mappers`
        }
      );
      /*
      this.fs.copyTpl(
        this.templatePath("infrastructure/Config.java.tpl"),
        this.destinationPath(
          `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/config/${entityName}Config.java`
        ),
        {
          entityName,
          entityVarName,
          groupID: `${groupID}.${entityFolderName}.config`,
          useCaseImplPath: `${groupID}.${entityFolderName}.usecases`,
          useCasePath: `${groupID}.${entityFolderName}.ports.driving`,
          entityRepoPath: `${groupID}.${entityFolderName}.ports.driven`
        }
      );*/
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
          groupID: `${groupID}.enums`
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
