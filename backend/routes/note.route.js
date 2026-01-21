const express = require("express");
const { createNote, getNotes, deleteNote } = require("../controller/note.controller");
const { authMiddlware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/", authMiddlware, createNote);
router.get("/", authMiddlware, getNotes);
router.delete("/:noteId", authMiddlware, deleteNote);

module.exports = router;
