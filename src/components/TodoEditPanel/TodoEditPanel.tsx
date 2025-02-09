import { FC, useState } from 'react';
import styles from './TodoEditPanel.module.scss';
import { IToDo } from '../../interface/IToDo';

interface ITodoEditPanel {
    handleUpdateTitle : (value : string) => void;
    handleUpdateDescription : (value : string) => void;
    handleUpdateTodo : () => void;
    cancelUpdate : (value: boolean) => void;
    currentEdit: number | null;
    currentEditedItem: IToDo | null;
}

export const TodoEditPanel: FC<ITodoEditPanel> = ({handleUpdateTitle, handleUpdateDescription, handleUpdateTodo, currentEditedItem, cancelUpdate}) => {
    return (
        <div className={styles["todo-edit-panel"]}>
            <input
                placeholder="Updated Title"
                onChange={(e) => handleUpdateTitle(e.target.value)}
                value={currentEditedItem?.title}/>
            <textarea
                placeholder="Updated Description"
                rows={4}
                onChange={(e) => handleUpdateDescription(e.target.value)}
                value={currentEditedItem?.description}/>
                <div className={styles["todo-edit-panel__buttons"]}>
                    <button onClick={handleUpdateTodo}>Update</button>
                    <button onClick={() => cancelUpdate(true)}>Cancel</button>
                </div>
        </div>
    );
};