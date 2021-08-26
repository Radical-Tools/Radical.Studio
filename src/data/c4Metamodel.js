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
      category: 'C4',
    },
    {
      id: 'System',
      name: 'System',
      attributes: ['technology', 'description'],
      category: 'C4',
    },
    {
      id: 'External System',
      name: 'External System',
      attributes: ['technology', 'description'],
      category: 'C4',
    },
    {
      id: 'Container',
      name: 'Container',
      attributes: ['technology', 'description'],
      category: 'C4',
    },
    {
      id: 'Component',
      name: 'Component',
      attributes: ['technology', 'description'],
      category: 'C4',
    },
    {
      id: 'Database',
      name: 'Database',
      attributes: ['technology', 'description'],
      category: 'C4',
    },
    {
      id: 'DomainObject',
      name: 'Domain Object',
      attributes: ['description'],
      category: 'Domain',
    },
  ],
  relations: [
    {
      id: 'Interacts',
      name: 'interacts',
      cardinality: 'n:n',
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
      cardinality: '1:n',
      pairs: [
        {
          sources: ['System'],
          targets: ['Container', 'Database'],
        },
        {
          sources: ['Container'],
          targets: ['Component'],
        },
        {
          sources: ['System'],
          targets: ['System'],
        },
        {
          sources: ['Component'],
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
          id: { type: 'string', title: 'Id' },
          name: { type: 'string', title: 'Name' },
          type: {
            type: 'string',
            title: 'Type',
            default: 'Actor',
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
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
          id: {
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
          },
          type: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
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
          id: { type: 'string', title: 'Id' },
          name: { type: 'string', title: 'Name' },
          type: {
            type: 'string',
            title: 'Type',
            default: 'Component Type',
            enum: ['Includes', 'Interacts'],
            enumNames: ['Includes', 'Interacts'],
          },
          source: {
            type: 'string',
            title: 'Source',
          },
          target: {
            type: 'string',
            title: 'Target',
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
            'ui:widget': 'hidden',
          },
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
          type: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
          },
          source: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
          },
          target: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
          },
        },
      },
    },
    view: {
      data: {
        title: 'View',
        type: 'object',
        required: ['name'],
        properties: {
          id: { type: 'string', title: 'Id' },
          name: { type: 'string', title: 'Name' },
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
        },
      },
      update: {
        ui: {
          id: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
            'ui:disabled': true,
            'ui:widget': 'hidden',
          },
          name: {
            'ui:autofocus': true,
            'ui:emptyValue': '',
          },
        },
      },
    },
  },
};

export default c4Metamodel;
