import React from "react";
import styles from "./VinylItem.module.css";

function VinylItem(props) {
  const { vinylType, title, description, aristName, isReleased } =
    props.vinylItem;

  return (
    <li className={styles.item}>
      <h3>
        Title: {title} ({vinylType})
      </h3>
      <p>Description: {description}</p>
      <p>Artist: {aristName}</p>
      <p>IsReleased: {isReleased.toString()}</p>
    </li>
  );
}

export default VinylItem;
