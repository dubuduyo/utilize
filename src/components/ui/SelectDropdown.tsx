import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import React from 'react';

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

export default function SelectDropdown() {
  const theme = useTheme();
  const [roomMemberCount, setRoomMemberCount] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof roomMemberCount>) => {
    const {
      target: { value },
    } = event;
    setRoomMemberCount(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={roomMemberCount}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>방 인원을 설정해주세요.</em>;
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {membercount.map((membercount) => (
            <MenuItem
              key={membercount}
              value={membercount}
              style={getStyles(membercount, roomMemberCount, theme)}
            >
              {membercount}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
