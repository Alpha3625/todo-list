import {useEffect, useState} from 'react';
import {TodoTabs} from './components/TodoTabs/TodoTabs';
import {TodoPanel} from './components/TodoPanel/TodoPanel';
import {IToDo} from './interface/IToDo';
import {TodoList} from './components/TodoList/TodoList';
import { TodoCounter } from './components/TodoCounter/TodoCounter';
import { v4 as uuidv4 } from 'uuid'; 

function App() {
    const [inputTitle, setInputTitle] = useState < string > ('');
    const [inputDescription, setInputDescription] = useState < string > ('');
    const [todoList, setTodoList] = useState < IToDo[] > ([]);
    const [isCompletedScreen, setIsCompletedScreen] = useState < boolean > (false);
    const [currentEdit, setCurrentEdit] = useState < number | null > (null);
    const [currentEditedItem, setCurrentEditedItem] = useState < IToDo | null > (null);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [confirmWindow, setConfirmWindow] = useState<boolean>(false);

    const filteredList = () => {
        switch (filter) {
            case 'active':
                return todoList.filter(item => item.status === 'active');
            case 'completed':
                return todoList.filter(item => item.status === 'completed');
            default:
                return todoList;
        }
    };
    
    const toggleFilter = () => {
        setFilter(prevFilter => {
            if (prevFilter === 'all') return 'active';
            if (prevFilter === 'active') return 'completed';
            return 'all';
        });
    };

    const listLength = filteredList().length;

    // const savedFilter = JSON.parse(localStorage.getItem('listFilter') || 'all');
    // setFilter(savedFilter);  setFilter(filter === 'all' ? 'active': filter === 'active' ? 'completed' : 'all');

    // const savedTodo = JSON.parse(localStorage.getItem('todolist') || '[]');
    // const savedFilter = JSON.parse(localStorage.getItem('listFilter') || ''); 
    // setTodoList(savedTodo);
    // setFilter(savedFilter);

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('todolist') || '[]');
        setTodoList(savedTodo);
    }, []);

    const handleAddTodo = () => {
        if (inputTitle || inputDescription) {
            const newTodo : IToDo = {
                id: uuidv4(),
                status: 'active',
                title: inputTitle,
                description: inputDescription,
                date: '',
                descriptionLength: false
            };
            if (newTodo.title === '') {
                newTodo.title = "Todo title";
            }
            // if (newTodo.description.length > 200) {
            //     newTodo.descriptionLength = true;
            // }
            const updatedTodoArr = [...todoList, newTodo];
            setTodoList(updatedTodoArr);
            localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
            setInputTitle('');
            setInputDescription('');
        }
    };

    const handleDeleteTodo = (id : string) => {
        const reducedList = todoList.filter(item => item.id !== id);
        localStorage.setItem('todolist', JSON.stringify(reducedList));
        setTodoList(reducedList);
    };

    const getCurrentDateTime = () : string => {
        const now = new Date();
        const dd = now.getDate();
        const mm = now.getMonth() + 1;
        const yyyy = now.getFullYear();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const padZero = (num : number) => (num < 10 ? '0' + num : num);

        return `Completed ${padZero(dd)}-${padZero(mm)}-${padZero(yyyy)} at ${padZero(h)}:${padZero(m)}:${padZero(s)}`;
    }

    const handleCompletedTodo = (indexProps: number) => {
        const completedItem = todoList.map((item, index) => index === indexProps ? {...item, status: 'completed', date: getCurrentDateTime()} : item);
        localStorage.setItem('todolist', JSON.stringify(completedItem));
        setTodoList(completedItem);
    };

    const handleEditTodo = (item : IToDo, ind : number) => {
        setCurrentEdit(ind);
        setCurrentEditedItem(item);
    };

    const handleUpdateTitle = (value : string) => {
        if (currentEditedItem) {
            setCurrentEditedItem((prev) => ({...prev !, title: value}));
        }
    };

    const handleUpdateDescription = (value : string) => {
        if (currentEditedItem) {
            setCurrentEditedItem((prev) => ({...prev !, description: value}));
        }
    };

    const handleUpdateTodo = () => {
        if (currentEdit !== null && currentEditedItem) {
            const newToDo = [...todoList];
            newToDo[currentEdit] = currentEditedItem;
            setTodoList(newToDo);
            localStorage.setItem('todolist', JSON.stringify(newToDo));
            setCurrentEdit(null);
            setCurrentEditedItem(null);
        }
    };

    const handleCancelUpdateTodo = (answer: boolean) => {
        if (answer) {
            setConfirmWindow(false);
            setCurrentEdit(null);
            setCurrentEditedItem(null);
        } else {
            setConfirmWindow(false);
        }
    };

    return (
        <div className="main">
            <div className="container">
                <h1 className="main__title">Todo List</h1>
                <div className="todo">
                    <TodoPanel
                        inputTitle={inputTitle}
                        setInputTitle={setInputTitle}
                        inputDescription={inputDescription}
                        setInputDescription={setInputDescription}
                        addTodo={handleAddTodo}/>

                    <div className='tr'>
                        <TodoTabs
                            filter={filter}
                            toggleFilter={toggleFilter}/>
                            
                        <TodoCounter
                            filter={filter}
                            listLength={listLength}
                            typeCounter={isCompletedScreen}
                            setTypeCounter={setIsCompletedScreen}/>
                    </div>

                    <TodoList
                            filteredList={filteredList}
                            deleteTodo={handleDeleteTodo}
                            editTodo={handleEditTodo}
                            completedTodo={handleCompletedTodo}
                            updateTitle={handleUpdateTitle}
                            updateDescription={handleUpdateDescription}
                            updateTodo={handleUpdateTodo}
                            cancelUpdateTodo={setConfirmWindow}
                            currentEdit={currentEdit}
                            currentEditedItem={currentEditedItem}/>
                </div>

                {
                    confirmWindow && (
                        <div className="confirm-window">
                                <h2>Are you sure you want to cancel the update?</h2>
                                <div className="confirm-window__buttons">
                                    <button onClick={() => handleCancelUpdateTodo(true)}>Yes</button>
                                    <button onClick={() => handleCancelUpdateTodo(false)}>No</button>
                                </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default App;