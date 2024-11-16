import { FC } from 'react';
import { IToDo } from '../../interface/IToDo';
import { SvgSelector } from '../../assets/SvgSelector';
import styles from './TodoItem.module.scss';

interface ITodoItemProps {
    item: IToDo;
    index: number;
    handleDelete: (index: number) => void;
    handleEdit: (item: IToDo, index: number) => void;
    handleCompleted: (item: IToDo, index: number) => void;
}

export const TodoItem : FC<ITodoItemProps> = ({item, index, handleDelete, handleEdit, handleCompleted}) => {
    return (
        <li className={styles["todo-item"]}>
            <div className={styles["todo-item__content"]}>
                <h3 className={styles["todo-item__title"]}>{item.title}</h3>
                <p
                    className={item.descriptionLength
                    ? styles.active
                    : styles["todo-item__text"]}>
                    {item.description}
                </p>
            </div>
            <div className={styles["todo-item__buttons"]}>
                <button onClick={() => handleDelete(index)} title="Delete?">
                    <SvgSelector id="trash"/>
                </button>
                <button onClick={() => handleEdit(item, index)} title="Edit?">
                    <SvgSelector id="pencil"/>
                </button>
                <button onClick={() => handleCompleted(item, index)} title="Complete?">
                    <SvgSelector id="check-mark"/>
                </button>
            </div>
        </li>
    );
};