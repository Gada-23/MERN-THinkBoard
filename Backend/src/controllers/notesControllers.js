import Note from "../models/Notes.js"

export async function getAllNote(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notes)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "internal server error" })
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body
    const note = new Note({ title, content });

    const savedNote = await note.save(); // ✅ Fixed: was 'newNote', should be 'note'
    res.status(200).json(savedNote);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server Error" });
  }
}

export async function updateNote(req, res) { // ✅ Fixed: parameters order (req, res)
  try {
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, 
      { title, content }, // ✅ Fixed: was 'titile', now 'title'
      { new: true }
    )
    
    if (!updatedNote) return res.status(404).json({ message: "Note not found" })
    res.status(200).json(updatedNote);
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server Error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "note not found" })
    res.json(note);
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server Error" });
  }
}

export async function deleteNote(req, res) { // ✅ Fixed: parameters order (req, res)
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if (!deletedNote) return res.status(404).json({ message: "Note not Found" });
    
    res.status(200).json(deletedNote);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server Error" });
  }
}