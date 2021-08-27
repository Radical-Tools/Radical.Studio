import React from 'react';
import { render } from '@testing-library/react';
import * as muiStyles from '@material-ui/styles';

import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';

jest.mock('@material-ui/styles', () => {
  const mock = jest.fn();
  return {
    makeStyles: () => mock,
  };
});

describe('RadicalComposedNodeWidget', () => {
  it('renders node title with given node width', async () => {
    muiStyles.makeStyles().mockImplementation(() => ({}));
    const nodeWidth = { width: 200 };

    const { getByRole } = render(
      <RadicalComposedNodeWidget
        node={{
          width: 200,
          height: 300,
          isSelected: () => false,
          isLocked: () => false,
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
