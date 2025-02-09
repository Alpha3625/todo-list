import { FC } from 'react';
import styles from './TodoCounter.module.scss';

interface ITodoCounter {
    filter: string;
    listLength: number;
    typeCounter: boolean;
    setTypeCounter: (typeCounter: boolean) => void;
}

export const TodoCounter: FC<ITodoCounter> = ({listLength, filter}) => {
    return (
        <div className={styles["todo-counter"]}>
            <p className={styles["todo-counter__content"]}>
                <span>
                    {
                        // typeCounter ? `Completed: ${listLength}` : `Current: ${listLength}`
                        `${filter}: ${listLength}`
                    }
                </span>
            </p>
        </div>
    )
}
