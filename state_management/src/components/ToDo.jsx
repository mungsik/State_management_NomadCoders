function ToDo({ text, category }) {
  const onClick = (newCategory) => {};
  return (
    <li>
      <span>{text}</span>
      {/* If the category is NOT Doing then we will show the button to move the toDo to the Doing category. */}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
