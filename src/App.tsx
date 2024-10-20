import { useState } from 'react';
import { SvgSelector } from './assets/SVGSelector';

interface IToDo {
    title: string;
    description: string;
    isCompleted: boolean;
}

interface ICompletedToDo extends IToDo {
    date: string;
}

function App() {
    const [inputTitle, setInputTitle] = useState<string>('Doing Workout');
    const [inputDescription, setInputDescription] = useState<string>('I have to do push up at 6 PM');
    const [todos, setTodos] = useState<IToDo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<ICompletedToDo[]>([]);
    const [isCompletedScreen, setIsCompletedScreen] = useState<boolean>(false);
    const [currentEdit, setCurrentEdit] = useState<string | number>("");
    const [currentEditedItem, setCurrentEditedItem] = useState<IToDo[]>([]);

    const handleEdit = (item: IToDo, ind: number) => {
        setCurrentEdit(ind);
        setCurrentEditedItem(item);
    };

    const handleUpdateTitle = (value: string) => {
        setCurrentEditedItem((prev) => {
            return {...prev, title: value};
        });
    };

    const handleUpdateDescription = (value: string) => {
        setCurrentEditedItem((prev) => {
            return {...prev, description: value};
        });
    };

    const handleUpdateToDo = () => {
        const newToDo = [...todos];
        newToDo[currentEdit] = currentEditedItem;
        setTodos(newToDo);
        setCurrentEdit('');
    };

    const add = () => {
        if (inputTitle || inputDescription) {
            const newTodo: IToDo = {
                title: inputTitle,
                description: inputDescription,
                isCompleted: false
            }
            if (inputDescription.length > 50) {
                newTodo.isCompleted = true;
            }
            setTodos([...todos, newTodo]);
            setInputTitle('');
            setInputDescription('');
        }
    };

    const deleteToDo = (i: number) => {
        const reducedList = todos.filter((_, index) => index !== i);
        setTodos(reducedList);
    };

    const getCurrentDateTime = (): string => {
        const now = new Date();
        const padZero = (num: number) => (num < 10 ? '0' + num : num);

        const dd = now.getDate();
        const mm = now.getMonth() + 1;
        const yyyy = now.getFullYear();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();

        return `Completed ${padZero(dd)}-${padZero(mm)}-${padZero(yyyy)} at ${padZero(h)}:${padZero(m)}:${padZero(s)}`;
    }

    const completed = (item: IToDo, index: number) => {
        const completedItem: ICompletedToDo = {
            ...item,
            date: getCurrentDateTime()
        };

        setCompletedTodos([...completedTodos, completedItem]);
        deleteToDo(index);
    };

    const deleteCompletedToDo = (i: number) => {
        const reducedList = completedTodos.filter((_, index) => index !== i);
        setCompletedTodos(reducedList);
    };

    return (
        <div className="container">
            <h1 className="home__title">Todo List</h1>
            <div className="todo">
                <div className="todo__inputs">
                    <label className="todo__input">
                        <span>Title:</span>
                        <input
                            type="text"
                            placeholder="What's the title of your To Do?"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)} />
                    </label>

                    <label className="todo__input">
                        <span>Description:</span>
                        <input
                            type="text"
                            placeholder="What's the description of your To Do?"
                            value={inputDescription}
                            onChange={(e) => setInputDescription(e.target.value)} />
                    </label>

                    <button className="todo__addButton" onClick={add}>Add</button>
                </div>
                <div className="todo__tabs">
                    <button
                        className={!isCompletedScreen ? "todo__tabs>button:first-child active" : "todo__tabs>button:first-child"}
                        onClick={() => setIsCompletedScreen(false)}>To Do</button>

                    <button
                        className={isCompletedScreen ? "todo__tabs>button:last-child active" : "todo__tabs>button:last-child"}
                        onClick={() => setIsCompletedScreen(true)}>Completed</button>
                </div>
                <div className="todo__list">
                    {
                        // todos.length === 0 ? <p className="todo__listPlaceholder">The list is empty</p> :
                        !isCompletedScreen ? todos.map((item, index) => {
                            if (currentEdit === index) {
                                return (
                                    <div className="edit__wrapper" key={index}>
                                        <input
                                            placeholder="Updated Title"
                                            onChange={(e) => handleUpdateTitle(e.target.value)}
                                            value={currentEditedItem.title} />
                                        
                                        <textarea
                                            placeholder="Updated Description"
                                            rows={4}
                                            onChange={(e) => handleUpdateDescription(e.target.value)}
                                            value={currentEditedItem.description} />

                                        <button
                                            className="todo__addButton"
                                            onClick={handleUpdateToDo}>Update</button>
                                    </div>
                                )
                            } else {
                            return (
                                <div className="todo__listItem" key={index}>
                                <div className="todo__listItem-content">
                                    <h3>{item.title}</h3>
                                    <p className={`${(item.isCompleted === true) ? "card__text active" : "card__text"}`}>
                                        {item.description}
                                    </p>
                                </div>
                                <div className="todo__listItem-buttons">
                                    <button onClick={() => deleteToDo(index)} title="Delete?">
                                        <SvgSelector id="trash" />
                                    </button>

                                    <button onClick={() => handleEdit(item, index)} title="Edit?">
                                        <SvgSelector id="pencil" />
                                    </button>

                                    <button onClick={() => completed(item, index)} title="Complete?">
                                        <SvgSelector id="check-mark" />
                                    </button>
                                </div>
                            </div>
                            )}
                        }) :
                        completedTodos.map((item, index) => {
                            return (
                                <div className="todo__listItem" key={index}>
                                <div className="todo__listItem-content">
                                    <h3>{item.title}</h3>
                                    <p className={`${(item.isCompleted === true) ? "card__text active" : "card__text"}`}>
                                        {item.description}
                                    </p>
                                    <p className="currentCompleteDate">{item.date}</p>
                                </div>
                                <div className="todo__listItem-buttons">
                                    <button onClick={() => deleteCompletedToDo(index)} title="Complete?">
                                        <SvgSelector id="trash" />
                                    </button>
                                </div>
                            </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default App;