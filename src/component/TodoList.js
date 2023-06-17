import React, { useEffect, useState } from "react";
// import FileSaver from "file-saver";
import "./todo.css";

const TodoList = (e) => {
  const [showless, setShowless] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const [notes, setNotes] = useState([]);
  const random = Math.random();
  // const [title, setTitle] = useState({});
  const [textarea, setTextarea] = useState({
    id: random,
    title: "",
    text: "",
    isChecked: false,
    isCollapsed: false,
  });
  const [isChecked, setIsChecked] = useState(false);

  const { id, title, text } = textarea;
  const onChange = (e) => {
    setTextarea({
      ...textarea,
      id: textarea.id,
      [e.target.name]: e.target.value,
    });
  };
  const addTodoList = () => {
    // console.log(notes)
    if (!text && !title ) {
      console.log("empty");
    } else {
      //   const obj = notes.find((element) => element.id === textarea.id);
      const index = notes.findIndex((item) => item.id === textarea.id);

      if (index !== -1 && isChecked) {
        // const filter = notes.filter((item) => item.id !== textarea.id);
        const cloneNotes = [...notes];
        cloneNotes.splice(index, 1, textarea);
        setNotes([...cloneNotes]);
      } 
      else {
        setNotes((prev) => [...prev, textarea]);
      }
        // setNotes((prev) => [...prev, textarea]);
      setTextarea({ id: random, text: "", title: "" });
    }
  };

  // Edit notes
  const edit = (index) => {
    const obj = notes[index];
    if(!isChecked){
        setTextarea({ ...obj });
    }
    // index .. My Code
    // const arr = notes[index].note;
    // setTextarea((prev) => ({ ...prev, note: arr }));
  };

  // Delete notes
  const deleteNote = (index) => {
    const removeItemFromArray = notes.filter((element, i) => index !== i);
    setNotes(removeItemFromArray);
  };

  const filteredSearch = notes.filter((items) =>
    items.title.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("isChecked", JSON.stringify(isChecked));
  }, [notes, isChecked]);

  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  const storedIsChecked = JSON.parse(localStorage.getItem("isChecked"));

  useEffect(() => {
    if (storedNotes) {
      setNotes(storedNotes);
    }

    if (storedIsChecked) {
      setIsChecked(storedIsChecked);
    }
  }, []);

  const fileName = "note.txt";

  const saveArrayToTextFile = (txt, fileName) => {
    if (!txt) {
      console.log("nothing found");
      return;
    }

    const arrayToStrings = txt.map((obj) => JSON.stringify(obj));
    // console.log(arrayToStrings);

    // Convert the array to String
    const arrayToString = arrayToStrings.join("\n");

    // Create a blob object from the string
    const blob = new Blob([arrayToStrings], { type: "text/plain" });

    // Create a url for the blob object
    const url = URL.createObjectURL(blob);
    // create a link and click it to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    //Clean up the URL object
    URL.revokeObjectURL(url);
  };

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };
const handleCheckboxChange = (id) => {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id
        ? {
            ...note,
            isChecked: !note.isChecked,
            // isCollapsed: note.isCollapsed,
          }
        : note
    )
  );
};

const toggleNote=(id)=>{
     setNotes((prevNotes) =>
       prevNotes.map((note) =>
         note.id === id ? { ...note, isCollapsed: !note.isCollapsed } : note
       )
     );
}
//   const switchfunction = () => {
//     if (!isChecked) {
//         setShowless(true);
//     } else {
//         setShowless(false);
        
//     }
//   };
  // saveArrayToTextFile(notes, fileName);
  // const saveArrayToTextFile =()=>{
  //   // console.log(notes)
  //   const file = new Blob([JSON.stringify(notes,null,2)],{type:'text/plain;charset=utf-8'});
  //   FileSaver.saveAs(file,'notes.txt')
  // }

  return (
    <>
      <div className="note">
        <div className="note__header">
          <h3>Todo List</h3>
          <p>Your todo list are safe here</p>
        </div>
        <div className="d-flex flex-wrap justify-content-center note__section">
          <form className="">
            <div>
              <div className="">
                <input
                  placeholder="Title"
                  name="title"
                  value={textarea.title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="">
                <textarea
                  name="text"
                  // id={textarea.id}
                  placeholder="Task description"
                  cols={20}
                  rows={5}
                  value={textarea.text}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </form>
          <div className="note__button">
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={addTodoList}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div>
            {notes.length && (
              <div className="note__search-content">
                <div>
                  <label>Search Note</label>
                </div>
                <div>
                  <input
                    type="search"
                    name=""
                    id="note__array-searchbar"
                    placeholder="Search Note"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  {!searchTerm ? (
                    <div style={{ color: "white", fontSize: "12px" }}>
                      No search note
                    </div>
                  ) : (
                    filteredSearch.map((search, index) => (
                      <div style={{ color: "white" }} key={index}>
                        {search.title}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ paddingBottom: "50px" }}>
            {notes.map((item, index) => (
              <div key={index} className="p-2 pt-1 my-2 note__array">
                <div className="text-end pb-1">
                  {item.isChecked ? (
                    <div className="">
                      <span
                        className="badge badge-pill badge-success"
                        style={{ backgroundColor: "red" }}
                      >
                        Done
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="note__array-paragraph">
                  <div>
                    <div className="note__array-title">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="note__array-input">
                            {/* status should be toggleable */}
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              //   onClick={() => switchfunction()}
                              //   onChange={handleCheckboxChange}
                              //   checked={isChecked}
                              onClick={() => handleCheckboxChange(item.id)}
                              checked={item.isChecked}
                            />
                          </div>
                          <div
                            className={
                              item.isChecked ? `line-through px-2` : "px-2"
                            }
                          >
                            <h4>{item.title}</h4>
                          </div>
                        </div>

                        <div onClick={() => toggleNote(item.id)}>
                          <i class="fa-sharp fa-solid fa-angle-down"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {item.isCollapsed ? (
                  ""
                ) : (
                  <div className={item.isChecked ? `line-through` : ""}>
                    <div>
                      <p>{item.text}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="">
                        <button
                          className="btn-secondary btn"
                          onClick={() => edit(index)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteNote(index)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => saveArrayToTextFile(notes, fileName)}
            >
              Download Todo list
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
