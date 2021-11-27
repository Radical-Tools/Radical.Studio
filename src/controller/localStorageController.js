import orderBy from 'lodash/orderBy';
import config from '../app/appConfig';

export const getDateOrderedProjectsListFromLocalStorage = () => {
  const projects = Object.entries(localStorage)
    .filter(([key]) => key.startsWith(config.operations.storageKey))
    .map(([key, value]) => {
      const parsedValue = JSON.parse(value);
      return {
        name: key.replace(`${config.operations.storageKey}:`, ''),
        timestamp: parsedValue.timestamp ? parsedValue.timestamp : 0,
      };
    });
  return orderBy(projects, 'timestamp', ['desc']).map(
    (project) => project.name
  );
};

export const getStorageCombinedKey = (name) =>
  `${config.operations.storageKey}:${name || ''}`;

export const removeProjectFromLocalStorage = (name) => {
  const projectKey = getStorageCombinedKey(name);
  localStorage.removeItem(projectKey);
};
