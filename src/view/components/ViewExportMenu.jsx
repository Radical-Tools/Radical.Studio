import React from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import IconButton from '@material-ui/core/IconButton';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { Menu, MenuItem, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';

const ViewExportMenu = ({ name }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDownloadPng = () => {
    const opt = {
      backgroundColor: 'white',
    };

    htmlToImage
      .toPng(document.querySelector('.canvas-view'), opt)
      .then((dataUrl) => {
        download(dataUrl, `${name}.png`);
      });

    setAnchorEl(null);
  };

  const handleDownloadSvg = () => {
    const opt = {
      backgroundColor: 'white',
    };

    htmlToImage
      .toSvg(document.querySelector('.DiagramWidget-view'), opt)
      .then((dataUrl) => {
        download(dataUrl, `${name}.svg`);
      });

    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Export View">
        <IconButton
          size="small"
          onClick={handleClick}
          edge="start"
          color="primary"
        >
          <GetAppRoundedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="view-export-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDownloadPng}>Png</MenuItem>
        <MenuItem onClick={handleDownloadSvg}>Svg</MenuItem>
      </Menu>
    </>
  );
};

ViewExportMenu.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ViewExportMenu;
