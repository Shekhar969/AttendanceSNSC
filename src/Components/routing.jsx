import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

//First Sem Subjects
import FirstSem from './subjects/BSC_CSIT/firstSem/firstSemLinker.jsx'
import CProgramming from './subjects/BSC_CSIT/firstSem/CProgramming.jsx'
import DigitalLogic from './subjects/BSC_CSIT/firstSem/Digital-Logic.jsx'
import IIT from './subjects/BSC_CSIT/firstSem/Introduction-to-Information-Technology.jsx'
import Mathematics1 from './subjects/BSC_CSIT/firstSem/Mathematics-I.jsx'
import Physics from './subjects/BSC_CSIT/firstSem/Physics.jsx'

//Third Sem Subjects
import ThirdSem from './subjects/BSC_CSIT/thirdSem/thirdSemLinker.jsx'
import ComputerArchitecture from './subjects/BSC_CSIT/thirdSem/Computer-Architecture.jsx'
import ComputerGraphics from './subjects/BSC_CSIT/thirdSem/Computer-Graphics.jsx'
import DataStructureandAlgorithm from './subjects/BSC_CSIT/thirdSem/Data-Structure-and-Algorithm.jsx'
import NumericalMethod from './subjects/BSC_CSIT/thirdSem/Numerical-Method.jsx'
import StatisticsII from './subjects/BSC_CSIT/thirdSem/Statistics-II.jsx'

//Fifth Sem Subjects 
import FifthSem from './subjects/BSC_CSIT/fifthSem/fifthSemLinker.jsx'
import Cryptography from './subjects/BSC_CSIT/fifthSem/Cryptography.jsx';
import DAA from './subjects/BSC_CSIT/fifthSem/Design-and-Analysis-of-Algorithms.jsx';
import SAD from './subjects/BSC_CSIT/fifthSem/System-Analysis-and-Design.jsx';
import WebTech from './subjects/BSC_CSIT/fifthSem/Web-Technology.jsx';
import SM from './subjects/BSC_CSIT/fifthSem/Simulation-and-Modeling.jsx';
import Multimedia from './subjects/BSC_CSIT/fifthSem/Multimedia.jsx'

//Seventh Sem Subjects
import SeventhSem from "./subjects/BSC_CSIT/seventhSem/seventhSemLinker.jsx"
import AdvancedJavaProgramming from './subjects/BSC_CSIT/seventhSem/Advanced-Java-Programming.jsx'
import DatabaseAdministrator from './subjects/BSC_CSIT/seventhSem/Database-Administrator.jsx'
import InternationalMarketing from './subjects/BSC_CSIT/seventhSem/International-Marketing.jsx'
import NetworkSecurity from './subjects/BSC_CSIT/seventhSem/Network-Security.jsx'
import ProjectWork from './subjects/BSC_CSIT/seventhSem/Project-Work.jsx'


import Assignment from "./subjects/BSC_CSIT/AssignmentHandeler.jsx";
import Classes from './classLInks.jsx'
import AH from './attendanceHistory/lastMonthAttendance.jsx'
import SignUpHandler from './auth/signUp.jsx';
import NotesClasses  from './NotesClassLink.jsx';


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
  {
    path: "/BSC_CSIT/:semester/:subject/AssignmentHandler",
    element: <Assignment />,
  },
  {
    path:"/AllSubjects",
    element: <NotesClasses/>,
  },
  


  //First Sem 
  {
    path: "/Bsc_Csit/firstSem",
    element: <FirstSem />,
  },
  {
    path: "/Bsc_Csit/firstSem/C-Programming",
    element: <CProgramming />,
  },
  {
    path: "//Bsc_Csit/firstSem/Digital-Logic",
    element: <DigitalLogic />,
  },
  {
    path: "/Bsc_Csit/firstSem/Introduction-to-Information-Technology",
    element: <IIT />,
  },
  {
    path: "/Bsc_Csit/firstSem/Mathematics-I",
    element: <Mathematics1 />,
  },
  {
    path: "//Bsc_Csit/firstSem/Physics",
    element: <Physics />,
  },

//Third Sem
  {
    path:"/Bsc_Csit/thirdSem",
    element:<ThirdSem/>
  },
  {
    path:"/Bsc_Csit/thirdSem/Computer-Architecture",
    element:<ComputerArchitecture/>
  },
  {
    path:"/Bsc_Csit/thirdSem/Computer-Graphics",
    element:<ComputerGraphics/>
  },
  {
    path:"/Bsc_Csit/thirdSem/Data-Structure-and-Algorithm",
    element:<DataStructureandAlgorithm/>
  },
  {
    path:"/Bsc_Csit/thirdSem/Numerical-Method",
    element:<NumericalMethod/>
  },
  {
    path:"/Bsc_Csit/thirdSem/Statistics-II",
    element:<StatisticsII/>
  },
//Fifth Sem
  {
    path: "/Bsc_Csit/fifthSem",
    element: <FifthSem />,
  },
  {
    path: "/Bsc_Csit/fifthSem/Cryptography",
    element: <Cryptography />,
  },
  {
    path: "/Bsc_Csit/fifthSem/DAA",
    element: <DAA />,
  },
  {
    path: "/Bsc_Csit/fifthSem/SAD",
    element: <SAD />,
  },
  {
    path: "/Bsc_Csit/fifthSem/WebTechnology",
    element: <WebTech />,
  },
  {
    path: "/Bsc_Csit/fifthSem/SM",
    element: <SM />,
  },
  {
    path: "/Bsc_Csit/fifthSem/Multimedia",
    element: <Multimedia />,
  },

//Seventh Sem
  {
    path:"/Bsc_Csit/seventhSem",
    element:<SeventhSem/>
  },
  {
    path:"/Bsc_Csit/seventhSem/Advanced-Java-Programming",
    element:<AdvancedJavaProgramming/>
  },
  {
    path:"/Bsc_Csit/seventhSem/Database-Administrator",
    element:<DatabaseAdministrator/>
  },
  {
    path:"/Bsc_Csit/seventhSem/International-Marketing",
    element:<InternationalMarketing/>
  },
  {
    path:"/Bsc_Csit/seventhSem/Network-Security",
    element:<NetworkSecurity/>
  },
  {
    path:"/Bsc_Csit/seventhSem/Project-Work",
    element:<ProjectWork/>
  },
]);

export default routes;
