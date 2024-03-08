import React, { useState, useRef } from 'react';
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'
import { useNavigate } from 'react-router-dom';



export const Profiling = () => {

    const navigate = useNavigate();

    const handleClickLogOut = () => {
     // Navigate to LogIn page route when the Logout is clicked
     navigate('/');
    };
 
    const handleClickCreateNewuser = () => {
     // Navigate to LogIn page route when the Logout is clicked
     navigate('/Create/new-user/account');
    };
 
    
 const [MenuOpen,SetMunuOpen] = useState(false);
 
 const [IconActive, SetIconActive] = useState({
   home: false,
   profile: true,
   settings: false,
 });
 
 const ToggleActive = (IconName) =>{
    // Toggle the active state of icons based on their names
   SetIconActive({
     home: IconName === 'home' ? !IconActive.home : false,
     profile: IconName === 'profile' ? !IconActive.profile : false,
     settings: IconName === 'settings' ? !IconActive.settings : false,
   });
 
  if (IconName === 'home'){
   navigate('/Supervisor/hompage');
     }else if(IconName === 'settings') {
       navigate ('/Setting');
     }else if (IconName === 'profile'){
       navigate('/User/Profile')
     }
     
 };



    const [profileImage, setProfileImage] = useState(dflt_prfl_img);
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

    return (
        <div>

<div className='top-header'>

<div className="newlogo">
<img src={prmsu__logo} alt="logo of Prmsu"/>
</div> 

<div className='search'>
 
  <input type="text" placeholder='Search ID' />
</div>

<div className='icon-menu'>
  
  <div className={`icons ${IconActive.home? 'active':''}`} onClick={()=>ToggleActive('home')}>
    <div className='home-icon'>
    
      <label name='home-circle' htmlFor="home">HOME</label>
    </div>
</div>

<div className={`icons ${IconActive.profile? 'active':'inactive'}`} onClick={()=>ToggleActive('profile')}>
  <div className='profile'></div>
  <label name='user-circle' htmlFor="user">USER</label>
 </div>

 <div className={`icons ${IconActive.settings? 'active':'inactive'}`} onClick={()=>ToggleActive('settings')}>
  <div className='settings'></div>
 
 <label name='cog' htmlFor="cog">SETTINGS</label>
 
 </div>

</div>

<div className='dflt-prfl'  onClick={() =>{SetMunuOpen(!MenuOpen)}}>
<img className='dflt-prfl-img' src={profileImage} alt="Use" />
</div>

</div>
            <div className='content'>

<div className='content'>
<div className='nw-cntnr'>
            {/* Display the profile picture */}
             <div className={'evltn-hdr'}>
            <div className='evltn-dp'>
                
                <img src={profileImage} alt="user profile" />
            

            {/* Use a button to trigger file input */}
            <button className='up-btn' onClick={handleButtonClick}>Upload Photo</button>

            {/* Hidden file input element */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload} />

  </div>
  <div className='evltn-p'>
    <p> <span className='UserName' >
    <span className='FirstName'>Ronaldo</span>
    <span> </span>
    <span className='MiddleInitial'>M</span>
    <span> </span>
     <span className='LastName'>Santos
     </span>
     <span> </span>
     <span className='SuffixName'>Jr</span>
     </span>
    <br />
    </p>
    <p className='evltn-Idnum'>
    <span className='IdNumber'>19-10264 </span>
    </p>
       
    </div>


            </div>
            <form action="">

            <div className='inf-frm'>
    <label htmlFor="Info">Info</label>
        <textarea id='info' />
        <div className='prflng-btn'>
          <button> Post </button>
        </div>
        </div>
        
<div className='frm'>


    <div className='fst-frm'>

        <label htmlFor="Info">First Name</label>
        <input id='Fname' type="text" />

        <label htmlFor="Info">Last Name</label>
        <input id='Lname' type="text" />

        <label htmlFor="Info">Email</label>
        <input id='Email'  type="email" />

        <label htmlFor="Info">Date of Birth</label>
        <input id='Bday' type="Date" />

        <label htmlFor="Info">Age</label>
        <input id='age' type="text" />
        </div>
        
        <div className='sc-frm'>

        <label htmlFor="Info">Gender</label>
        <input type='text'  />

        <label htmlFor="Info">Address</label>
        <input id='Addrss' type="text" />

        <label htmlFor="Info">Contact Number</label>
        <input id='CntctNum' type="text" />

        <label htmlFor="Info">Major</label>
        <input id='MjrSub' type="text" />

        <div className='prflng-btn'>
        <button> Update </button>
        </div>
        </div>

        <div className='sc-frm'>

        <label htmlFor="OldPass">Old Password</label>
        <input id =  "Opass" type='password'  />

        <label htmlFor="NewPass">New Password</label>
        <input id='Npass' type="password" />
        <div className='prflng-btn'>
          <button> Change Password </button>
        </div>


        </div>


        </div>
        </form>
        </div>
        
        </div>


        <div className={`lg-out-mn ${MenuOpen? 'active':'inactive'}`} id='menu' >
<ul >
  <li onClick={handleClickCreateNewuser}>Assign New Admin</li>
  <hr />
   <li>Start Evalution</li>
  <hr />
  <li onClick={handleClickLogOut}>Log Out</li>
  <hr />
  </ul>
</div>
</div>




        </div>
    );
};