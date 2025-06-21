const { parseEntities } = require("./entityParser");
const chalk = require("chalk");

/**
 * Creates all base configuration files and modules for the hexagonal project.
 */
function writeProjectBase(
  generator,
  {
    appName,
    groupID,
    globalSnapShot,
    dataBaseEngine,
    DBtype,
    baseDirectoryDest
  }
) {
  // Poms
  generator.fs.copyTpl(
    generator.templatePath("pom.xml.tpl"),
    generator.destinationPath(`${appName}/pom.xml`),
    { appName, groupID, globalSnapShot }
  );

  generator.fs.copyTpl(
    generator.templatePath("application/pom.xml.tpl"),
    generator.destinationPath(`${appName}/application/pom.xml`),
    { appName, groupID, globalSnapShot }
  );

  generator.fs.copyTpl(
    generator.templatePath("domain/pom.xml.tpl"),
    generator.destinationPath(`${appName}/domain/pom.xml`),
    { appName, groupID, globalSnapShot }
  );

  generator.fs.copyTpl(
    generator.templatePath("infrastructure/pom.xml.tpl"),
    generator.destinationPath(`${appName}/infrastructure/pom.xml`),
    { appName, groupID, globalSnapShot, dataBaseEngine, DBtype }
  );

  generator.fs.copyTpl(
    generator.templatePath("shared-kernel/pom.xml.tpl"),
    generator.destinationPath(`${appName}/shared-kernel/pom.xml`),
    { appName, groupID, globalSnapShot }
  );

  generator.fs.copyTpl(
    generator.templatePath("shared-kernel/application-inbound/pom.xml.tpl"),
    generator.destinationPath(
      `${appName}/shared-kernel/application-inbound/pom.xml`
    ),
    { groupID, globalSnapShot }
  );
  // Custom annotation
  generator.fs.copyTpl(
    generator.templatePath(
      "shared-kernel/application-inbound/UseCase.java.tpl"
    ),
    generator.destinationPath(
      `${appName}/shared-kernel/application-inbound/${baseDirectoryDest}/annotations/UseCase.java`
    ),
    { package: `${groupID}.annotations` }
  );

  generator.fs.copyTpl(
    generator.templatePath("infrastructure/Application.java.tpl"),
    generator.destinationPath(
      `${appName}/infrastructure/${baseDirectoryDest}/${appName}App.java`
    ),
    {
      package: `${groupID}`,
      groupID,
      mainClassName: `${appName}App`,
      pathUseCaseAnnotation: `${groupID}.annotations`
    }
  );

  generator.fs.copyTpl(
    generator.templatePath("infrastructure/application.properties.tpl"),
    generator.destinationPath(
      `${appName}/infrastructure/src/main/resources/application.properties`
    ),
    { dataBaseEngine, DBtype }
  );
}

/**
 * Creates all code files derived from the data model definition (entities and enums).
 */
function writeDataModel(
  generator,
  {
    entities,
    enums,
    appName,
    groupID,
    dataBaseEngine,
    DBtype,
    baseDirectoryDest
  }
) {
  entities.forEach(entity => {
    const model = entity.name;
    const modelVarName = model.charAt(0).toLowerCase() + model.slice(1);
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

    // Application module
    generator.fs.copyTpl(
      generator.templatePath("application/UseCase.java.tpl"),
      generator.destinationPath(
        `${appName}/application/${baseDirectoryDest}/${entityFolderName}/ports/driving/${entity.name}UseCase.java`
      ),
      {
        model,
        modelVarName,
        package: `${groupID}.${entityFolderName}.ports.driving`,
        pathModel: `${groupID}.${entityFolderName}.models`
      }
    );

    generator.fs.copyTpl(
      generator.templatePath("application/UseCaseImpl.java.tpl"),
      generator.destinationPath(
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

    // Domain module
    generator.fs.copyTpl(
      generator.templatePath("domain/Model.java.tpl"),
      generator.destinationPath(
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

    generator.fs.copyTpl(
      generator.templatePath("domain/RepositoryPort.java.tpl"),
      generator.destinationPath(
        `${appName}/domain/${baseDirectoryDest}/${entityFolderName}/ports/driven/${entity.name}RepositoryPort.java`
      ),
      {
        model,
        modelVarName,
        package: `${groupID}.${entityFolderName}.ports.driven`,
        pathModel: `${groupID}.${entityFolderName}.models`
      }
    );

    // Infrastructure module
    generator.fs.copyTpl(
      generator.templatePath("infrastructure/adapters/Controller.java.tpl"),
      generator.destinationPath(
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

    generator.fs.copyTpl(
      generator.templatePath("infrastructure/adapters/Entity.java.tpl"),
      generator.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/entities/${entity.name}Entity.java`
      ),
      {
        package: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
        model,
        fields,
        relations,
        relationImports,
        needsListImport,
        dataBaseEngine,
        DBtype
      }
    );

    generator.fs.copyTpl(
      generator.templatePath("infrastructure/adapters/Mapper.java.tpl"),
      generator.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/mappers/${entity.name}Mapper.java`
      ),
      {
        package: `${groupID}.${entityFolderName}.adapters.persistence.mappers`,
        model,
        modelVarName,
        pathModel: `${groupID}.${entityFolderName}.models`,
        pathEntity: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
        dataBaseEngine,
        DBtype,
        relations,
        relationImports
      }
    );

    generator.fs.copyTpl(
      generator.templatePath("infrastructure/adapters/DataRepository.java.tpl"),
      generator.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/repositories/${entity.name}DataRepository.java`
      ),
      {
        package: `${groupID}.${entityFolderName}.adapters.persistence.repositories`,
        model,
        pathEntity: `${groupID}.${entityFolderName}.adapters.persistence.entities`,
        dataBaseEngine,
        DBtype
      }
    );

    generator.fs.copyTpl(
      generator.templatePath(
        "infrastructure/adapters/RepositoryAdapter.java.tpl"
      ),
      generator.destinationPath(
        `${appName}/infrastructure/${baseDirectoryDest}/${entityFolderName}/adapters/persistence/repositories/${entity.name}RepositoryAdapter.java`
      ),
      {
        package: `${groupID}.${entityFolderName}.adapters.persistence.repositories`,
        model,
        modelVarName,
        pathModel: `${groupID}.${entityFolderName}.models`,
        pathRepo: `${groupID}.${entityFolderName}.ports.driven`,
        pathMapper: `${groupID}.${entityFolderName}.adapters.persistence.mappers`,
        dataBaseEngine,
        DBtype
      }
    );
  });

  // Enums
  enums.forEach(enumDef => {
    const enumName = enumDef.name;
    const values = enumDef.values;

    generator.fs.copyTpl(
      generator.templatePath("domain/Enum.java.tpl"),
      generator.destinationPath(
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

/**
 * Main entry point: orchestrates the generation of the entire hexagonal project.
 */
function writeHexagonal(generator) {
  const {
    appName,
    dataBaseEngine,
    DBtype,
    groupID,
    globalSnapShot,
    definitionFile
  } = generator.answers;

  const packagePath = groupID.replace(/\./g, "/");
  const baseDirectoryDest = "src/main/java/" + packagePath;

  writeProjectBase(generator, {
    appName,
    groupID,
    globalSnapShot,
    dataBaseEngine,
    DBtype,
    baseDirectoryDest
  });

  if (definitionFile) {
    let entities;
    let enums;
    try {
      ({ entities, enums } = parseEntities(definitionFile));
    } catch (err) {
      generator.log(`${chalk.hex("#FF0000")("ERROR: " + err.message)}`);
      return;
    }

    writeDataModel(generator, {
      entities,
      enums,
      appName,
      groupID,
      dataBaseEngine,
      DBtype,
      baseDirectoryDest
    });
  }
}

module.exports = {
  writeHexagonal
};
