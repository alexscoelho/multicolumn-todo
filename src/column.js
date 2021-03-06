import React from "react";
import Item from "./item";
import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 230px;
  display: flex;
  flex-direction: column;
  minheight: "120px";
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragginOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

const Column = ({ col: { list, id }, handleDelete, handleEdit }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Container>
          <Title>{id}</Title>
          <TaskList
            style={{
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
          </TaskList>
        </Container>
      )}
    </Droppable>
  );
};

export default Column;
