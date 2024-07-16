'use client';

import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import TodoItem from "../../components/TodoItem";
import { useState } from "react";

export default withPageAuthRequired(function TodoPage() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function addItem() {
        setItems((prevItems) => {
            return [...prevItems, inputText];
        });
        setInputText("");
    }
    function deleteItem(id) {
        setItems((prevItems) => {
            return prevItems.filter((_item, index) => {
                return index !== id;
            });
        });
    }

    const handleSearch = () => {
        const filteredTodos = todos.filter((todo) =>
          todo.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setItems(filteredTodos);
      };
      
  return (
    <div className="taskscontainer">
    <div className="heading">
        <h1>To-Do List</h1>
    </div>
    <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
            <span>Add</span>
        </button>
    </div>
    <div>
        <ul>
            {items.map((todoItem, index) => (
                <TodoItem
                    key={index}
                    id={index}
                    text={todoItem}
                    isChecked={deleteItem}
                />
            ))}
        </ul>
    </div>
    
    </div>
  );
});
