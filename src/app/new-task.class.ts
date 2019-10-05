import { ITask } from './task.interface';

export class NewTask implements ITask{
    constructor(
        public taskName: string,
        public comments?: Array<string>
    ){}
}