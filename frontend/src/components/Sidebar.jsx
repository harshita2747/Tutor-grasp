import { NavLink } from "react-router-dom";

function Sidebar(){
    return(

    <div className="w-64 bg-violet-950 min-h-screen shadow-2xl p-5">
      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-400 mb-4 pl-1">Tutor Grasp</h1>

      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className="block p-2 rounded hover:bg-violet-900 text-white font-extrabold"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/students"
          className="block p-2 rounded hover:bg-violet-900 text-white font-extrabold"
        >
          Students
        </NavLink>

        <NavLink
          to="/attendance"
          className="block p-2 rounded hover:bg-violet-900  text-white font-extrabold"
        >
          Attendance
        </NavLink>

        <NavLink
          to="/fees"
          className="block p-2 rounded hover:bg-violet-900  text-white font-extrabold"
        >
          Fees
        </NavLink>

         <NavLink
          to="/fees"
          className="block p-2 rounded hover:bg-violet-900  text-white font-extrabold"
        >
          Homework
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;