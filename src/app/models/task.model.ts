import { User } from './user.model';
import { Status } from './status.model';
export class Task{
  id: number;
  name: string;
  deadline: Date;
  status: Status
  user: User;
}
