import {useEffect, useState} from 'react';
import {TodoTabs} from './components/TodoTabs/TodoTabs';
import {TodoPanel} from './components/TodoPanel/TodoPanel';
import {IToDo} from './interface/IToDo';
import {ICompletedToDo} from './interface/ICompletedToDo';
import {TodoList} from './components/TodoList/TodoList';
import {TodoCompletedList} from './components/TodoList/CompletedTodoList';

function App() {
    const [inputTitle, setInputTitle] = useState < string > ('');
    const [inputDescription, setInputDescription] = useState < string > ('');
    const [todoList, setTodoList] = useState < IToDo[] > ([]);
    const [completedTodoList, setCompletedTodoList] = useState < ICompletedToDo[] > ([]);
    const [isCompletedScreen, setIsCompletedScreen] = useState < boolean > (false);
    const [currentEdit, setCurrentEdit] = useState < number | null > (null);
    const [currentEditedItem, setCurrentEditedItem] = useState < IToDo | null > (null);

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('todolist') || '[]');
        const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodoList') || '[]');
        setTodoList(savedTodo);
        setCompletedTodoList(savedCompletedTodo);
    }, []);

    const handleAddTodo = () => {
        if (inputTitle || inputDescription) {
            const newTodo : IToDo = {
                title: inputTitle,
                description: inputDescription,
                descriptionLength: false
            };
            if (inputDescription.length > 200) {
                newTodo.descriptionLength = true;
            }
            const updatedTodoArr = [...todoList, newTodo];
            setTodoList(updatedTodoArr);
            localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
            setInputTitle('');
            setInputDescription('');
        }
    };

    const handleDeleteTodo = (i : number) => {
        const reducedList = todoList.filter((_, index) => index !== i);
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

    const handleCompletedTodo = (item : IToDo, index : number) => {
        const completedItem : ICompletedToDo = {...item, date: getCurrentDateTime()};
        const updatedCompletedArr = [...completedTodoList, completedItem];
        setCompletedTodoList(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem('completedTodoList', JSON.stringify(updatedCompletedArr));
    };

    const handleDeleteCompletedTodo = (i : number) => {
        const reducedList = completedTodoList.filter((_, index) => index !== i);
        localStorage.setItem("completedTodoList", JSON.stringify(reducedList));
        setCompletedTodoList(reducedList);
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

                    <TodoTabs
                        isCompletedScreen={isCompletedScreen}
                        setIsCompletedScreen={setIsCompletedScreen}/>

                    {!isCompletedScreen
                        ? <TodoList
                                todoList={todoList}
                                deleteTodo={handleDeleteTodo}
                                editTodo={handleEditTodo}
                                completedTodo={handleCompletedTodo}
                                updateTitle={handleUpdateTitle}
                                updateDescription={handleUpdateDescription}
                                updateTodo={handleUpdateTodo}
                                currentEdit={currentEdit}
                                currentEditedItem={currentEditedItem}/>

                        : <TodoCompletedList
                            completedTodoList={completedTodoList}
                            deleteCompletedTodo={handleDeleteCompletedTodo}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default App;