import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  });

  function removeTask(taskId: string, todolistId: string) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((ts) => ts.id !== taskId),
    });
  }

  function addTask(taskTitle: string, todolistId: string) {
    let newTask = { id: v1(), title: taskTitle, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  }

  function changeTaskStatus(
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((ts) =>
        ts.id === taskId ? { ...ts, isDone } : ts
      ),
    });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((ts) =>
        ts.id === taskId ? { ...ts, title: newTitle } : ts
      ),
    });
  }

  function changeFilter(newFilterValue: FilterValuesType, todolistId: string) {
    setTodolists(
      todolists.map((td) =>
        td.id === todolistId ? { ...td, filter: newFilterValue } : td
      )
    );
  }

  function removeTodolist(todolistId: string) {
    const {
      [todolistId]: [],
      ...restTasks
    } = { ...tasks };

    setTodolists(todolists.filter((td) => td.id !== todolistId));
    setTasks(restTasks);
  }

  function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
    setTodolists(
      todolists.map((td) =>
        td.id === todolistId ? { ...td, title: newTodolistTitle } : td
      )
    );
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: [],
    });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter((t) => t.isDone);
            }

            return (
              <Grid key={tl.id} item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
