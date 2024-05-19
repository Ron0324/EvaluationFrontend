import React, { useState,  useEffect,  } from 'react';
import './HomepageStyle.css'
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'

import home from '../Assets/home.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





export const Homepage = () => {
  
  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    // Function to parse query parameters from URL
    const parseQueryParams = (queryString) => {
      const params = {};
      const query = queryString.substring(1);
      const pairs = query.split('&');
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value);
      });
      return params;
    };

    // Parse query parameters from URL
    const queryParams = parseQueryParams(location.search);

    // Extract student information from query parameters
    const {
      id,
      username,
      id_number,
      first_name,
      last_name,
      suffix,
      course,
      year_level,
      // Add other fields if needed
    } = queryParams;

    // Set student information in state
    setStudentInfo({
      id,
      username,
      id_number,
      first_name,
      last_name,
      suffix,
      course,
      year_level,
      // Add other fields if needed
    });

    
  }, [location.search]);

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
    navigate(`/Evaluation/${facultyId}`, { state: { studentInfo } });
   }
   
};









  const containerStyles = {
    display: 'grid',
    

    width:'auto',
    overflow: 'auto',
    gridColumnGap: '10px',
    gridRowGap: '10px',
    marginTop: '2em',
 
  

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







  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    // Function to fetch faculty data
    const fetchFacultyData = async () => {
      try {
        const response = await fetch(' http://91.108.111.180:8000/Add_faculty/show_all_faculty/');
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
  }, [facultyList.selected_image]);
     


  const facultycontainer = {
    background:'#0a193a',
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
   const [isDisabled, setIsDisabled] = useState(true);

   useEffect(() => {
     // Fetch evaluation dates from Django backend
     fetch(' http://91.108.111.180:8000/Criteria/get_evaluation_dates/')
       .then(response => response.json())
       .then(data => {
         const currentDate = new Date();
         const matchingDate = data.find(date => {
           const startDate = new Date(date.date_started);
           const endDate = date.date_ended ? new Date(date.date_ended) : null; // Handle null date_ended values
           return endDate ? currentDate >= startDate && currentDate <= endDate : currentDate >= startDate;
         });
         setIsDisabled(!matchingDate); // Disable button if matchingDate is null (no matching date found)
       })
       .catch(error => {
         console.error('Error fetching evaluation dates:', error);
       });
   }, []);

  

  return (
    <div >



<div className='top-header'>

<div className="newlogo">
<img src={prmsu__logo} alt="logo of Prmsu"/>
</div> 



<div className='icon-menu'>
  
  <div className={`icons ${IconActive.home? 'active':''}`}  >
    <div className='home-icon'>
    <img src={home} alt="home" />
    </div>
</div>



</div>

<div className='dflt-prfl'   onClick={() =>{SetMunuOpen(!MenuOpen)}}>

  <img className='dflt-prfl-img' src={dflt_prfl_img} alt="Default Profile" style={{objectFit:'cover'}} />

  

</div>

</div>




<div className='content'>



<div className='fclty-view' 
    
    style={{display: IconActive.faculty ? 'block' : 'none', paddingLeft:'1em',background:'#b5cad9',height: '100%',width: '100%',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 

<div style={containerStyles} className='newcontainer'>

{facultyList.map(faculty => (
  <div key={faculty.id} style={facultycontainer} className='fclty-hldr'>

  {faculty.selected_image ? (
  <img src={faculty.selected_image} alt="Faculty" style={{objectFit:'cover'}} />
) : (
  <img src={dflt_prfl_img} alt="Default Profile" style={{objectFit:'cover'}} />
)}



  <div style={{fontFamily:'auto',fontWeight:'500',color:'white'}} className='inf'>
  <label htmlFor="">Id: {faculty.id_number}</label>
  <div>
  <label htmlFor="">{faculty.first_name}</label>
<label className='sr-nm' htmlFor="lastname">{faculty.last_name}</label>
  </div>
  <label htmlFor="">{faculty.status}</label>
  <div><label htmlFor="">Subjects:</label></div>
  
<ul>
{faculty.subjects.map(subject => (
                <li key={subject.id}>{subject.Subname}</li>
              ))}
</ul>

<button
      onClick={() => ToggleActive('evaluation', faculty.id)}
      style={{
        background: 'rgb(0 99 255)',
        boxShadow: 'rgb(0 0 0) 0px 0px 5px',
        outline: 'none',
        borderRadius: '2px',
        border: 'none',
        color: 'white',
        marginBottom: '1em',
        marginTop: '1em',
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer'
      }}
      disabled={isDisabled}
    >
      Evaluate
    </button>
      
  
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
<li>Edit Password</li>
  
  <hr />
  <li onClick={handleClickLogOut}>Log Out</li>
  <hr />
  </ul>
</div>

</div>

</div>
  )
}
