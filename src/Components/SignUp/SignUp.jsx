import React, { useState, useRef } from 'react';
import '../Log-In__form/LogInForm.css'
import prmsu__logo from '../Assets/PrmsuLogo.png'

import { useNavigate } from 'react-router-dom'

import axios from 'axios';

export const SignUp = () => {
    const [inputValues, setInputValues] = useState({
        ID: '',
        Email: '',
        Fname: '',
        Sname: '',
        Mname: '',
        Suffix: '',
        UserType: '',
        Newpass: '',
        Confirmpass: '',
      });

    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
 


      const handleRegisterButtonClick = () => {
        axios
          .post('http://localhost:3001/send-email', {
            ...inputValues,
          })
          .then((response) => {
            console.log(response.data);
            // Add any further actions you want to take on successful email sending
          })
          .catch((error) => {
            console.error('Error sending email:', error);
            
            // Handle error
          });



      };

      const handleLogInButtonClick = () =>{
        navigate('/')
      }

      const [profileImage, setProfileImage] = useState(null);
      const fileInputRef = useRef(null);
      
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
      // Trigger the file input when the button is clicked
      fileInputRef.current.click();
  };

  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };


  return (
    <div id='main'>
    <div className="logo">
          <img src={prmsu__logo} alt="logo of Prmsu"/>
          </div> 
          <div   
           className="container">
        
          <h2> Sign up</h2>
       

          <div className='usr-inpt-fld'>
          

          <div className="input-box">
        
                  
                  <input 
                   type="text" placeholder="ID Number: " name="ID" value={inputValues.ID} onChange={handleInputChange}    required />
                </div>

                <div className="input-box">
                  
                  <input type="email" placeholder="Email Add: " name="Email"  value={inputValues.Email} onChange={handleInputChange} required />
                </div>

                </div>

                <div className='usr-inpt-fld'>

                    <div className="input-box">
                  <input type="text" placeholder="First Name: " name="Fname" value={inputValues.Fname}  onChange={handleInputChange} required /></div>

                
              <div className="input-box">
                  <input type="text" placeholder="Second Name: " name="Sname" value={inputValues.Sname} onChange={handleInputChange} required /></div>

                </div>

                 <div className='usr-inpt-fld'>

                 <div className="input-box">
                
                <input type="text" placeholder="Middle Name:" name="Mname" value={inputValues.Mname} onChange={handleInputChange} required />
              </div>

              <div className="input-box">
                
                <input type="text" placeholder="Suffix: " name="Suffix" value={inputValues.Suffix} onChange={handleInputChange} />
                
              </div>
              
                    
                </div>
           
<div style={{display:'flex'}}>
                <select  defaultValue="" style={{width: "14em",height: "2em", padding: "5px", borderRadius: "5px",outline: "none", fontSize:"14px"}} name="UserType"onChange={handleUserTypeChange} >
                <option value="" disabled>Select User type</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>

</select>

{userType === 'Student' && (
       
       <div className='cor-upld ' style={{
        backgroundColor:'white',display:'flex',flexDirection:'column',
        color:'black', width:'15em', padding:'.5em', marginLeft:'2em', border:'black solid 1px', borderRadius:'4px'
      }}>
        <h3 style={{ margin:'0', padding:"0"}} >Upload your COR</h3>
        <img style={{width:'5em', height:'5em', marginTop:'1em'}} src={profileImage} alt="" />
        <button style={{outline:'none', marginTop:'1em'}} className='up-btn' onClick={handleButtonClick}>Upload Photo</button>
      <input  type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload} />
      </div>

      )}



</div>


                <div className='usr-inpt-fld'>
              <div className="input-box" >
                  <input type="password" placeholder="Password:" name="Newpass" value={inputValues.Newpass} onChange={handleInputChange}  required /></div>

                  <div className="input-box" >
                  <input type="password" placeholder="Confirm Password:" name="Confirmpass" value={inputValues.Confirmpass} onChange={handleInputChange} required /></div>
              </div>

                <div style={{display:'flex'}}>
              <div className="frgt-acc">    
              <button onClick={handleRegisterButtonClick}>Register</button>
              </div>


              <div className="frgt-acc" style={{marginLeft:'2em'}}>    
              <button onClick={handleLogInButtonClick}>Login</button>
              </div>
              </div>


          </div>
          </div>
  )
}
