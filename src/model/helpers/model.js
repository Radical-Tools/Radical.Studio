import difference from 'lodash/fp/difference';
import find from 'lodash/fp/find';
import filter from 'lodash/fp/filter';

export const findRelations = (
  model,
  sourceFilter = ['*'],
  typeFilter = ['*'],
  targetFilter = ['*']
) => {
  const relations = [];
  Object.entries(model.relations).forEach(([id, relation]) => {
    if (
      (sourceFilter.includes(relation.source) || sourceFilter.includes('*')) &&
      (typeFilter.includes(relation.type) || typeFilter.includes('*')) &&
      (targetFilter.includes(relation.target) || targetFilter.includes('*'))
    ) {
      relations.push({ id, ...relation });
    }
  });
  return relations;
};

export const findValidRelationClass = (metamodel, sourceClass, targetClass) =>
  filter(
    (item) =>
      item.pairs.some(
        (pair) =>
          pair.sources.includes(sourceClass) &&
          pair.targets.includes(targetClass)
      ),
    metamodel.relations
  );

// const findObjects = (model, idFilter = ['*'], typeFilter = ['*']) => {
//   const objects = [];
//   Object.values(model.objects).forEach(object => {
//     if ((idFilter.includes(object.id) || idFilter.includes('*')) && (typeFilter.includes(object.type) || typeFilter.includes('*'))) {
//       objects.push(object);
//     }
//   });
//   return objects;
// };

const validateCardinality = (metamodel, model, relation) => {
  const { cardinality } = find(
    (item) => item.id === relation.type,
    metamodel.relations
  );
  switch (cardinality) {
    case '1:1':
      return (
        findRelations(model, ['*'], [relation.type], [relation.target])
          .length === 0 &&
        findRelations(model, [relation.source], [relation.type], ['*'])
          .length === 0
      );
    case '1:n':
      return (
        findRelations(model, ['*'], [relation.type], [relation.target])
          .length === 0
      );
    case 'n:1':
      return (
        findRelations(model, [relation.source], [relation.type], ['*'])
          .length === 0
      );
    default:
      return true;
  }
};

export const validateObjectAttributes = (metamodel, type, attributes) => {
  const objectClass = find((item) => item.id === type, metamodel.classes);
  if (!objectClass) {
    throw new Error(`Incorrect object type: ${type}`);
  }

  if (
    attributes &&
    difference(Object.keys(attributes), objectClass.attributes).length !== 0
  ) {
    throw new Error(`Incorrect object attribute(s): ${attributes}`);
  }

  return true;
};

export const validateRelationAttributes = (metamodel, type, attributes) => {
  const relationClass = find((item) => item.id === type, metamodel.relations);
  if (!relationClass) {
    throw new Error(`Incorrect relation type: ${type}`);
  }

  if (
    attributes &&
    difference(Object.keys(attributes), relationClass.attributes).length !== 0
  ) {
    throw new Error(`Incorrect relation attribute(s): ${attributes}`);
  }

  return true;
};

export const validateRelation = (metamodel, model, relation) => {
  if (!Object.prototype.hasOwnProperty.call(model.objects, relation.source)) {
    throw new Error(`Missing source object:${relation.source} `);
  }

  if (!Object.prototype.hasOwnProperty.call(model.objects, relation.target)) {
    throw new Error(`Missing target object: ${relation.target}`);
  }

  const relations = findRelations(
    model,
    [relation.source],
    [relation.type],
    [relation.target]
  );
  if (relations.length > 0) {
    throw new Error(`Relation already exist: ${relations}`);
  }

  if (!metamodel.relations.find((item) => item.id === relation.type)) {
    throw new Error(`Missing metamodel relation type: ${relation.type}`);
  }

  const source = model.objects[relation.source];
  const target = model.objects[relation.target];

  if (
    relation.type !== 'Includes' &&
    source.children &&
    source.children.includes(relation.target)
  ) {
    throw new Error(`Interaction with child is not allowed: ${source}`);
  }

  if (relation.type !== 'Includes' && source.parent === relation.target) {
    throw new Error(`Interaction with parent is not allowed: ${source}`);
  }

  const { pairs } = find(
    (item) => item.id === relation.type,
    metamodel.relations
  );
  if (
    !pairs.some(
      (pair) =>
        pair.sources.includes(source.type) && pair.targets.includes(target.type)
    )
  ) {
    throw new Error(
      `Incorrect source: ${source.type} or target: ${target.type} class`
    );
  }

  if (!validateCardinality(metamodel, model, relation)) {
    throw new Error('Violated relation cardinality');
  }

  validateRelationAttributes(metamodel, relation.type, relation.attributes);
};

export const validateObject = (metamodel, model, object) => {
  if (!object.name || !object.type) {
    throw new Error(
      'Required object attribute is missing (e.g. id, name, type)'
    );
  }
  validateObjectAttributes(metamodel, object.type, object.attributes);
};

export const findValidRelations = (metamodel, model, source, target) =>
  findValidRelationClass(
    metamodel,
    model.objects[source].type,
    model.objects[target].type
  )
    .map((relation) => relation.id)
    .filter((type) => {
      try {
        validateRelation(metamodel, model, { source, target, type });
      } catch (e) {
        return false;
      }
      return true;
    });
