import {FC} from 'react';
import {ICompletedToDo} from '../../interface/interface';
import {TodoCompletedItem} from '../TodoListItems/TodoCompletedItem';
import styles from './TodoList.module.scss';

interface ITodoCompletedListProps {
    completedTodoList : ICompletedToDo[];
    deleteCompletedTodo : (index : number) => void;
}

export const TodoCompletedList : FC < ITodoCompletedListProps > = ({completedTodoList, deleteCompletedTodo}) => {
    return (
        <ul className={styles["todo-list"]}>
            {
                completedTodoList.map((item, index) => {
                    return (
                        <TodoCompletedItem
                            item={item}
                            index={index}
                            handleDelete={() => deleteCompletedTodo(index)} />
                    );
                })
            }
        </ul>
    );
};
