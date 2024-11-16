import {FC} from 'react';
import {TodoItem} from '../TodoListItems/TodoItem';
import {IToDo} from '../../interface/interface';
import {TodoEditPanel} from '../TodoEditPanel/TodoEditPanel';
import styles from './TodoList.module.scss';

interface ITodoListProps {
    todoList: IToDo[];
    deleteTodo: (index: number) => void;
    editTodo: (item: IToDo, index: number) => void;
    completedTodo: (item: IToDo, index: number) => void;
    updateTitle: (value: string) => void;
    updateDescription: (value: string) => void;
    updateTodo: () => void;
    currentEdit: number | null;
    currentEditedItem: IToDo | null;
}

export const TodoList: FC<ITodoListProps> = ({
    todoList,
    deleteTodo,
    editTodo,
    completedTodo,
    updateTitle,
    updateDescription,
    updateTodo,
    currentEdit,
    currentEditedItem
}) => {
    return (
        <ul className={styles["todo-list"]}>
            {
                todoList.map((item, index) => {
                    if (currentEdit === index) {
                        return (
                            <TodoEditPanel
                                handleUpdateTitle={updateTitle}
                                handleUpdateDescription={updateDescription}
                                handleUpdateTodo={updateTodo}
                                currentEditedItem={currentEditedItem} />
                        );
                    } else {
                        return (
                            <TodoItem
                                item={item}
                                index={index}
                                handleDelete={deleteTodo}
                                handleEdit={editTodo}
                                handleCompleted={completedTodo}/>
                        );
                    }
                })
            }
        </ul>
    );
};