import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cryptography from './Components/subjects/Cryptography.jsx';
import DAA from './Components/subjects/Design-and-Analysis-of-Algorithms.jsx';
import SAD from './Components/subjects/System-Analysis-and-Design.jsx';
import WebTech from './Components/subjects/Web-Technology.jsx';
import SM from './Components/subjects/Simulation-and-Modeling.jsx';
import snscLogo from './assets/logo.png';
import './App.css';
import { Link } from 'react-router-dom';

// Define routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cryptography",
    element: <Cryptography />,
  },
  {
    path: "/DAA",
    element: <DAA />,
  },
  {
    path: "/SAD",
    element: <SAD />,
  },
  {
    path: "/WebTechnology",
    element: <WebTech />,
  },
  {
    path: "/SM",
    element: <SM />,
  },
]);

const subjects = [
  { name: "Cryptography", path: "cryptography" },
  { name: "Design and Analysis of Algorithms", path: "DAA" },
  { name: "System Analysis and Design", path: "SAD" },
  { name: "Simulation and Modeling", path: "SM" },
  { name: "Web Technology", path: "WebTechnology" },
];

function App() {
  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />
      <div className="subjects">
        {subjects.map((subject) => (
          <Link
            to={subject.path}
            key={subject.path}
            aria-label={`Go to ${subject.name} subject`}
          >
            <button className="subject" data-id={subject.name}>
              <h3>{subject.name}</h3>
              <h4>sir</h4>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Root() {
  return (
    <RouterProvider router={routes} />
  );
}

export default Root;
