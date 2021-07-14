import React from 'react';
import { render } from '@testing-library/react';
import * as muiStyles from '@material-ui/core/styles';

import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';

jest.mock('@material-ui/core/styles', () => {
  const mock = jest.fn();
  return {
    makeStyles: () => mock,
  };
});

describe('RadicalComposedNodeWidget', () => {
  it('renders node title with given node width', async () => {
    muiStyles.makeStyles().mockImplementation(() => ({}));
    const nodeWidth = { width: '200px' };

    const { getByRole } = render(
      <RadicalComposedNodeWidget
        node={{
          size: {
            ...nodeWidth,
            height: '300px',
          },
          isSelected: () => false,
          getPorts: () => ({}),
          options: {},
        }}
        name="Gandalf"
        isSelected={false}
        isAsymmetric={false}
        isExpanded={false}
        engine={{}}
      >
        <div>test</div>
      </RadicalComposedNodeWidget>
    );

    expect(getByRole('heading')).toBeDefined();
    expect(muiStyles.makeStyles()).toHaveBeenCalledWith(nodeWidth);
  });
});