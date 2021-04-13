import omitBy from 'lodash/fp/omitBy';
import merge from 'lodash/fp/merge';
import pick from 'lodash/fp/pick';
import keys from 'lodash/fp/keys';
import has from 'lodash/fp/has';

const renderView = (viewModel, model) => ({
  nodes: omitBy(
    (value) => value.name === undefined,
    merge(viewModel.nodes, pick(keys(viewModel.nodes), model.objects))
  ),
  links: omitBy(
    (value, key) =>
      !has(value.source, viewModel.nodes) ||
      !has(value.target, viewModel.nodes) ||
      has(key, viewModel.removedLinks),
    model.relations
  ),
});

export default renderView;
