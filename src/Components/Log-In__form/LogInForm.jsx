import React, { useState, useRef, useEffect, useCallback } from 'react';
import './LogInForm.css'
import prmsu__logo from '../Assets/PrmsuLogo.png'
import { useNavigate } from 'react-router-dom'






export const LogInForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  



  const getCsrfToken = () => {
    const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  
    if (csrfCookie) {
      return csrfCookie.split('=')[1];
    } else {
      console.error('CSRF token not found in cookies');
      return null;
    }
  };
  
  const [showNewFaculty, setShowNewFaculty] = useState(false);
  const [msg1, setmsg1] = useState(false);
  const [msg2, setmsg2] = useState(false);
  const [msg3, setmsg3] = useState(false);
  const [msg4, setmsg4] = useState(false);
  const [msg5, setmsg5] = useState(false);
  const [msg6, setmsg6] = useState(false);
  const [msg7, setmsg7] = useState(false);
  const [msg8, setmsg8] = useState(false);
  const [msg9, setmsg9] = useState(false);

  const toggleNewFaculty =() =>{
    setShowNewFaculty(!showNewFaculty);
  }; 


  const togglemsg1 =() =>{
    setmsg1(!msg1);
  }; 
  const togglemsg2 =() =>{
    setmsg2(!msg2);
  }; 
  const togglemsg3 =() =>{
    setmsg3(!msg3);
  }; 
  const togglemsg4 =() =>{
    setmsg4(!msg4);
  }; 
  const togglemsg5 =() =>{
    setmsg5(!msg5);
  }; 
  const togglemsg6 =() =>{
    setmsg6(!msg6);
  }; 

  const togglemsg7=() =>{
    setmsg7(!msg7);
  }; 

  const togglemsg8 =() =>{
    setmsg8(!msg8);
  }; 

  const togglemsg9 =() =>{
    setmsg9(!msg9);
  }; 



  const navigate = useNavigate();
  
  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const csrfTokenRef = useRef(null);
  
  useEffect(() => {
    csrfTokenRef.current = getCsrfToken();
  }, []);

  
  
  const handleLoginButtonClick = async (e) => {
    e.preventDefault();
  
    const csrfToken = csrfTokenRef.current;

    
  
    //Admin authentication
    if (selectedUserType === 'Admin') {
      try {
        // Check if idNumber and password are not empty
        if (!idNumber || !password) {
          setmsg1(!msg1);
          return;
        }
  
        const formData = new FormData();
        formData.append('id_number', String(idNumber)); // Convert idNumber to string
        formData.append('password', password);
  
        const response = await fetch('http://91.108.111.180:8000/Courses/admin_login/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          body: formData,
        });
  
        if (response.ok) {
          const responseData = await response.json();
  
          setmsg2(!msg2);
  
          // Extract the redirect URL from the response and navigate to it
          const redirectUrl = responseData.redirect_url;
  
          // Update the window location only if a valid redirect URL is provided
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            // If no valid redirect URL is provided, reload the page
            window.location.reload();
          }
        } else {
          const errorData = await response.json();
          setmsg3(!msg3);
        }
      } catch (error) {
        setmsg4(!msg4);
      }
    }
    
    
    
    else if (selectedUserType === 'Student') {
      try {
        // Check if idNumber and password are not empty
        if (!idNumber || !password) {
          setmsg5(!msg5);
          return;
        }
  
        const response = await fetch('http://91.108.111.180:8000/Courses/student_login/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_number: idNumber,
            password: password,
          }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
  
          setmsg6(!msg6);
          // Extract the redirect URL from the response and navigate to it
          const redirectUrl = responseData.redirect_url;
  
          // Update the window location only if a valid redirect URL is provided
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            // If no valid redirect URL is provided, reload the page
            window.location.reload();
          }
        } else {
          console.error('Student login failed:', await response.text());
        }
      } catch (error) {
        console.error('Error during student authentication:', error);
      }
    }
  
  
    
    
    //peer login authentication
    else if (selectedUserType === 'Instructor') {
      try {
        const formData = new FormData();
        formData.append('id_number', idNumber);
        formData.append('password', password);
        
  
        const response = await fetch(' http://91.108.111.180:8000/Add_faculty/faculty_login/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          body: formData,
        });
  
        if (response.ok) {
          
          const responseData = await response.json();
          setmsg7(!msg7);
         

          const redirectUrl = responseData.redirect_url;
          const facultydata = responseData.faculty;
          localStorage.setItem('factData', JSON.stringify(facultydata));
         
           if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            // If no valid redirect URL is provided, reload the page
            window.location.reload();
          }
          
        }  else {
          
          setmsg8(!msg8);
        }
      } catch (error) {
        alert('Error during authentication:');
        setmsg9(!msg9);
      }
    } else {
      // Handle the case where userType is not set
      setShowNewFaculty(!showNewFaculty);
    }
  };

  
  




  return (
    
    
    
    <div id='main'>

<div className='smll-cntnr' id='newFaculty' style={{ display: showNewFaculty ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Select User-Type Before Loging In 
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={toggleNewFaculty}>Okay</button></div></div>



    
<div className='smll-cntnr' id='newFaculty' style={{ display: msg1 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Select User-Type Before Loging In 
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg1}>Okay</button></div></div>

<div className='smll-cntnr' id='newFaculty' style={{ display: msg2 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Login successful
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg2}>Okay</button></div></div>

<div className='smll-cntnr' id='newFaculty' style={{ display: msg3 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Admin login failed
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg3}>Okay</button></div></div>

<div className='smll-cntnr' id='newFaculty' style={{ display: msg4 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Error during admin authentication
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg4}>Okay</button></div></div>


<div className='smll-cntnr' id='newFaculty' style={{ display: msg5 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> ID number and password cannot be empty
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg5}>Okay</button></div></div>

<div className='smll-cntnr' id='newFaculty' style={{ display: msg6 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Login successful 
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg6}>Okay</button></div></div>


<div className='smll-cntnr' id='newFaculty' style={{ display: msg7 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Log In Successfull
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg7}>Okay</button></div></div>


<div className='smll-cntnr' id='newFaculty' style={{ display: msg8 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Instructor login failed 
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg8}>Okay</button></div></div>

<div className='smll-cntnr' id='newFaculty' style={{ display: msg9 ? 'block' : 'none',fontFamily:'-moz-initial',fontWeight:'bold' }}> Error during authentication
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg9}>Okay</button></div></div>










    <div className="logo">
          <img src={prmsu__logo} alt="logo of Prmsu"/>
          </div> 
          <div className="container">

            


             <form className="login-form" onSubmit={handleLoginButtonClick}>
          <div className="input-box">
               
                <input type="text" placeholder="ID Number" value={idNumber} onChange={handleIdNumberChange}/>
            </div>

            <div className="input-box">
              
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </div>

              <div className="frgt-acc">   
              <div className='lg-frm-btns'> 
              <button type='submit'>Log In</button>
              
              </div>
               
              <label>
                User Type:
              <select style={{outline :'none', padding: '.3em', borderRadius:'5px', fontSize:'15px', fontWeight:'100px'} } value={selectedUserType} onChange={(e) => setSelectedUserType(e.target.value)}>


  <option defaultValue="Select">Select User</option>
  <option defaultValue="Admin">Admin</option>
  <option value="Instructor">Instructor</option>
  <option value="Student">Student</option>
  
</select >
</label>


                  <p>User Type: <span className=''></span></p>
                  
              </div>
              </form>
            
          </div>
          </div>
          

  )
}
export default LogInForm
