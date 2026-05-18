import { Route, Routes } from "react-router";
import { Toaster } from 'react-hot-toast'; // ✅ Added Toaster import
import toast from 'react-hot-toast';

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div className="relative h-full w-full">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
      [background:radial-gradient(125%_125%_at_50%_10,#000_60%,#00FF9D40_100%)]">
      </div>

      {/* Content Layer */}
      <main className="relative z-10">
        <Toaster /> {/* ✅ Add Toaster component to display toast notifications */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;