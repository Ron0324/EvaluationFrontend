import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LogInForm } from './Components/Log-In__form/LogInForm';
import { StudentHomepage } from './Components/Home__Page/StudentHomepage';
import { SupervisorHomepage } from './Components/Home__Page/SupervisorHomepage';
import { Homepage } from './Components/Home__Page/Homepage';
import { CreateNewUser } from './Components/NewUserPage/CreateNewUser';
import { Profiling } from './Components/Profiling/Profiling';
import { SignUp } from './Components/SignUp/SignUp';
import { AdminDashBoard } from './Components/Home__Page/AdminDashBoard';
import { Evaluation } from './Components/Evalution/Evaluation';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogInForm />} />
          <Route path="/Login" element={<LogInForm />} />
          <Route path="/Supervisor/hompage" element={<SupervisorHomepage />} />
          <Route path="/Student/hompage" element={<StudentHomepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/Create/new-user/account" element={<CreateNewUser />} />
          <Route path="/User/Profile" element={<Profiling />} />
          <Route path="/Evaltion-Form/Registration" element={<SignUp />} />
          <Route path="/Admin-DashBoard" element={<AdminDashBoard />} />
          <Route path="/Evaluation/:facultyId" element={<Evaluation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
