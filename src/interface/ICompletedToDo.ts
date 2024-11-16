import { IToDo } from "./IToDo";

export interface ICompletedToDo extends IToDo {
    date: string;
}