import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ApplicationService from '../../common/services/ApplicationService';
import { IAppliacationResponse } from '../../common/models/response/ApplicationResponse';

const ListApplication: FC = () => { 
  const [applications, setApplications] = useState<IAppliacationResponse[]>([]);

  const getApplications = async () => {
    try {
      const respons = await ApplicationService.fetchApllication();  
      console.log(respons.data, 'applications');
      
      // //@ts-ignore
      // setUsers(respons.data?.users);
    } catch (e) {
      console.log(e);
    } 
  };

  return (
    <div>
      <button onClick={getApplications}>Получить заявки</button>
      <div>
        {applications?.map((application: IAppliacationResponse) => {
          return <div key={application.id}>{application.message}</div>
        })}
      </div>
    </div>
  );
};

export default observer(ListApplication);