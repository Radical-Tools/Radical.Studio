import C4Icons from './c4/C4Icons';
import c4Metamodel from './c4/c4Metamodel';
import ERDIcons from './erd/ERDIcons';
import erdMetamodel from './erd/erdMetamodel';

const metamodels = [c4Metamodel, erdMetamodel];
export const metamodelIconsMapping = {
  C4: C4Icons,
  ERD: ERDIcons,
};
export default metamodels;
