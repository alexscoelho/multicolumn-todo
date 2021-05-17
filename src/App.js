import React, { useState } from "react";
import Column from "./column";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 5px;
`;

const SubmitButton = styled.input`
  padding: 10px;
  margin-right: 5px;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  :hover {
    background-color: #005bff;
  }
`;

const Form = styled.form`
  margin-left: 10px;
`;

function App() {
  const initialColumns = {
    todo: {
      id: "todo",
      list: ["item 1", "item 2", "item 3"],
    },
    doing: {
      id: "doing",
      list: [],
    },
    done: {
      id: "done",
      list: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");
  const [colName, setColName] = useState("");

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return null;
    if (!isEditing) {
      setColumns({
        ...columns,
        todo: {
          ...columns.todo,
          list: [...columns.todo.list, task],
        },
      });
      setTask("");
    }
    if (isEditing) {
      const targetColumn = columns[colName];
      const newList = targetColumn.list.map((item, i) =>
        i === id ? (item = task) : item
      );
      setColumns((state) => ({
        ...state,
        [targetColumn.id]: {
          ...columns[targetColumn.id],
          list: newList,
        },
      }));
      setTask("");
      setIsEditing(false);
    }
  };

  //delete
  const handleDelete = (index, id) => {
    const targetColumn = columns[id];
    const newList = targetColumn.list.filter((item, i) => i !== index);
    setColumns((state) => ({
      ...state,
      [targetColumn.id]: {
        ...columns[targetColumn.id],
        list: newList,
      },
    }));
  };

  //modify
  const handleEdit = (text, index, colName) => {
    setIsEditing(true);
    setTask(text);
    setId(index);
    setColName(colName);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Add a task"
        />
        <SubmitButton
          type="submit"
          value={isEditing ? "Edit Task" : "Add Task"}
        />
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.values(columns).map((col, index) => (
            <Column
              col={col}
              key={index}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </Container>
      </DragDropContext>
    </>
  );
}

export default App;
