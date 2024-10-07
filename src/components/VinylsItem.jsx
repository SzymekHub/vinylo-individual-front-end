import React from "react";
import styles from "./TodoItem.module.css";

function TodoItem(props) {
  return <li className={styles.item}>{props.todoItem.title}</li>;
}

export default TodoItem;
