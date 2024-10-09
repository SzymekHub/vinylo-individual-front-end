import React, { useState } from "react";

function InputVinyl(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aristName, setAristName] = useState("");
  const [vinylType, setVinylType] = useState("");
  const [isReleased, setIsReleased] = useState(false); // Initialize as false

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Call the addItem function passed via props
    props.addItem(title, description, aristName, vinylType, isReleased);

    // Clear the input field after submission
    setTitle("");
    setDescription("");
    setAristName("");
    setVinylType("");
    setIsReleased(false);
  };

  const textChanged = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field based on the input name
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "aristName":
        setAristName(value);
        break;
      case "vinylType":
        setVinylType(value);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (e) => {
    setIsReleased(e.target.checked); // Update isReleased state based on checkbox
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        className="input-text"
        placeholder="Title"
        value={title}
        onChange={textChanged}
      />
      <input
        type="text"
        name="description"
        className="input-text"
        placeholder="Description"
        value={description}
        onChange={textChanged}
      />
      <input
        type="text"
        name="aristName"
        className="input-text"
        placeholder="Artist Name"
        value={aristName}
        onChange={textChanged}
      />
      <input
        type="text"
        name="vinylType"
        className="input-text"
        placeholder="Vinyl Type"
        value={vinylType}
        onChange={textChanged}
      />
      <label>
        <input
          type="checkbox"
          checked={isReleased}
          onChange={handleCheckboxChange}
        />
        Is Released
      </label>
      <button className="input-submit">Submit</button>
    </form>
  );
}

export default InputVinyl;
