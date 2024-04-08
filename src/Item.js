// Item.js
import React, { useState } from "react";

const Item = ({ item, toggleComplete, deleteItem, editItem }) => {
  const { id, name, quantity, complete } = item;
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    editItem(id, editedName, editedQuantity);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedQuantity(quantity);
    setEditMode(false);
  };

  return (
    <li className={`item ${complete ? "complete" : ""}`}>
      {editMode ? (
        <div>
          <input
            type="text"
            className="item-edit"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
            min="1"
            className="quan-edit"
          />
          <br />
          <br />
          <button className="complete-btn" onClick={handleSave}>
            Save
          </button>
          <button className="remove-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            x{quantity} - {name}
          </p>
          <br></br>
          <div>
            <button
              className={`complete-btn ${complete ? "completed" : ""}`}
              onClick={() => toggleComplete(id)}
            >
              {complete ? "Undo" : "Complete"}
            </button>
            <button className="remove-btn" onClick={() => deleteItem(id)}>
              Delete
            </button>
            <button
              className="remove-btn"
              style={{ backgroundColor: "#078bcc" }}
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Item;
