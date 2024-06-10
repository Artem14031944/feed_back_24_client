import { ChangeEvent } from 'react';
import { FormControl, InputLabel, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import MenuItem from '@mui/material/MenuItem';
import './style.css';

type ListItem = {
  id: number,
  value: string,
  label: string,
};

type TypeFiledsForm = {
  listRoles: ListItem[],
  typeAuth: string,
  email: string,
  name: string,
  role: string,
  password: string,
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void,
  handleName: (e: ChangeEvent<HTMLInputElement>) => void,
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void,
  handleRole: (e: SelectChangeEvent) => void,
};

const FiledsForm = (props: TypeFiledsForm) => {
  const { 
    typeAuth, email, name,
    role, password, listRoles,
    handleEmail,handleName,
    handlePassword, handleRole
  } = props;

  return (
    <div className='fileds_form'>
      <TextField size='small' type='text' value={email} onChange={handleEmail} placeholder='Email'/>
      {typeAuth === 'registration' && <TextField size='small' type='text' value={name} onChange={handleName} placeholder='Имя'/>}
      {typeAuth === 'registration' && <FormControl size="small">
        <InputLabel id="demo-select-small-label">Роль</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={role}
          label="Роль"
          onChange={handleRole}
        >
          {listRoles.map(item => <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>)}
        </Select>
      </FormControl>
      }
      <TextField size='small' type='password' value={password} onChange={handlePassword} placeholder='Пароль'/>
    </div>
  );
};

export default observer(FiledsForm);