import * as model from '../model/handlers/model';

const generateTestState = (state) => {
  let newState = model.addObject(state, { name: 'User', type: 'Actor' });
  newState = model.addObject(newState, {
    name: 'Radical Tools',
    type: 'System',
  });
  newState = model.addObject(newState, {
    name: 'Radical Studio',
    type: 'Container',
    attributes: { technology: 'ReactJS' },
  });
  newState = model.addObject(newState, {
    name: 'Radical Hub',
    type: 'Container',
  });
  newState = model.addObject(newState, {
    name: 'Radical Storage',
    type: 'Database',
  });
  newState = model.addObject(newState, {
    name: 'External System',
    type: 'External System',
  });
  newState = model.addObject(newState, { name: 'Canvas', type: 'Component' });
  newState = model.addObject(newState, {
    name: 'Data Grid',
    type: 'Component',
  });
  newState = model.addObject(newState, { name: 'State', type: 'Component' });
  newState = model.addRelation(newState, {
    name: 'Includes',
    type: 'Includes',
    source: 'Radical Tools',
    target: 'Radical Studio',
  });
  newState = model.addRelation(newState, {
    name: 'Includes',
    type: 'Includes',
    source: 'Radical Tools',
    target: 'Radical Hub',
  });
  newState = model.addRelation(newState, {
    name: 'Includes',
    type: 'Includes',
    source: 'Radical Tools',
    target: 'Radical Storage',
  });
  newState = model.addRelation(newState, {
    name: 'Includes',
    type: 'Includes',
    source: 'Radical Studio',
    target: 'Canvas',
  });
  newState = model.addRelation(newState, {
    name: 'Includes',
    type: 'Includes',
    source: 'Radical Studio',
    target: 'Data Grid',
  });
  newState = model.addRelation(newState, {
    name: 'Includes',
    type: 'Includes',
    source: 'Radical Studio',
    target: 'State',
  });
  newState = model.addRelation(newState, {
    name: 'Interacts',
    type: 'Interacts',
    source: 'User',
    target: 'Radical Studio',
  });
  newState = model.addRelation(newState, {
    name: 'Interacts',
    type: 'Interacts',
    source: 'Radical Studio',
    target: 'Radical Hub',
  });
  newState = model.addRelation(newState, {
    name: 'Interacts',
    type: 'Interacts',
    source: 'Radical Hub',
    target: 'Radical Storage',
  });
  newState = model.addRelation(newState, {
    name: 'Interacts',
    type: 'Interacts',
    source: 'External System',
    target: 'Radical Hub',
  });

  return newState;
};

export default generateTestState;
