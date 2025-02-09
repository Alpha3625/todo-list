import { FC } from 'react';
import { IToDo } from '../../interface/IToDo';
import { SvgSelector } from '../../assets/SvgSelector';
import styles from './ListItem.module.scss';

interface ITodoItemProps {
    item: IToDo;
    index: number;
    handleDelete: (id: string) => void;
    handleEdit: (item: IToDo, index: number) => void;
    handleCompleted: (index: number) => void;
}

export const ListItem : FC<ITodoItemProps> = ({item, index, handleDelete, handleEdit, handleCompleted}) => {
    const renderTitle = item.title && (
        <h3 className={styles["list-item__title"]}>{item.title}</h3>
    );

    const renderDescription = item.description && (
        <p
            className={item.descriptionLength
            ? styles.active
            : styles["list-item__text"]}>
            {item.description}
        </p>
    );

    const renderDate = (item.status === 'completed') && (
        <p className={styles["list-item__date"]}>{item.date}</p>
    );

    const renderButtons = (item.status !== 'completed') && (
        <>
            <button onClick={() => handleEdit(item, index)} title="Edit?">
                <SvgSelector id="pencil"/>
            </button>
            <button onClick={() => handleCompleted(index)} title="Complete?">
                <SvgSelector id="check-mark"/>
            </button>
        </>
    )

    return (
        <li className={styles["list-item"]}>
            <div className={styles["list-item__content"]}>
                {renderTitle}
                {renderDescription}
                {renderDate}
            </div>
            <div className={styles["list-item__buttons"]}>
                <button onClick={() => handleDelete(item.id)} title="Delete?">
                    <SvgSelector id="trash"/>
                </button>
                
                {renderButtons}
            </div>
        </li>
    );
};