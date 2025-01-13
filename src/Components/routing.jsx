import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Cryptography from './subjects/Cryptography.jsx';
import DAA from './subjects/Design-and-Analysis-of-Algorithms.jsx';
import SAD from './subjects/System-Analysis-and-Design.jsx';
import WebTech from './subjects/Web-Technology.jsx';
import SM from './subjects/Simulation-and-Modeling.jsx';
import SB from './subjectLinks.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Subjects",
    element: <SB/>,
  },
  {
    path: "/Subjects/cryptography",
    element: <Cryptography />,
  },
  {
    path: "/Subjects/DAA",
    element: <DAA />,
  },
  {
    path: "/Subjects/SAD",
    element: <SAD />,
  },
  {
    path: "/Subjects/WebTechnology",
    element: <WebTech />,
  },
  {
    path: "/Subjects/SM",
    element: <SM />,
  },
]);

export default routes;
