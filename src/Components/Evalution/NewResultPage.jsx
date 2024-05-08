import React, { useEffect,useState, } from 'react';
import '../Home__Page/HomepageStyle.css';
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'

import {  useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import file from '../Assets/file.png';
import home from '../Assets/home.png';

export const NewResultPage = () => {


    const { facultyId } = useParams();
    const [facultyInfo, setFacultyInfo] = useState(null);
  
    useEffect(() => {
      const fetchFacultyInfo = async () => {
        try {
          const response = await fetch(`http://91.108.111.180:8000/Add_faculty/faculty_info/${facultyId}/`);
          const data = await response.json();
          setFacultyInfo(data);
          console.log('Faculty Info:', data); // Log the fetched data
          console.log('Info:', data.first_name);
        } catch (error) {
          console.error('Error fetching faculty information:', error);
        }
      };
  
      fetchFacultyInfo();
    }, [facultyId]);



      const [feedbackData, setFeedbackData] = useState(null);

useEffect(() => {
  fetch(`http://91.108.111.180:8000/Add_faculty/analyze-feedback/${facultyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setFeedbackData(data.faculty_feedback);
    })
    .catch(error => {
      console.error('There was a problem fetching the feedback data:', error);
    });
}, [facultyId]);
  
  
    
      const navigate = useNavigate();
  
      const handleClickLogOut = () => {
       // Navigate to LogIn page route when the Logout is clicked
       navigate('/');
      };
   
   
   
      
   const [MenuOpen,SetMunuOpen] = useState(false);
   
   const [IconActive, SetIconActive] = useState({
     home: false,
     evaluation: true,
     settings: false,
   });
   
   const ToggleActive = (IconName) =>{
      // Toggle the active state of icons based on their names
     SetIconActive({
       home: IconName === 'home' ? !IconActive.home : false,
       profile: IconName === 'profile' ? !IconActive.profile : false,
     
     });
   
    if (IconName === 'home'){
     navigate('/Instructors-Homepage');
       }
       
   };
  
  
  
      const [profileImage, setProfileImage] = useState(dflt_prfl_img);


      const [facultyScore, setFacultyScore] = useState(null);

      useEffect(() => {
        fetchSubjectsByDepartment();
      }, []);
    
      const fetchSubjectsByDepartment = async () => {
        try {
          const response = await fetch(`http://91.108.111.180:8000/Add_faculty/evaluation_score_per_faculty/${facultyId}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch subjects');
          }
          const data = await response.json();
          setFacultyScore(data); // Update state with fetched data
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };

      




  return (
    <div>
          



<div className='top-header'>

<div className="newlogo">
<img src={prmsu__logo} alt="logo of Prmsu"/>
</div> 




<div className='icon-menu'>
  
  <div className={`icons ${IconActive.home? 'active':''}`} onClick={()=>ToggleActive('home')}> 
    <div className='home-icon'>
    <img src={home} alt="home" />
    </div>
</div>

<div className={`icons ${IconActive.evaluation? 'active':'inactive'}`} >
  <div className='home-icon'>
 <img src={file} alt="file" />
 </div>
 </div>

</div>

<div className='dflt-prfl'  onClick={() =>{SetMunuOpen(!MenuOpen)}}>
<img className='dflt-prfl-img' src={profileImage} alt="Use" />
</div>

</div>
            <div className='content'>

<div className='content'>
<div className='mainview'>

<div className='evltn-ctnr '
style={{height:'100em'}}>
  <div className='evltn-hdr '>
  {facultyInfo && (
        <>
    <div className='evltn-dp'>
    <img src={facultyInfo.selected_image } alt="user profile" />
    </div>

    <div>
      
          <div className='evltn-p'>
    <p> 
      <span className='UserName' >
<div> <span className='FirstName'>{facultyInfo.first_name}</span></div>
   <div><span className='LastName'>{facultyInfo.last_name}
     </span></div>
     
     <div><span className='IdNumber'>{facultyInfo.id_number} </span>
     </div>
     </span>
    <br />
    </p>
    
    </div>

    
    
    </div>
    </>
      )}
    

   
    
  </div>
  {facultyScore && (
  <table style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '25em', overflowY: 'auto',maxWidth: '95em'}} className='custom-table'> 
<thead>
        <tr>
          <th style={{width:'30em'}}>A. Commitment</th>
          <th style={{width:'30em'}}>B. Knowledge of Subject</th>
          <th style={{width:'30em'}}>C. Teaching for Independent Learning</th>
          <th style={{width:'30em'}}>D. Management Learningn</th>
          <th style={{width:'10em'}}>Average</th>
          <th style={{width:'50em'}}>Feedback</th>
         
        </tr>
      </thead>
      <tbody>
                  {facultyScore.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.criteria_A}</td>
                      <td>{subject.criteria_B}</td>
                      <td>{subject.criteria_C}</td>
                      <td>{subject.criteria_D}</td>
                      <td>{subject.total_rate}</td>
                      <td>{subject.feedback}</td>
                    </tr>
                  ))}
                </tbody>
               
                
    </table>
    
 )}
 <h3>Total Rating: </h3>
                <div className='smmry' >
                  
                  
                  <p style={{margin:'0', fontSize:'20px'}}>Feedback Summary: 
                  
                  <div>
                  {feedbackData && feedbackData.sentiment !== "No evaluations found" && (
  <div>
    <p>
      In summary, this faculty mostly receives {feedbackData.sentiment} feedbacks. <br /><br />
      
      <span>
        {feedbackData.all_negative_phrases && feedbackData.all_negative_phrases.length > 0 && (
          <span>
            Here are some of the examples (
            {feedbackData.all_negative_phrases.map((phrase, index) => (
              <span key={index}>"{phrase}"{index !== feedbackData.all_negative_phrases.length - 1 && ", "} </span>
            ))}
            ). {" "}
          </span>
        )}
        
        {feedbackData.average_subjectivity && (
          <span>And most of these feedbacks are {feedbackData.average_subjectivity}s. <br />  </span>
        )}
        <br />
        {feedbackData.conclusion && <span>Conclusion: {feedbackData.conclusion}</span>}
        <br /> <br />
        {feedbackData.all_offensive_words && feedbackData.all_offensive_words.length > 0 && (
          <span>
            Strong Words Used: (
            {feedbackData.all_offensive_words.map((offensive, index) => (
              <span key={index}>"{offensive}"{index !== feedbackData.all_offensive_words.length - 1 && ", "} </span>
            ))}
            )
          </span>
        )}
      </span>
    </p>
  </div>
)}

{!feedbackData && (
  <div>
    <p>No evaluations found.</p>
  </div>
)}
    </div>
                  
                  </p>

                 
                  
                  </div>



</div>


<div >
  
</div>

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

