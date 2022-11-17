import { User } from './user.model';
import { Status } from './status.model';
export class Task{
  id: number;
  description: string;
  status: Status
  user: User;
}
