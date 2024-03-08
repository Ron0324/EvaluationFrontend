import React,{useState, } from 'react'
import '../Home__Page/HomepageStyle.css'
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'

import { useNavigate } from 'react-router-dom';

export const CreateNewUser = () => {

    const navigate = useNavigate();

   const handleClickLogOut = () => {
    // Navigate to LogIn page route when the Logout is clicked
    navigate('/');
   };

const [MenuOpen,SetMunuOpen] = useState(false);

const [IconActive, SetIconActive] = useState({
  home: false,
  profile: false,
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
        navigate('/Profile')
      }

}


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
      < box-icon name='home-circle' type='solid'  size = '2.5em'  ></box-icon>
    </div>
</div>

<div className={`icons ${IconActive.profile? 'active':'inactive'}`} onClick={()=>ToggleActive('profile')}>
  <div className='profile'></div>
 <box-icon name='user-circle' type='solid'  size = '2.5em' ></box-icon>
 </div>

 <div className={`icons ${IconActive.settings? 'active':'inactive'}`} onClick={()=>ToggleActive('settings')}>
  <div className='settings'></div>
 <box-icon type='solid' name='cog'  size = '2.5em' ></box-icon>
 </div>

</div>

<div className='dflt-prfl'  onClick={() =>{SetMunuOpen(!MenuOpen)}}>
<img className='dflt-prfl-img' src={dflt_prfl_img } alt="Use" />
</div>

</div>
<div className='content'>
<div className='mainview'>

  
</div>


<div className={`lg-out-mn ${MenuOpen? 'active':'inactive'}`} id='menu' >
<ul >
  <li>Create New User Account</li>
  <hr />
   <li>Start Evalution</li>
  <hr />
  <li onClick={handleClickLogOut}>Log Out</li>
  <hr />
  </ul>
</div>

</div>





    </div>
  )
}
