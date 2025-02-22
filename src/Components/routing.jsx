import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

//First Sem Subjects
import FirstSem from './subjects/BSC_CSIT/firstSem/firstSemLinker.jsx'
import CProgramming from './subjects/BSC_CSIT/firstSem/CProgramming.jsx'
import DigitalLogic from './subjects/BSC_CSIT/firstSem/Digital-Logic.jsx'
import IIT from './subjects/BSC_CSIT/firstSem/Introduction-to-Information-Technology.jsx'
import Mathematics1 from './subjects/BSC_CSIT/firstSem/Mathematics-I.jsx'
import Physics from './subjects/BSC_CSIT/firstSem/Physics.jsx'


//Fifth Sem Subjects 
import FifthSem from './subjects/BSC_CSIT/fifthSem/fifthSemLinker.jsx'
import Cryptography from './subjects/BSC_CSIT/fifthSem/Cryptography.jsx';
import DAA from './subjects/BSC_CSIT/fifthSem/Design-and-Analysis-of-Algorithms.jsx';
import SAD from './subjects/BSC_CSIT/fifthSem/System-Analysis-and-Design.jsx';
import WebTech from './subjects/BSC_CSIT/fifthSem/Web-Technology.jsx';
import SM from './subjects/BSC_CSIT/fifthSem/Simulation-and-Modeling.jsx';
import Multimedia from './subjects/BSC_CSIT/fifthSem/Multimedia.jsx'

import Classes from './classLInks.jsx'
import AH from './attendanceHistory/lastMonthAttendance.jsx'
import SignUpHandler from './auth/signUp.jsx';


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <SignUpHandler/>,
  },
  {
    path: "/AttendanceHistory",
    element: <AH/>,
  },
  {
    path: "/Bsc_Csit",
    element: <Classes/>,
  },


  //First Sem 
  {
    path: "/Bsc_Csit/firstSem",
    element: <FirstSem />,
  },
  {
    path: "/subject/Bsc_Csit/firstSem/C-Programming",
    element: <CProgramming />,
  },
  {
    path: "/subjects/BSC_CSIT/firstSem/Digital-Logic",
    element: <DigitalLogic />,
  },
  {
    path: "/subjects/BSC_CSIT/firstSem/Introduction-to-Information-Technology",
    element: <IIT />,
  },
  {
    path: "/subjects/BSC_CSIT/firstSem/Mathematics-I",
    element: <Mathematics1 />,
  },
  {
    path: "/subjects/BSC_CSIT/firstSem/Physics",
    element: <Physics />,
  },

  
//Fifth Sem
  {
    path: "/Bsc_Csit/fifthSem",
    element: <FifthSem />,
  },

  {
    path: "/subjects/BSC_CSIT/fifthSem/Cryptography",
    element: <Cryptography />,
  },
  {
    path: "/subjects/BSC_CSIT/fifthSem/DAA",
    element: <DAA />,
  },
  {
    path: "/subjects/BSC_CSIT/fifthSem/SAD",
    element: <SAD />,
  },
  {
    path: "/subjects/BSC_CSIT/fifthSem/WebTechnology",
    element: <WebTech />,
  },
  {
    path: "/subjects/BSC_CSIT/fifthSem/SM",
    element: <SM />,
  },
  {
    path: "/subjects/BSC_CSIT/fifthSem/Multimedia",
    element: <Multimedia />,
  },
]);

export default routes;
