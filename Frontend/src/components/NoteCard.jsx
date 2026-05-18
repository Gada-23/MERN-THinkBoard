import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios"
import toast from "react-hot-toast"


const NoteCard = ({ note,setNotes }) => {
	
	const handleDelete = async (e,id)=>{
			e.preventDefault(); // get ride of the navigator bahivoir
			
			if(!window.confirm("Are you sure you want to delete this note?")) return;
			
			try{
				
				await api.delete(`/notes/${id}`);
				setNotes((prev)=> prev.filter((note)=>note._id!==id));
				toast.success("Note deleted successfully")
			}catch(e){
				console.log("error to delete the not",e);
				toast.error("failed to delete the note")
			}
			
	};
 
  
  return (
    <Link 
      to={`/notes/${note._id}`} 
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title || "Untitled"}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content || "No content"}</p>
        
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {note.createdAt ? formatDate(note.createdAt) : "No date"}
          </span>
          <div className="flex items-center gap-1">
            {/* Fixed: Pen icon should be inside a button */}
            <button 
              className="btn btn-ghost btn-xs" 
              onClick={(e) => {
                e.preventDefault();
                // Add edit logic here
                console.log("Edit note:", note._id);
              }}
            >
              <PenSquareIcon className="size-4" />
            </button>
            
            <button 
              className="btn btn-ghost btn-xs text-error" 
              onClick= {(e)=> handleDelete(e,note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;