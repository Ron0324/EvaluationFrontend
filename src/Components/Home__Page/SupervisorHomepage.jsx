import React,{useState, } from 'react'
import './HomepageStyle.css'
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'

import { useNavigate } from 'react-router-dom';

export const SupervisorHomepage = () => {

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
  home: true,
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
      navigate('/User/Profile')
    }
    
};

const [comment, setComment] = useState('');

const handleCommentChange = (e) => {
  setComment(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  // You can send the comment to your backend or perform other actions here.
  console.log('Submitted comment:', comment);
};

const [isExpanded, setIsExpanded] = useState(false);

  const toggleHeight = () => {
    setIsExpanded(!isExpanded);
  };

  return (
<div >
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
      
      <label name='home-circle' htmlFor="home">Home</label>
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
<img className='dflt-prfl-img' src={dflt_prfl_img } alt="Use" />
</div>

</div>




<div className='content'>
<div className='left-grid'>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Gol</span>
    <span> </span>
    <span className='MiddleInitial'>D.</span>
    <span> </span>
     <span className='LastName'>Lacks
     </span>
     <span> </span>
     <span className='SuffixName'>Jr.</span>
     </span>
    <br /><span className='IdNumber'>19-1323 </span>
    </p>
    </div>
 
</div>
</div>
  

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Marie</span>
    <span> </span>
    <span className='MiddleInitial'>T.</span>
    <span> </span>
     <span className='LastName'>Essu
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-3424 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>John</span>
    <span> </span>
    <span className='MiddleInitial'>M.</span>
    <span> </span>
     <span className='LastName'>Smith
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-45543 </span>
    </p>
    </div>
 
</div>
</div>


<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Mosh</span>
    <span> </span>
    <span className='MiddleInitial'>E.</span>
    <span> </span>
     <span className='LastName'>Moshie
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-10432 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Gwen</span>
    <span> </span>
    <span className='MiddleInitial'></span>
    <span> </span>
     <span className='LastName'>Stacy
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-13232 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Spay</span>
    <span> </span>
    <span className='MiddleInitial'>D.</span>
    <span> </span>
     <span className='LastName'>Man
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-12323 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Jhony</span>
    <span> </span>
    <span className='MiddleInitial'>A.</span>
    <span> </span>
     <span className='LastName'>Jhony
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-34234 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Marcus</span>
    <span> </span>
    <span className='MiddleInitial'>C.</span>
    <span> </span>
     <span className='LastName'>Marc
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-43242 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
    <p> <span className='UserName' >
    <span className='FirstName'>Danniella</span>
    <span> </span>
    <span className='MiddleInitial'>J.</span>
    <span> </span>
     <span className='LastName'>Jane
     </span>
     <span> </span>
     <span className='SuffixName'></span>
     </span>
    <br /><span className='IdNumber'>19-76633 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt=""/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>

<div className='wrapper'>
<div className="ProfileContainer">
  <div className='ProfileHeader'>
    <img className="dflt-prfl-img" src={dflt_prfl_img } alt="user profile"/>
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
    <br /><span className='IdNumber'>19-10264 </span>
    </p>
    </div>
 
</div>
</div>




</div>

<div className='mainview'>

<div className={`evltn-ctnr ${isExpanded ? 'expanded' : ''}`}>
  <div className={`evltn-hdr ${isExpanded ? 'expanded' : ''}`}>
    <div className='evltn-dp'>
    <img src={dflt_prfl_img } alt="user profile" />
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
    <button onClick={toggleHeight}>Show more Details</button>
    <div className=''></div>
       
    </div>
    
  </div>

  <table className='custom-table'>
        <thead>
          <tr>
            <th>Scale</th>
            <th>Discriptive Rating</th>
            <th>Qualitative Descriptive</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5</td>
            <td>Outstanding</td>
            <td className='dscrptv-p'>The performance almost  always exceeds the job requirments. <br />    The faculty is an exceptional role model
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td >Very Satisfactory</td>
            <td className='dscrptv-p'>The performance meets and often exceeds the jobs requirements <br />
                
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Satisfactory</td>
            <td className='dscrptv-p'>The performance meets and the jobs requirements
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Fair</td>
            <td className='dscrptv-p'>The performance needs some developments to meet job requirements 
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Poor</td>
            <td className='dscrptv-p'>The performance fails to meet job requirements 
            </td>
          </tr>
        </tbody>
      </table>

      <table className='custom-table'>
        <thead>
          <tr>
            <th>A. Commitment</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='dscrptv-p' >1. Demonstrates sensitivity to student's ability to attend and absorb content information
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>2. Intgrates sensitively his/her learning objectives with those of the student in a collaborative process
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>3. Makes self-available to students beyond official time.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>4. Regularly comes to class on time, well-groomed and well- prepared to complete assigned responsibilities.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>5. Keeps accurate records of student's performance and prompt submission of the same.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='ttl-dscrptv-scr'>TOTAL SCORE
            </td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
          </tr>

          
         
        </tbody>
      </table>

      <table className='custom-table'>
        <thead>
          <tr>
            <th>B. Knowledge of Subject</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='dscrptv-p' >1. Demonstrates mastery of the subject matter (expalin/s the matter without relying soley on the prescribed textbook)
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>2. Draws and shares information on the state of the art of theory and practice in his/her discipline.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>3. Integrates subject to practical circumstances and learning  intents/purpopse of students.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>4. Explains the relevance of present topics to the previous lessons, and relates the subject matter to relevant to current issues and/or daily life activities.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>5. Demonstrates up-to-date knowledge and/or awareness on current trends and issues of the subject.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='ttl-dscrptv-scr'>TOTAL SCORE
            </td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
          </tr>
         
        </tbody>
      </table>

      <table className='custom-table'>
        <thead>
          <tr>
            <th>C. Teaching for Independent Learning</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='dscrptv-p' >1. Create Teaching strategies that allow students to practice using concepts they need to understand (Interactive discussion).
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>2. Enhances students self-steem and/or gives due recognition to student's performances/potentials.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>3. Allow students to create thier own course with objectives realistically defined student-professor rules and make them accountable for their  performance.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>4. Allows students to think indepentdently  and make their own decisions and holding them acountable for their performance based largely on their success in executing decisions.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>5. Encourages students to learn beyond  what is required and help/guide the students how to apply the concepts learned
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='ttl-dscrptv-scr'>TOTAL SCORE
            </td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
          </tr>

        </tbody>
      </table>
      <table className='custom-table'>
        <thead>
          <tr>
            <th>D. Management Learning</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='dscrptv-p' >1. Creates opportunities for intensive and/or extensive contribution of student in the class activities (e.g. breaks class into dyads, traids or buzz/task groups).
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>2. Assumes roles as  facilitator, resource person, coach, inquisitor, integrator, referee in drawing students contribute to knowledge and undestanding of the concepts at hands.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>3. Designs and implements learning conditions and experience that promotes healthy exchange and/or confrontation.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          <tr>
            <td className='dscrptv-p'>4. Structure/re-structures learning and teaching-learning context to enhance attainment og collective learning objectives.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='dscrptv-p'>5. Uses instructtional Materials (audio/video materials: fieldtrips, film showing, computer aided instruction and etc.) to reinforce learning processes.
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>

          <tr>
            <td className='ttl-dscrptv-scr'>TOTAL SCORE
            </td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
            <td className='scl-rt-scr'></td>
          </tr>

        </tbody>
      </table>
      

      <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment here"
      />
      <button type="submit">Submit</button>
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
  )
}