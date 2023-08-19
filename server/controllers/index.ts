import { Controllers } from './controllers.model';
import role from './roles/roles';


const start = (): Controllers => {
  return {
    roles: role(),
  };
};

export default start;
