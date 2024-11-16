import { FC } from 'react';
import styles from './TodoPanel.module.scss';

interface ITodoPanelProps {
    inputTitle: string;
    setInputTitle: (value: string) => void;
    inputDescription: string;
    setInputDescription: (value: string) => void;
    addTodo: (title: string, text: string) => void;
}

export const TodoPanel: FC<ITodoPanelProps> = ({
        inputTitle,
        setInputTitle,
        inputDescription,
        setInputDescription,
        addTodo
    }) => {
    
    return (
        <div className={styles["todo-panel"]}>
            <label className={styles["todo-panel__input-wrapper"]}>
                <span>Title:</span>
                <input
                    type="text"
                    placeholder="What's the title of your To Do?"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)} />
            </label>
            <label className={styles["todo-panel__input-wrapper"]}>
                <span>Description:</span>
                <input
                    type="text"
                    placeholder="What's the description of your To Do?"
                    value={inputDescription}
                    onChange={(e) => setInputDescription(e.target.value)} />
            </label>
            <button
                className={styles["todo-panel__add-button"]}
                onClick={() => addTodo(inputTitle, inputDescription)}>Add To Do</button>
        </div>
    );
};