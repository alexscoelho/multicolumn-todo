import React from "react";
import Item from "./item";

import { Droppable } from "react-beautiful-dnd";

const Column = ({ col: { list, id }, handleDelete, handleEdit }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>{id}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "120px",
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item
                id={id}
                key={text}
                text={text}
                index={index}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
