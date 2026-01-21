import { useAuth } from "../context/AuthContextProvider";
import { CreateNote } from "./CreateNote";
import { NoteList } from "./NoteList";

export const NotepadPage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <header>
        <button onClick={handleLogout} className="bg-green-600 px-4 py-2">
          Logout
        </button>
      </header>
      <div className="flex gap-10 justify-between p-10">
        <CreateNote />
        <NoteList />
      </div>
    </div>
  );
};
