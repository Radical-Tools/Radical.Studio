import React from 'react';
import { render } from '@testing-library/react';

import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';

// jest.mock('@material-ui/core/styles', () => {
//   const mock = jest.fn();
//   return {
//     makeStyles: () => mock,
//   };
// });

describe('RadicalComposedNodeWidget', () => {
  it('renders node title with given node width', async () => {
    // muiStyles.styled.mockImplementation(() => ({}));
    const nodeWidth = { width: 200 };

    const { getByRole, getByText } = render(
      <RadicalComposedNodeWidget
        node={{
          width: nodeWidth.width,
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
    expect(getByText('Gandalf')).toBeDefined();
    expect(getByText('Gandalf')).toHaveStyle(`width: ${nodeWidth.width}px;`);
    // expect(muiStyles.styled()).toHaveBeenCalledWith(nodeWidth);
  });
});