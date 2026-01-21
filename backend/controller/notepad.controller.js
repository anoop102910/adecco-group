const notepadModel = require("../model/notepad.model");

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new notepadModel({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await notepadModel.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};
