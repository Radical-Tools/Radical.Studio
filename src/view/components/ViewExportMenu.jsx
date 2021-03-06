import React from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import PropTypes from 'prop-types';

const ViewExportMenu = ({ name }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDownloadPng = (pixelRatio = 1) => {
    const opt = {
      backgroundColor: 'white',
      pixelRatio,
    };

    htmlToImage
      .toPng(document.querySelector('.canvas-view'), opt)
      .then((dataUrl) => {
        download(dataUrl, `${name}.png`);
      });

    setAnchorEl(null);
  };

  const handleDownloadJpg = (pixelRatio = 1) => {
    const opt = {
      backgroundColor: 'white',
      pixelRatio,
    };

    htmlToImage
      .toJpeg(document.querySelector('.canvas-view'), opt)
      .then((dataUrl) => {
        download(dataUrl, `${name}.jpg`);
      });

    setAnchorEl(null);
  };

  const handleDownloadSvg = () => {
    const opt = {};

    htmlToImage
      .toSvg(document.querySelector('.canvas-view'), opt)
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
      <Tooltip title="Export the View">
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
        <MenuItem onClick={() => handleDownloadPng()}>png (standard)</MenuItem>
        <MenuItem onClick={() => handleDownloadPng(5)}>png (high-res)</MenuItem>
        <MenuItem onClick={() => handleDownloadJpg()}>jpeg (standard)</MenuItem>
        <MenuItem onClick={() => handleDownloadJpg(5)}>
          jpeg (high-res)
        </MenuItem>
        <MenuItem onClick={handleDownloadSvg}>svg</MenuItem>
      </Menu>
    </>
  );
};

ViewExportMenu.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ViewExportMenu;
