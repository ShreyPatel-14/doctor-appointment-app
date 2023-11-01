import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes,Route,Link,useLocation} from 'react-router-dom';
import Error404 from "./Error404";

function App() {
  const location = useLocation();

  // // Define an array of paths where you want to show the Navbar and Footer.
  const validPaths = ['/', '/contact', '/blog','/details','/login','/appointment','/yourAppoint','/dashboard','/login/signin','/login/signup','/appointment_1','/patients']; // Update with your actual valid paths.

  // // Check if the current path is in the validPaths array.
  const shouldShowNavbarAndFooter = validPaths.includes(location.pathname);
  return (
    // <Router>
      <div>
        {shouldShowNavbarAndFooter ? (
          <div>
            <Navbar />
            <Footer />
          </div>
        ):(<Error404/>)}
        {/* <Routes>
          <Route path="*" element={<Error404 />} />
        </Routes> */}
      </div>
    // </Router>
    

    // <div>
       
    //     <Navbar />
    //     <Footer />
         
    //     <Routes>
    //     <Route path="*" element={<Error404/>}/>
    //     </Routes>
        
      
    // </div>
  );
}

export default App;


// import React from 'react';
// import Cal from './components/Cal';
// function App() {
//   return (
//     <div>
//       <Cal/>
//     </div>
//   )
// }

// export default App