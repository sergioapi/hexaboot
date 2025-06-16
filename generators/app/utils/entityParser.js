const fs = require('fs');
const path = require('path');

/**
 * Lee y parsea el archivo de definición de entidades.
 * Marca el lado propietario en las relaciones ManyToMany.
 */
function parseEntities(definitionFilePath) {
  const definitionContent = fs.readFileSync(path.resolve(definitionFilePath), "utf-8");
  const { entities = [], enums = [] } = JSON.parse(definitionContent);

  // Lógica para marcar propietario e inverso en ManyToMany
  entities.forEach(entity => {
    (entity.relations || []).forEach(rel => {
      if (rel.type === "ManyToMany") {
        // Busca la entidad objetivo
        const target = entities.find(e => e.name === rel.targetEntity);
        if (target) {
          // Busca la relación cruzada
          const reverseRel = (target.relations || []).find(
            r => r.type === "ManyToMany" && r.targetEntity === entity.name
          );

          if (reverseRel && rel.owner === undefined && reverseRel.owner === undefined) {
            // Marca como propietario alfabéticamente o por primera aparición (elige tu convención)
            if (entity.name < rel.targetEntity) {
              rel.owner = true;
              reverseRel.owner = false;
              reverseRel.mappedBy = rel.fieldName;
            } else {
              rel.owner = false;
              rel.mappedBy = reverseRel.fieldName;
              reverseRel.owner = true;
            }
          }
        }
      }
    });
  });

  return { entities, enums };
}

module.exports = { parseEntities };
