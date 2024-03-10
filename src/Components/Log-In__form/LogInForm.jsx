import React, { useState, useRef, useEffect,  } from 'react';
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
   
    const csrfToken = csrfTokenRef.current; // Use csrfTokenRef.current instead of calling getCsrfToken()
  

    //Admin authentication
    if (selectedUserType === 'Admin') {
       if (!idNumber || !password) {
        alert('ID number and password cannot be empty');
        return;
      }else if (idNumber === 'admin'&& password==='cd022826464'){
        navigate('/Admin-DashBoard');
      }else{
        alert('invalid Credentials')
      }
    } 
    
    //Student login authentication
    else if (selectedUserType === 'Student') {
      try {
        // Check if idNumber and password are not empty
        if (!idNumber || !password) {
          alert('ID number and password cannot be empty');
          return;
        }
    
        const studentData = new FormData();
        studentData.append('id_number', idNumber);
        studentData.append('password', password);
        console.log('student Data: ',studentData)
      
        const response = await fetch(' http://52.199.99.23:8000/Courses/student_login/', {
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
      
          console.log('Login successful');
          
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
        console.error('Error during authentication:', error);
      }

    } 
    
    
    //peer login authentication
    else if (selectedUserType === 'Instructor') {
      try {
        const formData = new FormData();
        formData.append('id_number', idNumber);
        formData.append('password', password);
        
  
        const response = await fetch(' http://52.199.99.23:8000/Add_faculty/faculty_login/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          body: formData,
        });
  
        if (response.ok) {
          const responseData = await response.json();
         

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
          console.error('Instructor login failed:', await response.text());
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    } else {
      // Handle the case where userType is not set
      alert('Please select a user type before logging in.');
    }
  };



  return (
    
    
    
    <div id='main'>
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
