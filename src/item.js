import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: white;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

const Button = styled.button`
  float: right;
  font-size: 15px;
  min-height: 20px;
  border: none;
  margin-right: 2px;
`;

const Item = ({ text, index, handleDelete, id, handleEdit }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {text}
          <Button onClick={() => handleDelete(index, id)}>&times;</Button>
          <Button onClick={() => handleEdit(text, index, id)}>&#9998;</Button>
        </Container>
      )}
    </Draggable>
  );
};

export default Item;
