import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import React, { ChangeEventHandler } from 'react';

type SelectProps = {
  label?: string;
  value?: string[];
  onChangeValue: (event: SelectChangeEvent<string[]>) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const membercount = ['2', '3', '4', '5'];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectDropdown({ value, onChangeValue }: SelectProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={value}
          onChange={onChangeValue}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>방 인원을 설정해주세요.</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {membercount.map((membercount) => (
            <MenuItem
              key={membercount}
              value={membercount}
              style={getStyles(membercount, value ?? [], theme)}
            >
              {membercount}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
