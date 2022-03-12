import React from 'react';
import { render, screen } from '@testing-library/react';

import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';

describe('RadicalComposedNodeWidget', () => {
  it('renders node title with given node width', async () => {
    // muiStyles.styled.mockImplementation(() => ({}));
    const nodeWidth = { width: 200 };
    render(
      <RadicalComposedNodeWidget
        node={{
          width: nodeWidth.width,
          height: 300,
          isSelected: () => false,
          isLocked: () => false,
          getPorts: () => ({}),
          getLinks: () => [],
          getOutgoingLinks: () => [],
          getDescription: () => '',
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

    expect(screen.getByText('Gandalf')).toBeDefined();
    expect(screen.getByText('Gandalf')).toHaveStyle(
      `width: ${nodeWidth.width - 14}px;`
    );
    // expect(muiStyles.styled()).toHaveBeenCalledWith(nodeWidth);
  });
});
