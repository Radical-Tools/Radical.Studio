import { useDrop } from 'react-dnd';
import { MODEL_DROP_TYPE, METAMODEL_DROP_TYPE } from '../consts';

const useDragAndDrop = (
  engine,
  onAddObjectToView,
  onAddMetamodelObjectToView
) =>
  useDrop(() => ({
    accept: [MODEL_DROP_TYPE, METAMODEL_DROP_TYPE],
    drop: (item, monitor) => {
      const dropPoint = engine.getRelativeMousePoint({
        clientX: monitor.getClientOffset().x,
        clientY: monitor.getClientOffset().y,
      });

      const node = engine.getNodeAtPosition(
        monitor.getClientOffset().x,
        monitor.getClientOffset().y
      );
      if (item.type === MODEL_DROP_TYPE) {
        onAddObjectToView(item.id, { ...dropPoint });
      } else {
        onAddMetamodelObjectToView(
          item.metamodelType,
          { ...dropPoint },
          node ? node.getID() : undefined
        );
      }
    },
  }));

export default useDragAndDrop;
