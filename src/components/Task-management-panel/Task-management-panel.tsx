// import React, { useState } from 'react';
// import styles from './Task-management-panel.module.scss';

// interface ITaskFormProps {
//     onAddTask: (taskTitle: string, taskDescription: string, taskDate: string, taskTime: string) => void;
// }

// const TaskManagementPanel: React.FC<ITaskFormProps> = ({ onAddTask }) => {
//     const [inputTitle, setInputTitle] = useState<string>('');
//     const [inputDescription, setInputDescription] = useState<string>('');
//     const [inputDate, setInputDate] = useState<string>('');
//     const [inputTime, setInputTime] = useState<string>('');

//     const submitTask = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         if (inputTitle || inputDescription) {
//             onAddTask(inputTitle, inputDescription, inputDate, inputTime);
//             setInputTitle('');
//             setInputDescription('');
//             setInputDate('');
//             setInputTime('');
//         }
//     }
    
//     return (
//         <div className={styles.TaskManagementPanel}>
//             <h2>New Task ToDo</h2>
//             <form className={styles.form}>
//                 <label className={styles.inputLabel} htmlFor="title">Title Task</label>
//                 <input
//                     className={styles.inputTitle}
//                     id="title"
//                     type="text"
//                     placeholder="Add Task Name.."
//                     value={inputTitle}
//                     onChange={(event) => setInputTitle(event.target.value)} />

//                 <label className={styles.inputLabel} htmlFor="description">Description</label>
//                 <textarea
//                     className={styles.inputDescription}
//                     id="description"
//                     placeholder="Add Descriptions.."
//                     value={inputDescription}
//                     onChange={(event) => setInputDescription(event.target.value)} />

//                 <div className={styles.form__row}>
//                     <div className={styles.inputWrapper}>
//                         <label className={styles.inputLabel} htmlFor="date">Date</label>
//                         <input
//                             className={styles.inputDate}
//                             id="date"
//                             type="date"
//                             value={inputDate}
//                             onChange={(event) => setInputDate(event.target.value)} />
//                     </div>

//                     <div className={styles.inputWrapper}>
//                         <label className={styles.inputLabel} htmlFor="time">Time</label>
//                         <input
//                             className={styles.inputTime}
//                             id="time"
//                             type="time"
//                             value={inputTime}
//                             onChange={(event) => setInputTime(event.target.value)} />
//                     </div>
//                 </div>

//                 <div className={styles.form__row}>
//                     <button
//                         className={styles.cancelButton}
//                         onClick={submitTask}>Cancel</button>

//                     <button
//                         className={styles.createButton}
//                         onClick={submitTask}>Create</button>
//                 </div>
//             </form>
//         </div>
//     )
// };

// export default TaskManagementPanel;