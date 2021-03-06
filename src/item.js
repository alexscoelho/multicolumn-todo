import React from "react";

import { Draggable } from "react-beautiful-dnd";

const Item = ({ text, index, handleDelete, id, handleEdit }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
          <button
            className="btn btn-light"
            onClick={() => handleDelete(index, id)}
            style={{ marginLeft: "auto" }}
            type="button"
          >
            &times;
          </button>
          <button
            className="btn btn-light"
            onClick={() => handleEdit(text, index, id)}
            type="button"
          >
            ✏️
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
