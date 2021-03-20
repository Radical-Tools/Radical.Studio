const c4Metamodel = {
  name: 'C4',
  id: 'C4',
  version: '1.0',
  description: 'C4 metamodel',
  classes: [
    {
      id: 'Actor',
      name: 'Actor',
      attributes: ['technology', 'description'],
    },
    {
      id: 'System',
      name: 'System',
      attributes: ['technology', 'description'],
    },
    {
      id: 'External System',
      name: 'External System',
      attributes: ['technology', 'description'],
    },
    {
      id: 'Container',
      name: 'Container',
      attributes: ['technology', 'description'],
    },
    {
      id: 'Component',
      name: 'Component',
      attributes: ['technology', 'description'],
    },
    {
      id: 'Database',
      name: 'Database',
      attributes: ['technology', 'description'],
    },
  ],
  relations: [
    {
      id: 'Interacts',
      name: 'interacts',
      type: 'n:n',
      pairs: [
        {
          sources: [
            'Actor',
            'System',
            'Container',
            'Component',
            'External System',
          ],
          targets: ['System', 'Container', 'Component', 'External System'],
        },
        {
          sources: ['System', 'Container', 'Component'],
          targets: ['Database'],
        },
      ],
      attributes: ['technology', 'description'],
    },
    {
      id: 'Includes',
      name: 'includes',
      type: '1:n',
      pairs: [
        {
          sources: ['System'],
          targets: ['Container', 'Database'],
        },
        {
          sources: ['Container'],
          targets: ['Component'],
        },
      ],
    },
  ],
  schemas: {
    object: {
      data: {
        title: 'Object',
        type: 'object',
        required: ['name', 'type'],
        properties: {
          id: { type: 'string', title: 'Object Id' },
          name: { type: 'string', title: 'Name' },
          type: {
            type: 'string',
            title: 'Type',
            default: 'Component Type',
            enum: [
              'Actor',
              'System',
              'Container',
              'Component',
              'External System',
              'Database',
            ],
          },
          attributes: {
            type: 'object',
            title: 'Attributes',
            properties: {
              technology: { type: 'string', title: 'Technology' },
              description: { type: 'string', title: 'Description' },
            },
          },
        },
      },
      create: {
        ui: {
          id: {
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
          },
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
          type: {
            'ui:emptyValue': '',
            'ui:autofocus': false,
            'ui:widget': 'radio',
          },
        },
      },
      update: {
        ui: {
          id: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
          },
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
          type: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
          },
        },
      },
    },
    relation: {
      data: {
        title: 'Relation',
        type: 'object',
        required: ['name', 'type'],
        properties: {
          id: { type: 'string', title: 'Id', default: 'Relation Id' },
          name: { type: 'string', title: 'Name', default: 'Component Name' },
          type: {
            type: 'string',
            title: 'Type',
            default: 'Component Type',
            enum: ['Includes', 'Interacts'],
            enumNames: ['Includes', 'Interacts'],
          },
          attributes: {
            type: 'object',
            title: 'Attributes',
            properties: {
              technology: { type: 'string', title: 'Technology' },
              description: { type: 'string', title: 'Description' },
            },
          },
        },
      },
      create: {
        ui: {
          id: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
          },
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
          type: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
          },
        },
      },
      update: {
        ui: {
          id: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
          },
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
          type: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
          },
        },
      },
    },
  },
};

export default c4Metamodel;
