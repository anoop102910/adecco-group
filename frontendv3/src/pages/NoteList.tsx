import { useEffect, useState } from "react";
import { api } from "../api";

export const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await api.get("/notes");
      console.log(res);
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  const handleDelete = async noteId => {
    try {
      const res = await api.delete(`/notes/${noteId}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!notes) return <div>Loading...</div>;
  return (
    <div className="border p-6 w-200">
      {notes.map(note => (
        <div key={note._id} className="border p-4 my-2 relative">
          <button
            onClick={() => handleDelete(note._id)}
            className="absolute top-4 right-6 bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
          <h2 className="font-bold">{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};
