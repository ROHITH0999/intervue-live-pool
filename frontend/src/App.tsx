import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

function App() {
  const role = window.location.pathname === "/student" ? "student" : "teacher";
  return role === "teacher" ? <Teacher /> : <Student />;
}

export default App;
