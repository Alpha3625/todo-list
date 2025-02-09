import {FC} from 'react';
import {TodoEditPanel} from '../TodoEditPanel/TodoEditPanel';
import styles from './TodoList.module.scss';
import { ListItem } from '../ListItem/ListItem';
import { IToDo } from '../../interface/IToDo';

interface ITodoListProps {
    filteredList: () => IToDo[];
    deleteTodo: (id: string) => void;
    editTodo: (item: IToDo, index: number) => void;
    completedTodo: (index: number) => void;
    updateTitle: (value: string) => void;
    updateDescription: (value: string) => void;
    updateTodo: () => void;
    cancelUpdateTodo: (value: boolean) => void;
    currentEdit: number | null;
    currentEditedItem: IToDo | null;
}

export const TodoList: FC<ITodoListProps> = ({
    filteredList,
    deleteTodo,
    editTodo,
    completedTodo,
    updateTitle,
    updateDescription,
    updateTodo,
    cancelUpdateTodo,
    currentEdit,
    currentEditedItem
}) => {
    return (
        <ul className={styles["todo-list"]}>
            {
                filteredList().length === 0 ? (
                    <li className={styles["todo-list__alt"]}>
                        The list is empty
                    </li>
                ) : (
                    filteredList().map((item, index) => {
                        if (currentEdit === index) {
                            return (
                                <TodoEditPanel
                                    handleUpdateTitle={updateTitle}
                                    handleUpdateDescription={updateDescription}
                                    handleUpdateTodo={updateTodo}
                                    cancelUpdate={cancelUpdateTodo}
                                    currentEditedItem={currentEditedItem} currentEdit={null} />
                            );
                        } else {
                            return (
                                <ListItem
                                    item={item}
                                    index={index}
                                    key={index}
                                    handleDelete={deleteTodo}
                                    handleEdit={editTodo}
                                    handleCompleted={completedTodo}/>
                            );
                        }
                    })
                )
            }
        </ul>
    );
};