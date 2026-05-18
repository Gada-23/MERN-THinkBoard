import {useState,useEffect } from "react";
import {useNavigate,useParams} from "react-router";
import toast from "react-hot-toast"; 
import {Link} from "react-router";
import {ArrowLeftIcon, Trash2Icon,LoaderIcon} from "lucide-react";
import api from "../lib/axios";



const NoteDetailPage = ()=>{
	const [note,setNote] = useState(null);
	const [loading,setLoading] = useState(true);
	const [saving,setSaving] = useState(false);
	
	const navigate = useNavigate()
	
	const {id} = useParams();
	
	useEffect (()=>{
		const fetchNote = async() =>{
			try{
				const res = await api.get(`/notes/${id}`)
				setNote(res.data)
			}catch(e){
				toast.error("fail to fetch the Note")
			}finally{
				setLoading(false)
			}
		}
		fetchNote()
	},[id])
	
const handleDelete = async()=>{
	if(!window.confirm("are you sure you want to delete this note" )) return;
	
	try{
		await api.delete(`/notes/${id}`);
		toast.success("Note Deleted");
		navigate("/")
	}catch(e){
		toast.error("Failed to delete note")
	}
};
const handleSave = async ()=>{
	if(!note.title.trim() || !note.content.trim()){
		toast.error("please add a title or content")
		return;
		
	}
	setSaving(true)
	
	try{
		await api.put(`/notes/${id}`,note)
		toast.success("Note updated successfully")
		navigate("/");
	}catch(e){
		toast.error("Failed to update note");
	}finally{
		setSaving(false)
	}
	
}
	
	if(loading){
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-10"/>
			</div>
		);
	}
	
	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className = "max-w-2xl mx-auto ">
					<div className="flex items-center justify-between mb-6">
						<Link to="/" className="btn btn-ghost">
							<ArrowLeftIcon className="h-5 w-5"/>
							Back to Notes
						</Link>
						<button onClick={handleDelete} className="btn btn-error btn-outline"> 
							<Trash2Icon className="h5 w-5"/>
							Delete Note
						</button>
					
					</div>
				</div>
				
				<div className="card bg-base-100">
					<div className="card-body">
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Title</span>
							</label>
							<input 
								type = "text"
								placeholder="note title"
								className="input input-border-bordered"
								value={note.title}
								onchange={(e)=> setNote({...note,title:e.target.value})}
								/>
						</div>
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Content</span>
								
							</label>
							<textarea
								placeholder="write your note here..."
								className="textarea textarea-bordered h32"
								value ={note.content}
								onChange ={(e)=> setNote({...note,content:e.target.value})}
								
							/>
							
						</div>
						
						<div className="card-action justify-end">
							<button className="btn btn-primary" disabled={saving} onClick={handleSave} >
								{saving? "saving...":"save changes"}
							</button>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;