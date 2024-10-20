import {useState, useEffect} from "react";

function useLocalStorage(initialValue: [], key: string) {
    const getValue = () => {
        const storage = localStorage.getItem(key);

        if (storage) {
            return JSON.parse(storage);
        }

        return initialValue;
    }

    const [value, setValue] = useState(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export default useLocalStorage;


// Я неудачник
// Меня зовут Артём, мне 24 года, и я до сих пор ничего не достиг в своей жизни! Я не закончил университет, не получил диплом, а мне ведь оставалось всего лишь сдать два последних экзамена