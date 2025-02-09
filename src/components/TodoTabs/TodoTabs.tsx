import React from 'react';
import styles from './TodoTabs.module.scss';

interface ITodoTabsProps {
    // isCompletedScreen: boolean;
    // setIsCompletedScreen: (isCompletedScreen: boolean) => void;
    filter: string;
    toggleFilter: () => void;
}

export const TodoTabs: React.FC<ITodoTabsProps> = ({filter, toggleFilter}) => {

    return (
        <div className={styles["todo-tabs"]}>
            <button
                // className={!isCompletedScreen ? styles.active : ""}
                onClick={toggleFilter}>{filter}</button>
        </div>
    );
};