import { Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { boxStyle } from './styles';

interface SelectedItemsActionsPanelProps {
  open: boolean;
  actionClick: () => void;
  selectedCounts: number;
}

const SelectedItemsActionsPanel = (props: SelectedItemsActionsPanelProps) => {
  return (
    <Box sx={boxStyle(props.open)}>
      <Typography>
        <span>({props.selectedCounts})</span> Selected
      </Typography>
      <IconButton
        autoFocus
        color='error'
        aria-label='delete'
        onClick={props.actionClick}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default SelectedItemsActionsPanel;
