import { useState } from "react";
import { api } from "../api";

export const CreateNote = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await api.post("/notes", form);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <form className="flex flex-col gap-4" action="" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          value={form.title}
          onChange={v => setForm(p => ({ ...p, ["title"]: v.target.value }))}
          name="title"
          className="border"
          type="text"
        ></input>
        <label htmlFor="">Content</label>
        <textarea
          value={form.content}
          onChange={v => setForm(p => ({ ...p, ["content"]: v.target.value }))}
          name="content"
          className="border"
        ></textarea>
        <button className="bg-green-500 px-4 py-2 ">Submit</button>
      </form>
    </div>
  );
};
