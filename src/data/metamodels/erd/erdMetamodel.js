const erdMetamodel = {
  name: 'ERD',
  id: 'ERD',
  version: '1.0',
  description: 'ERD Metamodel',
  classes: [
    {
      id: 'Entity',
      name: 'Entity',
      attributes: ['description'],
      category: 'ERD',
    },
  ],
  relations: [
    {
      id: 'Action',
      name: 'action',
      cardinality: 'n:n',
      pairs: [
        {
          sources: ['Entity'],
          targets: ['Entity'],
        },
      ],
      attributes: ['description'],
    },
    {
      id: 'Includes',
      name: 'includes',
      cardinality: '1:n',
      pairs: [
        {
          sources: ['Entity'],
          targets: ['Entity'],
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
            default: 'Entity',
            enum: ['Entity'],
          },
          attributes: {
            type: 'object',
            title: 'Attributes',
            properties: {
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

export default erdMetamodel;
