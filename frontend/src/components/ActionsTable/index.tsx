import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';

interface MethodInterface {
  startFunction(id: number, watch: boolean): Promise<void>;
  stopFunction(id: number): Promise<void>;
  logFunction(id: number): Promise<void>;
  reloadFunction(id: number, watch: boolean): Promise<void>;
  deleteFunction(id: number): Promise<void>;
}

interface ActionsTableProps {
  methods: MethodInterface;
  id: number;
  watchStatus: boolean;
  statusProcess: boolean;
}

const ActionsTable: React.FC<ActionsTableProps> = ({
  methods,
  id,
  watchStatus,
  statusProcess,
}) => {
  return (
    <>
      <IconButton
        aria-label="log"
        color="primary"
        onClick={() => methods.logFunction(id)}
      >
        <DescriptionIcon />
      </IconButton>

      {statusProcess ? (
        <IconButton
          aria-label="stop"
          color="primary"
          onClick={() => methods.stopFunction(id)}
        >
          <StopIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="start"
          color="primary"
          onClick={() => methods.startFunction(id, watchStatus)}
        >
          <PlayArrowIcon />
        </IconButton>
      )}

      <IconButton
        aria-label="reload"
        color="primary"
        onClick={() => methods.reloadFunction(id, watchStatus)}
      >
        <ReplayIcon />
      </IconButton>

      <IconButton
        aria-label="delete"
        color="primary"
        onClick={() => methods.deleteFunction(id)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default ActionsTable;
