import React from 'react';
import styles from './TodoTabs.module.scss';

interface ITodoTabsProps {
    isCompletedScreen: boolean;
    setIsCompletedScreen: (isCompletedScreen: boolean) => void;
}

export const TodoTabs: React.FC<ITodoTabsProps> = ({isCompletedScreen, setIsCompletedScreen}) => {
    return (
        <div className={styles["todo-tabs"]}>
            <button
                className={!isCompletedScreen ? styles.active : ""}
                onClick={() => setIsCompletedScreen(false)}>To Do</button>
            <button
                className={isCompletedScreen ? styles.active : ""}
                onClick={() => setIsCompletedScreen(true)}>Completed</button>
        </div>
    );
};