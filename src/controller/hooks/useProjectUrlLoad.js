import { useEffect, useState } from 'react';
import {
  NOTIFICATION_TYPE,
  QUERY_STRING_PROJECT_LOCATION,
} from '../../app/consts';

const clearUrl = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
const loadDataFromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob.text();
};
const getProjectLocationFromQueryParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(QUERY_STRING_PROJECT_LOCATION);
};
const loadProjectData = (rawData, onLoadStateFromUrl) => {
  onLoadStateFromUrl(rawData);
  clearUrl();
};

const useProjectUrlLoad = (onLoadStateFromUrl, onAddNotification) => {
  const [isLoadingProject, setLoadingProject] = useState(
    !!getProjectLocationFromQueryParams()
  );
  useEffect(() => {
    const loadProject = async () => {
      let rawData;
      const projectLocation = getProjectLocationFromQueryParams();
      if (!projectLocation) {
        return;
      }
      try {
        rawData = await loadDataFromUrl(projectLocation, onAddNotification);
      } catch (error) {
        onAddNotification(
          `Failed to load project in url (${projectLocation}): ${error.message}`,
          NOTIFICATION_TYPE.ERROR,
          'Api error'
        );
        setLoadingProject(false);
        clearUrl();
      }
      if (rawData) {
        loadProjectData(rawData, onLoadStateFromUrl);
        setLoadingProject(false);
      }
    };
    loadProject();
  }, [onLoadStateFromUrl, onAddNotification]);
  return isLoadingProject;
};
export default useProjectUrlLoad;
