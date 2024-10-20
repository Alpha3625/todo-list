// import React, { useState } from 'react';
// import styles from './Card.module.scss';
// import { ITask } from '../../App';

// interface ICardProps {
//     props: ITask;
// }

// const Card: React.FC<ICardProps> = ({ props }) => {
//     const [isActive, setIsActive] = useState(false);
    
//     return (
//         <li className={styles.card}>
//             <button
//                 className={isActive ? styles.card__button_active : styles.card__button}
//                 onClick={() => setIsActive(!isActive)}
//                 title="Done button">
//                 <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="auto" height="auto" fill="white">
//                     <path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"/>
//                 </svg>
//             </button>
//             <h3 className={isActive ? styles.card__title_active : styles.card__title}>{props.title}</h3>
//             <p className={isActive ? styles.card__text_active : styles.card__text}>{props.description}</p>
//             <p className={styles.card__date}>
//             <span>Today {props.date}</span>
//             <span>10:00 PM - 11:45 PM</span>
//             </p>
//         </li>
//     )
// };

// export default Card;