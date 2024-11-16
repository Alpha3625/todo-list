import { FC } from 'react';
import { SvgSelector } from '../../assets/SvgSelector';
import styles from './TodoItem.module.scss';
import { ICompletedToDo } from '../../interface/ICompletedToDo';

interface ITodoCompletedItemProps {
    item: ICompletedToDo;
    index: number;
    handleDelete: (index: number) => void;
}

export const TodoCompletedItem : FC<ITodoCompletedItemProps> = ({item, index, handleDelete}) => {
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
                <p className={styles["todo-item__text"]}>
                    {item.date}
                </p>
            </div>
            <div className={styles["todo-item__buttons"]}>
                <button onClick={() => handleDelete(index)} title="Delete?">
                    <SvgSelector id="trash"/>
                </button>
            </div>
        </li>
    );
};