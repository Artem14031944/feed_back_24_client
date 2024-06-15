import { ChangeEvent } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type ListItem = {
  id: number,
  value: string,
  label: string,
};

export type TypeSwitchCroup = {
  listFormConrolLabel: ListItem[],
  value: string,
  onChange: (value: string) => void,
};

export default function SwitchCroup(props: TypeSwitchCroup) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value as 'registration'|'login');

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleInputChange}
        value={props.value}
      >
        {props.listFormConrolLabel.map(item => <FormControlLabel key={item.id} value={item.value} control={<Radio />} label={item.label} />)}
      </RadioGroup>
    </FormControl>
  );
};