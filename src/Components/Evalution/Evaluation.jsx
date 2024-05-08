import React, { useEffect,useState, useRef } from 'react';
import '../Home__Page/HomepageStyle.css';
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'
import cjeck from "../Assets/cjeck.png"
import {  useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import file from '../Assets/file.png';
import home from '../Assets/home.png';



export const Evaluation = () => {


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

  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    const newComment = event.target.value.replace(/[^a-zA-Z\s.,!?]/g, '');  // Replace non-letter and non-space characters with an empty string
    setComment(newComment);
  };

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
   navigate('/homepage');
     }
     
 };



    const [profileImage, setProfileImage] = useState(dflt_prfl_img);
    const fileInputRef = useRef(null);

    

    



  const [criteriaList, setCriteriaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://91.108.111.180:8000/Criteria/show_criteria/');
        const data = await response.json();
        setCriteriaList(data);
      } catch (error) {
        console.error('Error fetching criteria data:', error);
      }
    };

    fetchData();
  }, []);

  const [clickedNumbers, setClickedNumbers] = useState({});
  const [totalSum, setTotalSum] = useState(0);
  const [averageA, setAverageA] = useState(0);



  const handleTdClick = (criteriaId, number) => {
    setClickedNumbers((prevState) => ({
      ...prevState,
      [criteriaId]: prevState[criteriaId] === number ? null : number,
    }));
  };
  
  useEffect(() => {
    const selectedValues = Object.values(clickedNumbers).filter((value) => value !== null);
    const newTotalSum = selectedValues.reduce((acc, val) => acc + val, 0);
  
    // Calculate average
    const average = newTotalSum / 5;
  
    console.log(`Total Sum: ${newTotalSum}, Average: ${average}`);
    setTotalSum(newTotalSum);
    setAverageA(average);
  }, [clickedNumbers]);

 
  
  
  const getTdStyle = (criteriaId, number) => {
    const isClicked = clickedNumbers[criteriaId] === number;
    return {
      backgroundImage: isClicked ? `url(${cjeck})` : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '50px',
      height: '50px',
      cursor: 'pointer',
      transition: 'background-image 0.3s ease',
    };
  };


  //B average
  const [anotherClickedNumbers, setAnotherClickedNumbers] = useState({});
  const [totalSumB, setTotalSumB] = useState(0);
  const [averageB, setAverageB] = useState(0);

  const handleAnotherTdClick = (criteriaId, number) => {
    setAnotherClickedNumbers((prevState) => ({
      ...prevState,
      [criteriaId]: prevState[criteriaId] === number ? null : number,
    }));
  };


  useEffect(() => {
    const selectedValues = Object.values(anotherClickedNumbers).filter((value) => value !== null);
    const newTotalSum = selectedValues.reduce((acc, val) => acc + val, 0);
  
    // Calculate average
    const average = newTotalSum / 5;
  
    console.log(`Total SumB: ${newTotalSum}, Average: ${average}`);
    setTotalSumB(newTotalSum);
    setAverageB(average);
  }, [anotherClickedNumbers]);
  
  const getAnotherTdStyle = (criteriaId, number) => {
    const isClicked = anotherClickedNumbers[criteriaId] === number;
    return {
      backgroundImage: isClicked ? `url(${cjeck})` : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '50px',
      height: '50px',
      cursor: 'pointer',
      transition: 'background-image 0.3s ease',
    };
  };
  
  // Third instance
  const [additionalClickedNumbers, setAdditionalClickedNumbers] = useState({});
  const [totalSumC, setTotalSumC] = useState(0);
  const [averageC, setAverageC] = useState(0);
  
  const handleAdditionalTdClick = (criteriaId, number) => {
    setAdditionalClickedNumbers((prevState) => ({
      ...prevState,
      [criteriaId]: prevState[criteriaId] === number ? null : number,
    }));
  };
  useEffect(() => {
    const selectedValues = Object.values(additionalClickedNumbers).filter((value) => value !== null);
    const newTotalSum = selectedValues.reduce((acc, val) => acc + val, 0);
  
    // Calculate average
    const average = newTotalSum / 5;
  
    console.log(`Total SumC: ${newTotalSum}, Average: ${average}`);
    setTotalSumC(newTotalSum);
    setAverageC(average);
  }, [additionalClickedNumbers]);

  
  
  const getAdditionalTdStyle = (criteriaId, number) => {
    const isClicked = additionalClickedNumbers[criteriaId] === number;
    return {
      backgroundImage: isClicked ? `url(${cjeck})` : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '50px',
      height: '50px',
      cursor: 'pointer',
      transition: 'background-image 0.3s ease',
    };
  };
  
  // Fourth instance
  const [yetAnotherClickedNumbers, setYetAnotherClickedNumbers] = useState({});
  const [totalSumD, setTotalSumD] = useState(0);
  const [averageD, setAverageD] = useState(0);
  
  const handleYetAnotherTdClick = (criteriaId, number) => {
    setYetAnotherClickedNumbers((prevState) => ({
      ...prevState,
      [criteriaId]: prevState[criteriaId] === number ? null : number,
    }));
  };
  
  useEffect(() => {
    const selectedValues = Object.values(yetAnotherClickedNumbers).filter((value) => value !== null);
    const newTotalSum = selectedValues.reduce((acc, val) => acc + val, 0);
  
    // Calculate average
    const average = newTotalSum / 5;
  
    console.log(`Total SumD: ${newTotalSum}, Average: ${average}`);
    setTotalSumD(newTotalSum);
    setAverageD(average);
  }, [yetAnotherClickedNumbers]);

  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
   
    const total = averageA + averageB + averageC + averageD;
    const ratings = total / 4;
    setTotalRatings(ratings);
  }, [averageA, averageB, averageC, averageD]);
 console.log(`Total ratings is ${totalRatings}`)
  
  
  const getYetAnotherTdStyle = (criteriaId, number) => {
    const isClicked = yetAnotherClickedNumbers[criteriaId] === number;
    return {
      backgroundImage: isClicked ? `url(${cjeck})` : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '50px',
      height: '50px',
      cursor: 'pointer',
      transition: 'background-image 0.3s ease',
    };
  };



  
  const [allCellsFilled, setAllCellsFilled] = useState(false);

  const [showPolicy, setShowPolicy] = useState(false);

  const togglePolicy = () => {
    // Check if all criteria have been scaled for each set
    const allScaledYetAnother = criteriaList.every(criteria => {
      return [5, 4, 3, 2, 1].some(number => yetAnotherClickedNumbers[criteria.id] === number);
    });
  
    const allScaledAdditional = criteriaList.every(criteria => {
      return [5, 4, 3, 2, 1].some(number => additionalClickedNumbers[criteria.id] === number);
    });
  
    const allScaledAnother = criteriaList.every(criteria => {
      return [5, 4, 3, 2, 1].some(number => anotherClickedNumbers[criteria.id] === number);
    });
  
    const allScaled = criteriaList.every(criteria => {
      return [5, 4, 3, 2, 1].some(number => clickedNumbers[criteria.id] === number);
    });
    
    // If all criteria have been scaled for all sets, toggle showPolicy
    if (allScaledYetAnother && allScaledAdditional && allScaledAnother && allScaled) {
      setShowPolicy(!showPolicy);
    } else {
      // If one or more criteria are not scaled, display a message
      alert('Please scale all criteria before clicking "Done".');
    }
  };
  
  
  const handleSaveEvaluation = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const evaluationData = {
        evaluations_data: [
          {
            criteria_A: averageA,
            criteria_B: averageB,
            criteria_C: averageC,
            criteria_D: averageD,
            total_rate: totalRatings,
            feedback: comment,
          }
        ]
      };
  
      const response = await fetch(`http://91.108.111.180:8000/Add_faculty/save-evaluation/${facultyId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(evaluationData)
      });
  
      if (!response.ok) {
        throw new Error('Evaluation failed.');
      }
  
      const responseData = await response.json();
      console.log(responseData.message); // Log success message
    } catch (error) {
      console.error('Error saving evaluation:', error);
    }
  };
  
  
  
  


  const [showSuccess, setShowSuccess] = useState(false);

  const toggleDone = () => {
    setShowPolicy(!showPolicy);
    setShowSuccess(!showSuccess);

  };

  
  const toggleUnDone = () => {
    setShowSuccess(!showSuccess);
    navigate('/homepage');

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

<div className='evltn-ctnr '>
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

    {facultyInfo.subjects && (
            <div className='SubjectList'>
              <label htmlFor="subjects">Subjects:</label>
              <select className='slctn-sbjcts' id="subjects" name="subjects">
                {facultyInfo.subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
              </div>
          )}
    </p>
    
    
    </div>
    
    </div>
    </>
      )}
    
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
  {criteriaList.map((criteria) => (
    <tr key={criteria.id}> 
      <td className='dscrptv-p'>{criteria.criteria_a}</td>
      {[5, 4, 3, 2, 1].map((number) => (
        <td
          key={number}
          style={getTdStyle(criteria.id, number)}
          onClick={() => handleTdClick(criteria.id, number)}
        >
          {number}
        </td>
      ))}
    </tr>
  ))}
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
  {criteriaList.map((criteria) => (
    <tr key={criteria.id}> 
      <td className='dscrptv-p'>{criteria.criteria_b}</td>
      {[5, 4, 3, 2, 1].map((number) => (
        <td
          key={number}
          style={getAnotherTdStyle(criteria.id, number)}
          onClick={() =>  handleAnotherTdClick(criteria.id, number)}
        >
          {number}
        </td>
      ))}
    </tr>
  ))}
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
  {criteriaList.map((criteria) => (
    <tr key={criteria.id}> 
      <td className='dscrptv-p'>{criteria.criteria_c}</td>
      {[5, 4, 3, 2, 1].map((number) => (
        <td
          key={number}
          style={getAdditionalTdStyle (criteria.id, number)}
          onClick={() => handleAdditionalTdClick(criteria.id, number)}
        >
          {number}
        </td>
      ))}
    </tr>
  ))}
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
  {criteriaList.map((criteria) => (
    <tr key={criteria.id}> 
      <td className='dscrptv-p'>{criteria.criteria_d}</td>
      {[5, 4, 3, 2, 1].map((number) => (
        <td
          key={number}
          className='clickable-cell'
          style={getYetAnotherTdStyle(criteria.id, number)}
          onClick={() => handleYetAnotherTdClick(criteria.id, number)}
        >
          {number}
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
      
          <form onSubmit={handleSaveEvaluation}>
            
      <div className='fdbck-sctn' >
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment here"
      />






      <button
      type='button'
       style={{width: '7em',height:'2.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginLeft:'1em', marginTop:'1em' }} 
      onClick={togglePolicy}>Done</button>
     

      <div className='plcy-dn-msg' style={{alignItems:'center',justifyContent:'center', flexDirection:'column', display: showSuccess? 'flex':'none',position:'absolute', top:'50%', right:'50%', transform:'translate(50%, -60%)', background:'#d9dcdf', color: 'black', padding:'1em',boxShadow :'rgb(25, 194, 231, 0.89) 2px 4px 4px'}}
      ><img style={{objectFit:'cover'}} src={cjeck} alt="" />

      <div> <button 
      type='button'
       onClick={toggleUnDone}
       style={{background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginTop:'1em' }}
       >Done</button></div
       ></div>


      <div className='plcy' style={{ display:  showPolicy? 'block' : 'none',overflow:'auto', position:'absolute', top:'50%', right:'50%', transform:'translate(50%, -60%)', background:'white', color: 'black', padding:'1em',maxHeight:'45em', maxWidth:'36em'}}>
       <label htmlFor=""> Name: <input placeholder='Optional' type="text" />
       </label>
        <p style={{display:'flex', flexDirection:'column', fontSize:'larger'}}>
       <span style={{marginBottom:'1em',fontWeight:'600'}}>Privacy Policy for Anonymous Evaluation in PRMSU Castillejos</span> 

<span>This Privacy Policy outlines the procedures for anonymous evaluations conducted through the PRMSU  Castillejos (President Ramon Magsaysay State University Castillejos branch)  evaluation system.</span>

<span style={{marginTop:'1em', fontWeight:'600'}}>Information Collected:</span>
<span style={{marginTop:'1em'}}>1. Anonymous Evaluations:

We allow users to submit evaluations anonymously without requiring personally identifiable information, such as names or email addresses.</span>
<span style={{marginTop:'1em'}}>2. Optional Identification:

Users may choose to provide their names or other identifying information voluntarily. This information is optional and not required for evaluation submission.
Use of Information:
We commit to the following principles regarding the use of information:</span>

<span style={{marginTop:'1em', fontWeight:'600'}}>Anonymous Evaluations:</span>

<span style={{marginTop:'1em'}}>Evaluations submitted without personal identifiers will be treated as anonymous, and individual responses will not be associated with specific users.
Optional Identification:</span>

<span style={{marginTop:'1em'}}>If users choose to provide optional identification, the information will be used solely for the purpose of responding to specific feedback or inquiries.</span>
<span style={{marginTop:'1em' , fontWeight:'600'}}>Information Security:</span>
<span style={{marginTop:'1em'}}>We ensure the confidentiality of anonymous evaluations and implement measures to prevent the recording of personally identifiable information unless explicitly provided by the user.
Optional Identification:

Optional identification details, if provided, will be stored securely, and access will be restricted to authorized personnel.</span>

<span style={{marginTop:'1em'}}>By submiting  your Evaluation, you acknowledge and agree to the terms outlined in this Privacy Policy.</span>
          
        </p>
        <button 
        type='submit'
         style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}
        onClick={toggleDone}>Submit</button>

        <button
        type='button'
         onClick={togglePolicy}
        style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}
         >Cancel</button>

      </div>
    </div >
    </form>

</div>

<div ></div>

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
