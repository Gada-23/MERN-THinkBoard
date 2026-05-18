import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import NoteCard from "../components/NoteCard"; // 1. Added missing import
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteNotFound from "../components/NoteNotFound";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setRateLimited(false);
      } catch (e) {
        console.log("fetching error", e);
        if (e.response?.status === 429) { // 2. Added optional chaining for safety
          setRateLimited(true);
        } else {
          toast.error("fail to load");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
      
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        
        {/* 3. Fixed notes.length typo */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/> // 4. Used () for implicit return
            ))}
          </div>
        )}

        {notes.length ===0 && !isRateLimited && <NoteNotFound/>} 
      </div>
    </div>
  );
};

export default HomePage;
