const { parseEntities } = require("./entityParser");

function writeHexagonal(generator) {
  const {
    appName,
    groupID,
    globalSnapShot,
    definitionFile,
    databaseEngine
  } = generator.answers;
  const { entities, enums } = parseEntities(definitionFile);

  // Convertimos "es.hexagonal" en "es/hexagonal"
  const packagePath = groupID.replace(/\./g, "/");
  const baseDirectoryDest = "src/main/java/" + packagePath;

  // Archivos comunes
  generator.fs.copyTpl(
    generator.templatePath("pom.xml.tpl"),
    generator.destinationPath(`${appName}/pom.xml`),
    {
      appName,
      groupID,
      globalSnapShot
    }
  );
  // Application layer pom
  generator.fs.copyTpl(
    generator.templatePath("application/pom.xml.tpl"),
    generator.destinationPath(`${appName}/application/pom.xml`),
    {
      appName,
      groupID,
      globalSnapShot
    }
  );
  // Domain layer pom
  generator.fs.copyTpl(
    generator.templatePath("domain/pom.xml.tpl"),
    generator.destinationPath(`${appName}/domain/pom.xml`),
    {
      appName,
      groupID,
      globalSnapShot
    }
  );
  // Infrastructure layer pom
  generator.fs.copyTpl(
    generator.templatePath("infrastructure/pom.xml.tpl"),
    generator.destinationPath(`${appName}/infrastructure/pom.xml`),
    {
      appName,
      groupID,
      globalSnapShot,
      databaseEngine
    }
  );
  // Shared kernel pom
  generator.fs.copyTpl(
    generator.templatePath("shared-kernel/pom.xml.tpl"),
    generator.destinationPath(`${appName}/shared-kernel/pom.xml`),
    {
      appName,
      groupID,
      globalSnapShot
    }
  );
  generator.fs.copyTpl(
    generator.templatePath("shared-kernel/application-inbound/pom.xml.tpl"),
    generator.destinationPath(
      `${appName}/shared-kernel/application-inbound/pom.xml`
    ),
    {
      groupID,
      globalSnapShot
    }
  );
  generator.fs.copyTpl(
    generator.templatePath(
      "shared-kernel/application-inbound/UseCase.java.tpl"
    ),
    generator.destinationPath(
      `${appName}/shared-kernel/application-inbound/${baseDirectoryDest}/annotations/UseCase.java`
    ),
    {
      package: `${groupID}.annotations`
    }
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
    {
      databaseEngine
    }
  );

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

    // Application Layer
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

    // Domain Layer
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

    // Infrastructure Layer
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
        databaseEngine
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
        databaseEngine,
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
        databaseEngine
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
        databaseEngine
      }
    );
  });

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

module.exports = {
  writeHexagonal
};
