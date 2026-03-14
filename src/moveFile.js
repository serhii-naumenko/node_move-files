/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  const sourceSrc = path.resolve(source);
  let destinationSrc = path.resolve(destination);

  if (!fs.existsSync(sourceSrc)) {
    console.error(`Error: Source file "${sourceSrc}" does not exist.`);

    return;
  }

  // If destination is a directory, move inside it
  const destLooksLikeDir =
    destination.endsWith(path.sep) || destination.endsWith('/');

  if (
    (fs.existsSync(destinationSrc) &&
      fs.lstatSync(destinationSrc).isDirectory()) ||
    destLooksLikeDir
  ) {
    destinationSrc = path.join(destinationSrc, path.basename(sourceSrc));
  }

  // Ensure destination parent directory exists
  const destParent = path.dirname(destinationSrc);

  if (!fs.existsSync(destParent)) {
    console.error(
      `Error: Destination directory "${destParent}" does not exist.`,
    );

    return;
  }

  // If source and destination are the same, do nothing
  if (path.resolve(sourceSrc) === path.resolve(destinationSrc)) {
    return;
  }

  try {
    fs.renameSync(sourceSrc, destinationSrc);
    console.log(`File moved from "${sourceSrc}" to "${destinationSrc}".`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
}

module.exports = { moveFile };
