import React, { useEffect,useState, } from 'react';
import '../Home__Page/HomepageStyle.css';
import prmsu__logo from '../Assets/PrmsuLogo.png'
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg'

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {  useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import file from '../Assets/file.png';
import home from '../Assets/home.png';
import { Line } from 'react-chartjs-2';
import html2pdf from 'html2pdf.js';

import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Title } from 'chart.js'; // Import necessary components from Chart.js
import { Evaluation } from './Evaluation';

Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement, Title); // Register components


export const ResultPage = () => {
  const [msg1, setmsg1] = useState(false);
  const [msg2, setmsg2] = useState(false);
  const [msg3, setmsg3] = useState(false);
  const [msg4, setmsg4] = useState(false);
  const [msg5, setmsg5] = useState(false);
  const [msg6, setmsg6] = useState(false);
  const [msg7, setmsg7] = useState(false);
  const [msg8, setmsg8] = useState(false);
  const [msg9, setmsg9] = useState(false);
  const [msg10, setmsg10] = useState(false);

    
      const { facultyId } = useParams();
      const [facultyInfo, setFacultyInfo] = useState(null);
    
      useEffect(() => {
        const fetchFacultyInfo = async () => {
          try {
            const response = await fetch(`http://91.108.111.180:8000/Add_faculty/faculty_info/${facultyId}/`);
            const data = await response.json();
            setFacultyInfo(data);
          
          } catch (error) {
            console.error('Error fetching faculty information:', error);
          }
        };
    
        fetchFacultyInfo();
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
       navigate('/Admin-DashBoard');
         }
         
     };
    
    
    
        const [profileImage, setProfileImage] = useState(dflt_prfl_img);


        const [facultyScore, setFacultyScore] = useState([]);
        const [averageRating, setAverageRating] = useState(null);
        

        
     

        const getCsrfToken = () => {
          const name = 'csrftoken=';
          const decodedCookie = decodeURIComponent(document.cookie);
          const cookieArray = decodedCookie.split(';');
        
          for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
              return cookie.substring(name.length, cookie.length);
            }
          }
        
          return null;
        };
        const [evaluations, setEvaluations] = useState([]);
        const [selectedYear, setSelectedYear] = useState('');
        const [selectedSemester, setSelectedSemester] = useState('');
        const [selectedSub, setSelectedSub] = useState("");
      
        const handleSemesterChange = (event) => {
          setSelectedSemester(event.target.value);
       
        };
        const handleSubjectChange = (e) => {
          const combinedValue = e.target.value;
          const [selectedSubjectId, selectedSubjectName] = combinedValue.split('-');
          setSelectedSub({ id: selectedSubjectId, name: selectedSubjectName });
        };
      
        const [newsubject, newsetSubjects] = useState([]);
      
        const handleYearChange = (event) => {
          setSelectedYear(event.target.value);
        
        };



        const fetchEvaluations = () => {
          if (facultyId && selectedYear && selectedSemester && selectedSub.id) {
            fetch(`http://91.108.111.180:8000/Add_faculty/fetch-evaluations/${facultyId}/${selectedSub.id}/${selectedYear}/${selectedSemester}`)
              .then(response => response.json())
              .then(data => {
                setEvaluations(data.evaluations);
                setAverageRating(data.average_rating)
               
              })
              .catch(error => console.error('Error fetching evaluations:', error));
          } else {
            // Handle case where one or more values are not selected
            // For example, you can clear the evaluations or show a message to the user
            setEvaluations([]); // Clear evaluations
           
          }
        };
        
        useEffect(() => {
          fetchEvaluations(); // Fetch evaluations initially
          
          const intervalId = setInterval(() => {
            fetchEvaluations(); // Fetch evaluations every 1 second
          }, 1000);
        
          // Clear interval on component unmount
          return () => clearInterval(intervalId);
        }, [facultyId, selectedSub, selectedYear, selectedSemester]);



        const formatAverageRating = (rating) => {
          if (rating === null || rating === undefined) {
            return 'N/A';
          }
          const numericRating = Number(rating);
          return isNaN(numericRating) ? 'N/A' : numericRating.toFixed(2);
        };


const percentage = averageRating*100/5


        const [years, setYears] = useState([]);
      
        useEffect(() => {
          // Fetch years associated with selected faculty member when selectedFaculty changes
          if (facultyId) {
            const csrfToken = getCsrfToken(); // Assuming getCsrfToken() function retrieves the CSRF token
            fetch(`  http://91.108.111.180:8000/Add_faculty/get_years/${facultyId}`, {
              headers: {
                'X-CSRFToken': csrfToken // Add CSRF token to headers
              }
            })
              .then(response => response.json())
              .then(data => {
                setYears(data.years);
              })
              .catch(error => console.error('Error fetching years:', error));
          }
        }, [facultyId]);
      
      
      
        const fetchSubjects = () => {
          if (facultyId && selectedYear && selectedSemester) {
            fetch(`http://91.108.111.180:8000/Add_faculty/fetch_subjects/${facultyId}/${selectedYear}/${selectedSemester}`)
              .then(response => response.json())
              .then(data => {
                newsetSubjects(data.subjects);
                
              })
              .catch(error => console.error('Error fetching subjects:', error));
          }
        };
        
          // Fetch subjects whenever selectedFaculty, selectedYear, or selectedSemester changes
          useEffect(() => {
            fetchSubjects();
        
        
          }, [facultyId, selectedYear, selectedSemester]);



          
        const [feedbackData, setFeedbackData] = useState(null);

        useEffect(() => {
          const fetchFeedbackData = () => {
            if (selectedYear && selectedSemester && selectedSub.id) {
              fetch(`http://91.108.111.180:8000/Add_faculty/analyze-feedback/${facultyId}/${selectedSub.id}/${selectedYear}/${selectedSemester}/`)
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
            }
          };
      
          const interval = setInterval(fetchFeedbackData, 1000);
      
          // Clear interval on component unmount
          return () => clearInterval(interval);
        }, [facultyId, selectedSub, selectedYear, selectedSemester]);
      
    
    const polarityScore = feedbackData ? feedbackData.average_polarity : null;

    const data = {
      labels: ['Polarity Score'],
      datasets: [
        {
          label: 'Polarity',
          data: [polarityScore],
          fill: true,
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 10,
        },
      ],
    };
    
    const options = {
      scales: {
        x: {
          grid: {
            color: 'black', // Hide vertical grid lines
          },
        },
        y: {
          type: 'linear',
          ticks: {
            
            values: [-1,  -0.4, 0, 0.4, 1], 
            
          },
          grid: {
            color: 'black', 
          },
        },
      },
    };
    const togglemsg2 =() =>{
      setmsg2(!msg2);
    }; 

    const generatePDF = () => {

      setmsg2(!msg2);
      const input = document.querySelector('.savable');
      const scale = 8; // Increase this value for higher resolution
      
    
      html2canvas(input, { scale: scale })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const mmToPx = (mm) => mm * 3.78; // Approximate conversion from mm to pixels
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [mmToPx(216) * scale, mmToPx(330) * scale] // Long bond paper dimensions converted to pixels
          });
          pdf.addImage(imgData, 'PNG', 0, 0, mmToPx(216) * scale, mmToPx(330) * scale); // Adding image to fit long bond paper size
          pdf.save('evaluationform.pdf');
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    };

    const mainViewStyle = {
     
     
      display: 'flex',
      fontFamily: 'serif',
      width: '2480px',
      height: '4508px',
      background: 'white',
      color: 'black',
      transform: 'scale(0.15)', // Adjust the scale value to make it smaller
      transformOrigin: 'top left', // Ensure scaling starts from top-left corner
    };
    const newmainViewStyle = {
      position: 'absolute',
    
      marginLeft: '65em',
      display: msg1 ? 'flex' : 'none',
      
      fontFamily: 'serif',
      
     
      color: 'black',
     
    };


    const getSemesterName = (semester) => {
      switch(semester) {
        case '1':
          return 'First Semester';
        case '2':
          return 'Second Semester';
        default:
          return '';
      }
    };

    const [yearAverages, setYearAverages] = useState(null);
    const [totalAverage, setTotalAverage] = useState(null);

    useEffect(() => {
      fetchData();
    }, [facultyId]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://91.108.111.180:8000/Add_faculty/calculate_averages/${facultyId}/`);
        const responseData = await response.json();
        console.log(responseData);
        setYearAverages(responseData.year_averages);
  
        // Calculate total average of all years
        let totalSum = 0;
        let totalCount = 0;
  
        Object.values(responseData.year_averages).forEach((data) => {
          if (data.student.year_avg.avg_all !== null) {
            totalSum += parseFloat(data.student.year_avg.avg_all);
            totalCount++;
          }
          if (data.admin.year_avg.avg_all !== null) {
            totalSum += parseFloat(data.admin.year_avg.avg_all);
            totalCount++;
          }
        });
 
 

  
        const overallAverage = totalCount > 0 ? (totalSum / totalCount) : null;
        setTotalAverage(overallAverage);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const calculatePercentage = (rating) => {
      return rating !== null ? ((rating * 100) / 5).toFixed(2) + '%' : 'N/A';
    };
  
   
  const calculateYearlyAverage = (studentAvg, adminAvg) => {
    if (studentAvg !== null && adminAvg !== null) {
      return (parseFloat(studentAvg) + parseFloat(adminAvg)) / 2;
    }
    return null;
  };

    
    const togglemsg1 =() =>{
      setmsg1(!msg1);
    }; 
    const togglemsg10 =() =>{
      setmsg10(!msg10);
    }; 

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


const styles = {
  yearContainer: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  yearHeading: {
    marginBottom: '10px',
    fontSize: '1.5em',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
};

const handleGeneratePDF = () => {
  const element = document.querySelector('.Evaluation_summary');
  html2canvas(element, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'letter');
    const imgWidth = 8.5 * 72; // width of the letter page in points
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('evaluation_summary.pdf');
  });
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
            





<div className='content' >
  
<div className='smll-cntnr' id='newFaculty' style={{ display:msg2 ? 'block': 'none'  ,fontFamily:'-moz-initial',fontWeight:'bold',marginLeft:'40em' }}>Generating PDF Please wait. 
  <div style={{marginTop:'1em'}}>
    <button 
     style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
    onClick={togglemsg2}>Okay</button></div></div>




<div style={newmainViewStyle}>

 

<div style={{display:'flex',flexDirection:'column'}}>

<button
onClick={generatePDF}
style={{width: '7em',height:'2.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'0.5em', marginTop:'1em' }}>
  Download</button> 

  <button
onClick={togglemsg1}
style={{width: '7em',height:'2.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'0.5em', marginTop:'1em' }}>
  Cancel</button> 

</div>





<div  id='mainview' className='savable'  style={mainViewStyle}>
  
  <div style={{display:'fle',flexDirection:'row'}}>
<div style={{display:'flex', flexDirection:'row'}}>
<img style={{height:'18em',width:'18em', marginTop:'5em',marginLeft:'15em'}} src={prmsu__logo} alt="logo of Prmsu"/>
<div style={{marginTop:'8em',marginLeft:'10em',display:'flex',flexDirection:'column',textAlign:'center'}}>
  <span style={{fontSize:'55px'}}
  >Republic of the Philippines</span>
<span style={{fontWeight:'bold',fontSize:'60px'}}>President Ramon Magsaysay State University</span>
<span style={{fontSize:'55px'}}
  >Castillejos Campus</span>
  <span style={{fontSize:'55px'}}
  >Castillejos, Zambales</span>

<span style={{marginTop:'1em',fontSize:'55px'}}
  >{getSemesterName(selectedSemester)}. S.Y <span>{selectedYear}</span></span>


</div>


</div>

<div style={{ marginTop:'5em',marginLeft:'15em'}}>
{facultyInfo && (
  <span style ={{fontWeight:'bold',fontSize:'55px'}} >Name of faculty: 
   <span style ={{display:'inline-block',borderBottom:'black solid 4px',width:'15em',fontWeight:'normal',fontSize:'55px'}} > 
    {`${facultyInfo.first_name} ${facultyInfo.last_name}`}</span>
   </span>
)}
   <span style ={{fontWeight:'bold',fontSize:'55px'}} >Course and Year: 

   <span style ={{display:'inline-block',borderBottom:'black solid 4px',width:'7em',fontWeight:'normal',fontSize:'55px'}} > 
  
  
  </span>
   </span>


</div>
<div  style={{ marginLeft:'15em'}}>
<span style ={{fontWeight:'bold',fontSize:'55px'}} >Subject:

<span style ={{display:'inline-block',borderBottom:'black solid 4px',width:'15em',fontWeight:'normal',fontSize:'55px,'}}>
   <span style={{marginLeft:'2em'}}> {selectedSub.name} </span>
  </span>
   </span>
</div>

<div  style={{ marginTop:'3em', marginLeft:'15em'}}>
<span style ={{fontWeight:'bold',fontSize:'55px'}}> Instruction: Please evaluate the faculty using the scale below.</span>


</div>

<div  style={{ marginLeft:'15em'}}>

  
<table className='new_table' style={{fontSize:'47px'}} >
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



      <table style={{fontSize:'45px',marginTop:'.5em',width:'45em'}} className='new_table'>
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
      
        <td style={{textAlign:'center'}} >
         5
        </td>
        <td style={{textAlign:'center'}} >
         4
        </td>
        <td style={{textAlign:'center'}} >
         3
        </td>
        <td style={{textAlign:'center'}} >
         2
        </td>
        <td style={{textAlign:'center'}} >
         1
        </td>
        
  
    </tr>
  ))}
</tbody>
      </table>

      
      <table style={{fontSize:'45px',marginTop:'.5em',width:'45em'}} className='new_table'>
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
      
      
      <td style={{textAlign:'center'}} >
         5
        </td>
        <td style={{textAlign:'center'}} >
         4
        </td>
        <td style={{textAlign:'center'}} >
         3
        </td>
        <td style={{textAlign:'center'}} >
         2
        </td>
        <td style={{textAlign:'center'}} >
         1
        </td>
        
        
  
    </tr>
  ))}
</tbody>
      </table>

      
      <table style={{fontSize:'45px',marginTop:'.5em',width:'45em'}} className='new_table'>
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
      
     
      <td style={{textAlign:'center'}} >
         5
        </td>
        <td style={{textAlign:'center'}} >
         4
        </td>
        <td style={{textAlign:'center'}} >
         3
        </td>
        <td style={{textAlign:'center'}} >
         2
        </td>
        <td style={{textAlign:'center'}} >
         1
        </td>
        
        
  
    </tr>
  ))}
</tbody>
      </table>

      
      <table style={{fontSize:'45px',marginTop:'.5em' ,width:'45em'}} className='new_table'>
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
      
      
      <td style={{textAlign:'center'}} >
         5
        </td>
        <td style={{textAlign:'center'}} >
         4
        </td>
        <td style={{textAlign:'center'}} >
         3
        </td>
        <td style={{textAlign:'center'}} >
         2
        </td>
        <td style={{textAlign:'center'}} >
         1
        </td>
        
  
    </tr>
  ))}
</tbody>
      </table>

      <div style={{display:'flex',flexDirection:'row',marginTop:'.5em'}}>
<div style={{fontWeight:'bold',fontSize:'55px',width:'28.5em',height:'7em'}}>
  <span>Comments:</span>
      {feedbackData && feedbackData.sentiment !== "No evaluations found" && ( 
<span> {feedbackData.conclusion &&  <span style={{fontWeight:'100'}}>{feedbackData.conclusion}</span> } </span>
)}
</div>
<div>

  <span style={{fontWeight:'bold',fontSize:'55px',width:'36.5em'}}  >Ratings: {formatAverageRating(averageRating)} ( {formatAverageRating(percentage)}%) </span>
</div>
</div>


<div style={{display:'flex',flexDirection:'row'}} >

<div  style={{display:'flex',flexDirection:'column',marginTop:'.5em'}} >

<span style={{fontWeight:'bold',fontSize:'55px'}}>Signature of Evaluator: <span style={{display:'inline-block',width:'6em',borderBottom:'black 4px solid'}} ></span>  </span>
<span style={{fontWeight:'bold',fontSize:'55px'}}>Date:  <span style={{display:'inline-block',width:'8em',borderBottom:'black 4px solid'}} ></span>  </span>

</div>

<div style={{display:'flex',flexDirection:'column',marginTop:'.5em',marginLeft:'16em'}} >
<span style={{fontWeight:'bold',fontSize:'55px'}}>Conforme: <span style={{display:'inline-block',width:'8em',borderBottom:'black 4px solid'}} ></span></span>
{facultyInfo && (
<span style={{fontWeight:'bold',fontSize:'55px'}}>Name of Faculty: <span  style={{fontWeight:'200',fontSize:'55px',borderBottom:'black 4px solid'}}>{`${facultyInfo.first_name} ${facultyInfo.last_name}`}</span></span>
)}



</div>

</div>

</div>
</div>


</div>

</div>


<div className='mainview'>
  

<div className='evltn-ctnr '

style={{height:'150em'}}>


<div 

style={{display:'flex',flexDirection:'row-reverse', marginRight:'20em'}}>
     
<button onClick={handleGeneratePDF} 
      style={{width: '9em',height:'2.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginLeft:'1em', marginTop:'.5em' }}
      >
        Save as PDF
      </button>
      <div className="Evaluation_summary" style={{ background: 'white', display: msg10? 'flex': 'none', position: 'fixed', transform: 'scale(0.7)', top: '-2.9em', right: '30em' }}>

      


        <div style={{ display: 'flex', flexDirection: 'column', padding: '.5em' }}>
          <div style={{ display: 'flex', flexDirection: 'row', padding: '.5em' }}>
            <div style={{ marginRight: '2em' }}></div>
          </div>
          <div style={{ color: 'black', width: '50em' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <img style={{ height: '4em', width: '4em' }} src={prmsu__logo} alt="logo of Prmsu" />
              <div style={{ marginTop: '.5em', marginLeft: '9.2em', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <span style={{ fontSize: '15px' }}>Republic of the Philippines</span>
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>President Ramon Magsaysay State University</span>
                <span style={{ fontSize: '15px' }}>Castillejos Campus</span>
                <span style={{ fontSize: '15px' }}>Castillejos, Zambales</span>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Summary of Evaluator</span>
                </div>
        
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
             
            {facultyInfo && (
               <div>
  <span style={{width:'10em',fontWeight: 'bold', fontSize: '18px' }}>Name of faculty: 
   <span style ={{display:'inline-block',borderBottom:'black solid 1px',width:'10em',fontWeight:'normal',fontSize:'18px'}} > 
    {`${facultyInfo.first_name} ${facultyInfo.last_name}`}</span>
   </span>
   </div>
)}

<div >
<span style={{width:'10em',fontWeight: 'bold', fontSize: '18px', }}>Academic Rank: <input style={{border:'none', borderBottom:'black 1px solid', outline:'none', fontSize: '18px' }} type=" " />   </span>
</div>
</div>
            {yearAverages ? (
              <div style={{textAlign:'center'}} >
                {Object.entries(yearAverages).map(([year, data]) => (
                  <div key={year} style={styles.yearContainer}>
                    <h3 style={styles.yearHeading}>Year: {year}</h3>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}></th>
                          <th style={styles.th}>1st Semester</th>
                          <th style={styles.th}>2nd Semester</th>
                          <th style={styles.th}>Year Average</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={styles.td}>Student Averages</td>
                          <td style={styles.td}>
                            {formatAverageRating(data.student['1st_sem'].avg_all)} ({calculatePercentage(data.student['1st_sem'].avg_all)})
                          </td>
                          <td style={styles.td}>
                            {formatAverageRating(data.student['2nd_sem'].avg_all)} ({calculatePercentage(data.student['2nd_sem'].avg_all)})
                          </td>
                          <td style={styles.td}>
                            {formatAverageRating(data.student.year_avg.avg_all)} ({calculatePercentage(data.student.year_avg.avg_all)})
                          </td>
                        </tr>
                        <tr>
                          <td style={styles.td}>Admin Averages</td>
                          <td style={styles.td}>
                            {formatAverageRating(data.admin['1st_sem'].avg_all)} ({calculatePercentage(data.admin['1st_sem'].avg_all)})
                          </td>
                          <td style={styles.td}>
                            {formatAverageRating(data.admin['2nd_sem'].avg_all)} ({calculatePercentage(data.admin['2nd_sem'].avg_all)})
                          </td>
                          <td style={styles.td}>
                            {formatAverageRating(data.admin.year_avg.avg_all)} ({calculatePercentage(data.admin.year_avg.avg_all)})
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={styles.yearlyAverage}>
                      <p>
                        <strong>
                          Yearly Average: {formatAverageRating(calculateYearlyAverage(data.student.year_avg.avg_all, data.admin.year_avg.avg_all))} ({calculatePercentage(calculateYearlyAverage(data.student.year_avg.avg_all, data.admin.year_avg.avg_all))})
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
                <div style={styles.totalAverageContainer}>
                  <h3>Total Average of All Years: {formatAverageRating(totalAverage)} ({calculatePercentage(totalAverage)})</h3>
                </div>
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
          <div style={{ color:'black', textAlign: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Confirmed:</span>
              <span>Date:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
     
 <select style={{marginRight:'2em',height:'2.5em', borderRadius:'5px',outline:'none'}} name="year" id="year" onChange={handleYearChange}>
  {/* Default option for year */}
  <option value="" selected disabled>Select Year</option>
  {/* Options for year */}
  {years.map(year => (
    <option key={year} value={year}>{year}</option>
  ))}
</select>
              <select
                style={{marginRight:'2em',height:'2.5em', borderRadius:'5px',outline:'none'}} 
                name="semester" id="semester" 
                
                onChange={handleSemesterChange}>
  {/* Default option for semester */}
  <option value="" selected disabled>Select Semester</option>
  {/* Options for semester */}
  <option value="1">First Semester</option>
  <option value="2">Second Semester</option>
</select>

<select  style={{height:'2.5em', borderRadius:'5px' ,outline:'none'}} name="subjects" id="subjects"
 onChange={handleSubjectChange}
 >
  {/* Default option for subjects */}
  <option value="" selected disabled>Select Subject</option>
  {/* Options for subjects */}
  {newsubject.map(subject => (
    <option key={subject.id} value={`${subject.id}-${subject.name}`}>{subject.name}</option>
  ))}
</select>

<button 
style={{width: '9em',height:'2.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginLeft:'1em', marginTop:'1em' }}
onClick={togglemsg1}>Generate PDF</button>

<button 
style={{width: '9em',height:'2.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginLeft:'1em', marginTop:'1em' }}
onClick={togglemsg10}>Show Summary</button>
    
    </div>
    </>
      )}
    

  
    
  </div>



  {facultyScore && (
  <table style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '25em', overflowY: 'auto',maxWidth: '100%',fontSize:'14px'}} className='custom-table'> 
<thead>
        <tr>
          <th style={{width:'30em'}}>A. Commitment</th>
          <th style={{width:'30em'}}>B. Knowledge of Subject</th>
          <th style={{width:'50em'}}>C. Teaching for Independent Learning</th>
          <th style={{width:'30em'}}>D. Management Learning</th>
          <th style={{width:'20em'}}>Average</th>
          <th style={{width:'30em'}}>Evaluator</th>
          <th style={{width:'50em'}}>Feedback</th>
         
        </tr>
      </thead>
      <tbody>
                  {evaluations.map((evaluation, index) => (
                    <tr key={index}>
                      <td>{evaluation.criteria_A}</td>
                      <td>{evaluation.criteria_B}</td>
                      <td>{evaluation.criteria_C}</td>
                      <td>{evaluation.criteria_D}</td>
                      <td>{evaluation.total_rate}</td>
                      <td> <td> {evaluation.admin_id_number }  {evaluation.student_id_number} - {evaluation.course}   </td>  </td>
                      <td style={{display:'block',maxHeight:'4em',overflowY: 'auto'}}>{evaluation.feedback}</td>
                    </tr>
                  ))}
                </tbody>
               
                
    </table>

    
 )}

 <div style={{color:'white',fontSize:'24px',alignItems:'center'}}>
 
      {feedbackData ? (
        <div style={{color:'black', background:'wheat', maxHeight:'55em', maxWidth:"55em", marginLeft:'1em',fontSize:'18px'}}>
          <div style={{display:'flex',flexDirection:'row'}}>
         
          <h5 style={{marginRight:'5em', marginLeft:'2em'}}> Positive Sentiment range from  0.3 above   </h5>
          <h5 style={{marginRight:'5em'}}> Nuetral Sentiment range from -0.15 to 0.15  </h5>
             <h5 >  Negative Sentiment range from -0.3 below  </h5>
             </div>
             <h5 style={{marginTop:'0', marginLeft:'2em'}} >Polarity Score: {polarityScore.toFixed(2)}</h5> 
              
         <Line data={data} options={options} style={{ width: '500px', height: '300px' }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
 <h3>Total Rating: {formatAverageRating(averageRating)} ( {formatAverageRating(percentage)}%)  </h3>
                <div className='smmry' >
                  
                  
                  <p style={{margin:'0', fontSize:'20px'}}>Feedback Summary: 
                  
                  <div>
                  {feedbackData && feedbackData.sentiment !== "No evaluations found" && (
  <div>
    <p>
    The average polarity score is  {polarityScore.toFixed(2)}, meaning this faculty receives a  {feedbackData.sentiment} sentiment value on his/her feedback. <br /><br />
      
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
