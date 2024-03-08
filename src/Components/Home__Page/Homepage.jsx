import React, { useState, useRef, useEffect, useContext } from 'react';
import './HomepageStyle.css'
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'

import { useNavigate } from 'react-router-dom';





export const Homepage = () => {


  const navigate = useNavigate();

  const handleClickLogOut = () => {
   // Navigate to LogIn page route when the Logout is clicked
   navigate('/LogIn');
  };



  
const [MenuOpen,SetMunuOpen] = useState(false);

const [IconActive, SetIconActive] = useState({
 home: true,
 evaluation: false,
 faculty: true,
 
 editProfile: false,
});

const ToggleActive = (IconName,facultyId) =>{
  // Toggle the active state of icons based on their names
 SetIconActive({
   
   evaluation: IconName === 'evaluation' ? !IconActive.evaluation : false,
   dashboard: IconName === 'dashboard' ? !IconActive.dashboard : false,
    faculty: IconName === 'faculty' ? !IconActive.faculty : false,
    editProfile: IconName === 'editProfile' ? !IconActive.editProfile: false,
 });

 
   if (IconName === 'evaluation'){
     navigate(`/Evaluation/${facultyId}`)
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

  const containerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 18em))',
    maxHeight: '41.7em',
    width:'auto',
    overflow: 'auto',
    gridColumnGap: '10px',
    gridRowGap: '10px',
    marginTop: '2em',
    marginLeft:'1.8em',
  

    /* Hide scrollbar for WebKit browsers */
    scrollbarWidth: 'thin', /* Firefox */
    scrollbarColor: 'transparent transparent', /* Firefox */

    /* Hide scrollbar for WebKit browsers */
    WebkitScrollbar: {
        width: '0.5em',
    },

    WebkitScrollbarThumb: {
        backgroundColor: 'transparent',
    },
};


const [showNewFaculty, setShowNewFaculty] = useState(false);

  const toggleNewFaculty =() =>{
    setShowNewFaculty(!showNewFaculty);
  }; //hide and show  new faculty


  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    // Function to fetch faculty data
    const fetchFacultyData = async () => {
      try {
        const response = await fetch('http://52.195.228.101:8000/Add_faculty/show_all_faculty/');
        const data = await response.json();
        setFacultyList(data);
        console.log(facultyList.selected_image)
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };
  
    // Fetch faculty data initially
    fetchFacultyData();
  
    // Set interval to fetch data every 60 seconds
    const intervalId = setInterval(fetchFacultyData, 5000);
  
    // Clean up function to clear the interval
    return () => clearInterval(intervalId);
  }, []);
     


  const facultycontainer = {
    background:'#0a193a',maxHeight:'30em',borderBottom:'Solid yellow 2px',
    overflow: 'auto',
   /* Hide scrollbar for WebKit browsers */
   scrollbarWidth: 'thin', /* Firefox */
   scrollbarColor: 'transparent transparent', /* Firefox */
   
   /* Hide scrollbar for WebKit browsers */
   WebkitScrollbar: {
       width: '0.5em',
   },
   
   WebkitScrollbarThumb: {
       backgroundColor: 'transparent',
   },
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
  
  <div className={`icons ${IconActive.home? 'active':''}`}>
    <div className='home-icon'>
    
      <label name='home-circle' htmlFor="home">HOME</label>
    </div>
</div>

<div className={`icons ${IconActive.evaluation? 'active':'inactive'}`} >
  <div className='evaluation'></div>
 
 <label name='user-circle' htmlFor="user">User</label>
 </div>


</div>

<div className='dflt-prfl'   onClick={() =>{SetMunuOpen(!MenuOpen)}}>
  <img className='dflt-prfl-img' src={dflt_prfl_img} alt="" />

</div>

</div>




<div className='content'>

<div className='lft-slctn' style= {{height:'100%',width:'20%',backgroundColor:'#0a193a',borderRadius:'8px', borderTop:'rgb(209, 173, 13) solid 3px', borderBottom:'rgb(209, 173, 13) solid 3px', borderRight:'rgb(209, 173, 13) solid 3px',borderLeft:'none', borderTopLeftRadius:'0'}}>



<h3 className={`admn-slctn ${IconActive.faculty? 'active':'inactive'}`}onClick={()=>ToggleActive('faculty')} 
style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Faculty

</h3>




<h3 className={`admn-slctn ${IconActive.editProfile? 'active':'inactive'}`} onClick={()=>ToggleActive('editProfile')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em',borderBottom:'1px solid #a39d9d'  } }>
  Edit Profile

</h3>



</div>

<div className='fclty-view' 
    
    style={{display: IconActive.faculty ? 'block' : 'none', paddingLeft:'1em',background:'#b5cad9',height: '100%',width: '85%',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 

<div style={containerStyles}>

{facultyList.map(faculty => (
  <div key={faculty.id} style={facultycontainer}>

  {faculty.selected_image ? (
  <img src={faculty.selected_image} alt="Faculty" style={{margin:'1.5em',height:'13em',width:'82%',objectFit:'cover'}} />
) : (
  <img src={dflt_prfl_img} alt="Default Profile" style={{margin:'1.5em',height:'13em',width:'82%',objectFit:'cover'}} />
)}



  <div style={{marginLeft:'1em',fontSize:'1.3em',fontFamily:'auto',fontWeight:'500',color:'white'}}>
  <label htmlFor="">Id: {faculty.id_number}</label>
  <div>
  <label htmlFor="">{faculty.first_name}</label>
<label style={{marginLeft:'1em'}} htmlFor="">{faculty.last_name}</label>
  </div>
  <label htmlFor="">{faculty.status}</label>
<ul>
{faculty.subjects.map(subject => (
                <li key={subject.id}>{subject.Subname}</li>
              ))}
</ul>

<button
onClick={()=>ToggleActive('evaluation', faculty.id)}
     
      style={{width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      
      > Evaluate</button>
      
  
  </div>



</div>))}


    </div>
    <div>
      <>
       
        {/* Add other labels for additional fields */}
      </>
    </div>
    </div>


<div className={`lg-out-mn ${MenuOpen? 'active':'inactive'}`} id='menu' >
<ul >

  <li onClick={handleClickLogOut}>Log Out</li>
  </ul>
</div>

</div>

</div>
  )
}
