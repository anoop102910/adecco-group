const noteModel = require("../model/note.model");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      res.json({success: false,message:"title and content is required"})
    }
    const userId = req.userId;
    const newNote = new noteModel({ userId, title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await noteModel.find().where({ userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await noteModel.findOneAndDelete({ _id: req.params.noteId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = req.body;
    if(!note.)
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
    
  }
}