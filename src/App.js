// App.js
import "./App.css";
// App.js
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import DropdownMenu from "./DropdownMenu";

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Default");

  const addList = (listName, quantity) => {
    const newItem = {
      id: Math.random(),
      name: listName,
      quantity: quantity,
      complete: false,
    };
    setItems([...items, newItem]);
  };

  const toggleComplete = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const editItem = (id, newName, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, name: newName, quantity: newQuantity }
          : item
      )
    );
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const getFilteredItems = () => {
    switch (filter) {
      case "Active":
        return items.filter((item) => !item.complete);
      case "Completed":
        return items.filter((item) => item.complete);
      case "All":
      default:
        return items;
    }
  };

  const getSortedItems = (items) => {
    switch (sort) {
      case "Alphabetical":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case "ByQuantity":
        return [...items].sort((a, b) => a.quantity - b.quantity);
      case "ByStatus":
        return [...items].sort((a, b) => {
          // Uncompleted items first, completed items last
          if (a.complete && !b.complete) return 1;
          if (!a.complete && b.complete) return -1;
          return 0;
        });
      case "Default":
      default:
        return items;
    }
  };

  const calculateCompletionPercentage = () => {
    if (items.length === 0) return 0;
    const completedCount = items.filter((item) => item.complete).length;
    return ((completedCount / items.length) * 100).toFixed(2);
  };

  return (
    <div className="app-container">
      <div className="App">
        <h1 className="text-primary">To Do List</h1>
        <SearchBar addList={addList} />
        <h4>Your Progress: {calculateCompletionPercentage()}%</h4>

        <DropdownMenu
          onChange={handleFilterChange}
          options={["All", "Active", "Completed"]}
        />
        <DropdownMenu
          onChange={handleSortChange}
          options={["Default", "Alphabetical", "By Quantity", "By Status"]}
        />
        <button
          className="complete-btn"
          style={{ backgroundColor: "#001a3d" }}
          onClick={handleClearAll}
        >
          Clear All
        </button>
        <br />
        <br />
        <ItemList
          items={getSortedItems(getFilteredItems())}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </div>
    </div>
  );
}

export default App;
