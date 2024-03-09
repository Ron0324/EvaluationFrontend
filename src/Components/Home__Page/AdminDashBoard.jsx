import React, { useState, useRef, useEffect, useCallback } from 'react';
import './HomepageStyle.css';
import prmsu__logo from '../Assets/PrmsuLogo.png';
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg';
import { useNavigate } from 'react-router-dom';
import profile from '../Assets/profile.jpg'


export const AdminDashBoard = () => {


 

  const [profileImage, setProfileImage] = useState(dflt_prfl_img);

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    // Trigger the file input for profile image
    fileInputRef.current.click();
  };

    const navigate = useNavigate();

    const handleClickLogOut = () => {
        // Navigate to LogIn page route when the Logout is clicked
        navigate('/LogIn');
       };

    const [MenuOpen,SetMunuOpen] = useState(false);

    const [IconActive, SetIconActive] = useState({
      dashboard: true,
      faculty: false,
      department: false,
      subject: false,
      course: false,
      students: false,
      evaluationList: false,
      evaluationForm: false,
      editProfile: false,
    });

    const ToggleActive = (IconName) =>{
      // Toggle the active state of icons based on their names
     SetIconActive({

      dashboard: IconName === 'dashboard' ? !IconActive.dashboard : false,
      faculty: IconName === 'faculty' ? !IconActive.faculty : false,
      department: IconName === 'department' ? !IconActive.department: false,
      subject: IconName === 'subject' ? !IconActive.subject : false,
      course: IconName === 'course' ? !IconActive.course : false,
      students: IconName === 'students' ? !IconActive.students : false,
      evaluationList: IconName === 'evaluationList' ? !IconActive.evaluationList: false,
      evaluationForm: IconName === 'evaluationFrom' ? !IconActive.evaluationForm: false,
      editProfile: IconName === 'editProfile' ? !IconActive.editProfile: false,
     });


    };

    
    const [VisibleDiv,setVisibleDiv] = useState (false);

    const toggleVisibility = () =>{
      setVisibleDiv(!VisibleDiv);

    };//hide and show small divs in Evaluation list

    const [showNewFaculty, setShowNewFaculty] = useState(false);

    const toggleNewFaculty =() =>{
      setShowNewFaculty(!showNewFaculty);
    }; //hide and show  new faculty

    const [showAddDepartmentDiv, setShowDepartmentDiv] = useState(false);

    const toggleAddDepartment = () => {
      setShowDepartmentDiv(!showAddDepartmentDiv);

    };
  
    const [showAddSubjectDiv, setShowSubjectDiv] = useState(false);

    const toggleAddSubject = () => {
      setShowSubjectDiv(!showAddSubjectDiv);

    };

    const [showAddCourseDiv, setShowCourseDiv] = useState(false);

    const toggleAddCourse = () => {
      setShowCourseDiv(!showAddCourseDiv);

    };

    const [showAddStudentDiv, setShowStudentDiv] = useState(false);

    const toggleAddStudent = () => {
      setShowStudentDiv(!showAddStudentDiv);

    };

   

    





  

  //handling added subject to the table sample code no data base


  const containerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 18em))',
    maxHeight: '38em',
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






const newcontainerStyles = {
  
  overflow: 'auto',
  maxHeight: '44em',
  marginTop: '2em',
  marginBottom: '5em',
  
  


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


//server configuration and functions
const [formData, setFormData] = useState({
  CodeName: '',
  Descriptions: '',
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

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

const handleSelectDepartment = (departmentDescription) => {
  setSelectedDepartmentId(departmentDescription);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.CodeName || !formData.Descriptions) {
    alert('Code Name and Description are required.');
  } else {
    try {
      const csrfToken = getCsrfToken();
      console.log('CSRF Token:', csrfToken);
      const response = await fetch('http://52.199.99.23:8000/Departments/api/save_department/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Success:', data);

      if (data.message === 'Duplicate entry. Department not saved.') {
        // Handle duplicate entry error
        alert('Duplicate entry. Department already exists.');
      } else if (data.message === 'CodeName is required') {
        // Handle CodeName required error
        alert('CodeName is required. Please provide a valid CodeName.');
      } else {
        // Handle success, such as showing a success message or redirecting
        alert('Department saved successfully');
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }

      // Handle errors, such as displaying an error message
      alert('Error saving department. Please try again.');
    }
  }
};

const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://52.199.99.23:8000/Departments/show_departments/?search=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }, [searchQuery, setDepartments]);
  
  useEffect(() => {
    fetchData();
  
    const intervalId = setInterval(() => fetchData(), 5000);
  
    return () => clearInterval(intervalId);
  }, [fetchData]);
  
  // Filter departments based on the search query
  const filteredDepartments = departments.filter((department) =>
    department.CodeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    department.Descriptions.toLowerCase().includes(searchQuery.toLowerCase()) ||
    department.id.toString().includes(searchQuery)
  );

const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);


const [subjectsData, setSubjectsData] = useState({ Subname: '', SubDescriptions: '' });


const newhandleSubChange = (e) => {
  setSubjectsData({
    ...subjectsData,
    [e.target.name]: e.target.value,
  });
};


const handleAddSubject = async (departmentId) => {
    try {
      const response = await fetch(`http://52.199.99.23:8000/Departments/api/save_multiple_subjects/${departmentId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjects_data: [subjectsData] }), // Pass subjectsData as an array
      });

      if (!response.ok) {
        throw new Error('Failed to save subjects');       
      }  

      const data = await response.json();
      console.log(data.message);
      alert('Subjects saved successfully');
      
      
    } catch (error) {
      console.error('Error adding subjects:', error);
      alert('Failed to save subjects. Please try again.');
     
    }
  };


  
  
const [searchSubjQuery, setSearchSubjQuery] = useState('');

const subFetchData = useCallback(async () => {
  try {
    const response = await fetch(`http://52.199.99.23:8000/Departments/show_subjects/?search=${searchSubjQuery}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const subData = await response.json();
    setSubjects(subData);
  } catch (error) {
    console.error('Error fetching Subjects:', error);
  }
}, [searchSubjQuery]);

useEffect(() => {
  subFetchData();

  const subIntervalId = setInterval(subFetchData, 5000);

  return () => clearInterval(subIntervalId);
}, [subFetchData]);


const [subjects, setSubjects] = useState([]);
const filteredSubjects = subjects.filter((subject) =>
  subject.Subname.toLowerCase().includes(searchSubjQuery.toLowerCase()) ||
  subject.SubDescriptions.toLowerCase().includes(searchSubjQuery.toLowerCase()) ||
  subject.id.toString().includes(searchSubjQuery)
);


const [facultyList, setFacultyList] = useState([]);

useEffect(() => {
  // Function to fetch faculty data
  const fetchFacultyData = async () => {
    try {
      const response = await fetch('http://52.199.99.23:8000/Add_faculty/show_all_faculty/');
      const data = await response.json();
      setFacultyList(data);
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
   

    
    const setDepartmentIdTonull = () =>{
      setSelectedDepartmentId(null);
    }; 
    

    const [subjectData, setSubjectData] = useState([]);

    const fetchSubjectsByDepartment = async (departmentId) => {
      try {
          const response = await fetch(`http://52.199.99.23:8000/Departments/show_subjects_by_department/${departmentId}/`);
          if (!response.ok) {
              throw new Error('Failed to fetch subjects');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching subjects:', error);
          return null;
      }
  };
  
  const loadSubjects = useCallback(async () => {
      const updatedSubjectData = [];
      for (const department of filteredDepartments) {
          const subjects = await fetchSubjectsByDepartment(department.id);
          updatedSubjectData.push({ departmentId: department.id, subjects });
      }
      setSubjectData(updatedSubjectData);
  }, [filteredDepartments]); // Include filteredDepartments in the dependency array
  
  useEffect(() => {
    const newintervalId = setInterval(() => {
      loadSubjects();
  }, 2000); // Interval of 5000ms

  // Clear interval on component unmount
  return () => clearInterval(newintervalId);
      
  }, [loadSubjects]);




  const [tableData, setTableData] = useState([]);
    
 
    const handleRemoveSubject = (id) => {
      const updatedTableData = tableData.filter(subject => subject.id !== id);
      setTableData(updatedTableData);
    };






    const [passwordError, setPasswordError] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');

const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    newsetFormData({ ...newformData, password: newPassword });
    // Clear password error when user types in the password field
    setPasswordError('');
};

const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    newsetFormData({ ...newformData, confirmPassword: newConfirmPassword });
    // Clear confirm password error when user types in the confirm password field
    setConfirmPasswordError('');
};

const validatePassword = () => {
    if (!newformData.password) {
        setPasswordError('Password cannot be empty');
        return false;
    }
    return true;
};

const validateConfirmPassword = () => {
    if (!newformData.confirmPassword) {
        setConfirmPasswordError('Confirm Password cannot be empty');
        return false;
    }
    if (newformData.password !== newformData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        return false;
    }
    return true;
};





const [newformData, newsetFormData] = useState({
  id_number: '',
  first_name: '',
  last_name: '',
  password: '', // Add password field
  selected_image: null,
  status: '',
  subjects: [],
});

const [selectedImage, setSelectedImage] = useState('profile.jpg');
const [imageChanged, setImageChanged] = useState(false);
const fileInputRef = useRef(null);
const newfileInputRef = useRef(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Set selectedImage to the file name
    setSelectedImage(file.name);
    setImageChanged(true);
    // Update formData with the selected image
    newsetFormData(prevData => ({
      ...prevData,
      selected_image: file,
    }));
  }
};
const newhandleSubmit = async (e) => {
  e.preventDefault();

  if (!imageChanged) {
    alert('Please select a new image or change the default image before saving.');
    return;
  }

  if (!validatePassword() || !validateConfirmPassword()) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append('id_number', newformData.id_number);
    formData.append('first_name', newformData.first_name);
    formData.append('last_name', newformData.last_name);
    formData.append('password', newformData.password);
    formData.append('status', newformData.status);
    formData.append('selected_image', newformData.selected_image);

    newformData.selected_subject_ids.forEach(subjectId => {
      formData.append('selected_subjects', subjectId); // Change to 'selected_subjects'
    });

    const response = await fetch('http://52.199.99.23:8000/Add_faculty/save_faculty/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCsrfToken(),
      },
      body: formData,
      
    });

    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);
      // Reset form and table data if faculty data is saved successfully
      newsetFormData({
        id_number: '',
        first_name: '',
        last_name: '',
        password: '',
        selected_image: null,
        status: '',
        selected_subject_ids: [], // Reset selected subject IDs
      });
      setTableData([]);
    } else {
      alert('Error saving faculty data.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while saving faculty data.');
  }
};

const handleSelectChange = (event) => {
  const selectedId = parseInt(event.target.value, 10);

  const selectedSubject = subjects.find(subject => subject.id === selectedId);

  if (selectedSubject && !tableData.some(subject => subject.id === selectedId)) {
    setTableData(prevTableData => [...prevTableData, selectedSubject]);
  }

  newsetFormData(prevData => {
    const selectedIds = prevData.selected_subject_ids || [];
    if (!isNaN(selectedId)) {
      const isAlreadySelected = selectedIds.includes(selectedId);
      if (!isAlreadySelected) {
        return {
          ...prevData,
          selected_subject_ids: [...selectedIds, selectedId]
        };
      } else {
        return {
          ...prevData,
          selected_subject_ids: selectedIds.filter(id => id !== selectedId)
        };
      }
    }
    return prevData;
  });
};

const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete all faculty records?")) {
      // Get the CSRF token from the cookie
      const csrfToken = getCsrfToken();

      fetch('http://52.199.99.23:8000/Add_faculty/delete_all_faculty_records/', {
          method: 'DELETE',
          headers: {
            'X-CSRFToken': csrfToken, // Include CSRF token in the request headers
          },
      })
      .then(response => {
          if (response.ok) {
              alert('All faculty records deleted successfully');
          } else {
              alert('Error deleting faculty records');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while deleting faculty records');
      });
  }
};
const [Course_formData, Course_setFormData] = useState({
  course_name: '',
  description: '',
  department: '',
});

const Course_Change = (e) => {
  console.log('Event:', e); 
  Course_setFormData({
    ...Course_formData,
    [e.target.name]: e.target.value,
  });
};

const handleDepartmentChange = (e) => {
  Course_setFormData({
    ...Course_formData,
    department: e.target.value,
  });
};

const [error, setError] = useState('');

const Course_Submit = async (e) => {

  e.preventDefault();

  if (!Course_formData.course_name || !Course_formData.description || !Course_formData.department) {
    alert('Course name, description, and department are required.');
  } else {
    try {
      const csrfToken = getCsrfToken();
      console.log('CSRF Token:', csrfToken);
      const response = await fetch('http://52.199.99.23:8000/Courses/save_course/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(Course_formData),
      });

      const data = await response.json();
      console.log('Success:', data);

      if (data.message === 'Duplicate entry. Course not saved.') {
        // Handle duplicate entry error
        setError('Duplicate entry. Course already exists.');
      } else if (data.message === 'Course name is required') {
        // Handle Course name required error
        setError('Course name is required. Please provide a valid Course name.');
      } else {
        // Handle success, such as showing a success message or redirecting
        alert('Course saved successfully');
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }

      // Handle errors, such as displaying an error message
      alert('Error saving course. Please try again.');
    }
  }
};
const [students, setStudents] = useState([]);
const [student_searchQuery, student_setSearchQuery] = useState('');

const student_fetchData = useCallback(async () => {
  try {
    const response = await fetch(`http://52.199.99.23:8000/Courses/show_Students/?search=${student_searchQuery}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setStudents(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}, [student_searchQuery, setStudents]);

useEffect(() => {
  student_fetchData();

  const intervalId = setInterval(() => student_fetchData(), 5000);

  return () => clearInterval(intervalId);
}, [student_fetchData]);


const filteredStudents = students.filter((student) =>
  student.id_number.toLowerCase().includes(student_searchQuery.toLowerCase()) ||
  student.first_name.toLowerCase().includes(student_searchQuery.toLowerCase()) ||
  student.last_name.toLowerCase().includes(student_searchQuery.toLowerCase()) ||
  student.suffix.toLowerCase().includes(student_searchQuery.toLowerCase()) ||
  student.course.toLowerCase().includes(student_searchQuery.toLowerCase())
);



const [courses, setCourses] = useState([]);
const [course_searchQuery, course_setSearchQuery] = useState('');

const course_fetchData = useCallback(async () => {
  try {
    const response = await fetch(`http://52.199.99.23:8000/Courses/show_courses/?search=${course_searchQuery}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setCourses(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}, [course_searchQuery, setCourses]);

useEffect(() => {
  course_fetchData();

  const intervalId = setInterval(() => course_fetchData(), 5000);

  return () => clearInterval(intervalId);
}, [course_fetchData]);

// Filter courses based on the search query
const filteredCourses = courses.filter((course) =>
  course.course_name.toLowerCase().includes(course_searchQuery.toLowerCase()) ||
  course.description.toLowerCase().includes(course_searchQuery.toLowerCase()) ||
  course.department.toLowerCase().includes(course_searchQuery.toLowerCase()) ||
  course.id.toString().includes(course_searchQuery)
);

const [studentFormData, setStudentFormData] = useState({
  id_number: '',
  first_name: '',
  last_name: '',
  suffix: '',
  course: '',
  password: '',
  
  
});

const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    setCsrfToken(csrftoken);
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };


const handleInputChange = (e) => {
  setStudentFormData({
    ...studentFormData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmitStudent = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://52.199.99.23:8000/Courses/create_students/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(studentFormData),  // Use studentFormData here
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.error('Failed to create student');
    }
  } catch (error) {
    console.error('Error creating student:', error);
  }
};


const [criteriaList, setCriteriaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://52.199.99.23:8000/Criteria/show_criteria/');
        const data = await response.json();
        setCriteriaList(data);
      } catch (error) {
        console.error('Error fetching criteria data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <div className='top-header'>

    <div className="newlogo">
    <img src={prmsu__logo} alt="logo of Prmsu"/>
    </div>
    <h2 style={{display:'contents'}}>PRMSU Castillejos Faculty Evaluation System</h2>
    
    
    <div className='dflt-prfl'  onClick={() =>{SetMunuOpen(!MenuOpen)}}>
    <img className='dflt-prfl-img' src={dflt_prfl_img } alt="Use" />
    </div>
    
    </div>

    <div className='content'>
<div className='lft-slctn' style= {{height:'100%',width:'20%',backgroundColor:'#0a193a',borderRadius:'8px', borderTop:'rgb(209, 173, 13) solid 3px', borderBottom:'rgb(209, 173, 13) solid 3px', borderRight:'rgb(209, 173, 13) solid 3px',borderLeft:'none', borderTopLeftRadius:'0'}}>

<h3 className={`admn-slctn ${IconActive.dashboard? 'active':'inactive'}`} onClick={()=>ToggleActive('dashboard')} style={{ cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderTop:'1px solid #a39d9d',borderBottom:'1px solid #a39d9d'  } }>Dashboard

</h3>

<h3 className={`admn-slctn ${IconActive.faculty? 'active':'inactive'}`}onClick={()=>ToggleActive('faculty')} 
style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Faculty

</h3>

<h3 className={`admn-slctn ${IconActive.department? 'active':'inactive'}`} onClick={()=>ToggleActive('department')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Department

</h3>

<h3  className={`admn-slctn ${IconActive.subject? 'active':'inactive'}`} onClick={()=>ToggleActive('subject')}
style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Subject

</h3>

<h3 className={`admn-slctn ${IconActive.course? 'active':'inactive'}`} onClick={()=>ToggleActive('course')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Courses

</h3>

<h3 className={`admn-slctn ${IconActive.students? 'active':'inactive'}`} onClick={()=>ToggleActive('students')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Students

</h3>

<h3 className={`admn-slctn ${IconActive.evaluationList? 'active':'inactive'}`} onClick={()=>ToggleActive('evaluationList')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Evaluation List

</h3>
<h3 className={`admn-slctn ${IconActive.evaluationForm? 'active':'inactive'}`} onClick={()=>ToggleActive('evaluationFrom')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Evaluation Form

</h3>

<h3 className={`admn-slctn ${IconActive.editProfile? 'active':'inactive'}`} onClick={()=>ToggleActive('editProfile')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em',borderBottom:'1px solid #a39d9d'  } }>
  Edit Profile

</h3>



</div>

<div className='mainview'>

    <div className='dshbrd-view'
 style={{
  paddingLeft: '1em',
  background: 'white',
  height: '100%',
  width: '88%',
  marginTop: '2em',
  boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',
  borderRadius: '8px',
  paddingRight: '1em',
  color: 'black',
  display: IconActive.dashboard ? 'block' : 'none'
}}>

<div style={{display: 'flex',borderBottom:'grey solid 1px'}}>
    <h3>Evaluation Result</h3>

    <input style={{marginTop:'1.2em',outline:'none',position:'relative',right: '-59em',borderTop:'black solid 2px',borderLeft:'black solid 2px',borderBottom:'2px solid #564c4cba',borderRight:'2px solid #564c4cba',height:'2em'}}
       type="search" name="" id="" placeholder='Search'/>
    
</div>
<div style={{display: 'flex',borderBottom:'grey solid 1px'}}>
    <p>
            <span className='Scndname'> Second Name,</span>
            <span className='frst-name'> Frist Name</span>
    </p>
</div>
<div style={{display: 'flex',borderBottom:'grey solid 1px',flexDirection:'column'}}>
    <h4>
            Select Class
    </h4>
    
    <div style={{display: 'flex',flexDirection:'row'}} >
    <select defaultValue="" style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em'}}
     name="clss&sub" id="clss&sub">
      
        <option value="" disabled>Select Subject</option>
        <option value=""></option>
        <option value=""></option>
    </select>

    <select  defaultValue=""style={{marginLeft:'2em',width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em'}} name="clss&sub" id="clss&sub">
        <option  value="" disabled>Select Sem</option>
        <option value=""></option>
        <option value=""></option>
       
    </select>
    </div>

</div>

<div style={{borderBottom:'grey solid 1px' }}>
<table className='custom-table'
 style={{color:'white',backgroundColor:'#0a193a',marginBottom:'2em'}}>
        <thead>
          <tr >
            <th >No.</th>
            <th >Commitment</th>
            <th >Average</th>
            <th >Knowledge of Subject</th>
            <th >Average</th>
            <th >Teaching for Independent Learning</th>
            <th >Average</th>
            <th > Management Learning</th>
            <th >Average</th>
            <th >Total Ratings</th>

            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
          <td>2</td>
          <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
          <td>3</td>
          <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
          <td>4</td>
          <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
          <td>5</td>
          <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>

      

      


</div>


   
    </div>

    <div className='smll-cntnr' id='newFaculty' style={{ display: showNewFaculty ? 'block' : 'none' }}>



    <form onSubmit={newhandleSubmit}>
    <label htmlFor="fileInput" style={{ display: 'none' }}>
  Select Image
</label>

  <hr />


  <div style={{ marginTop: '2em' }}>

  <input 
  id="fileInput"
  type="file" 
  accept="image/*" 
  onChange={handleImageChange} 
 
  ref={newfileInputRef} 
/>
    <label style={{ marginLeft: '2em' }} htmlFor="id_number">
      ID Number:
    </label>
    <input
      type="text"
      id="id_number"
      name="id_number"
      value={newformData.id_number}
      onChange={(e) => newsetFormData({ ...newformData, id_number: e.target.value })}
      style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
    />
    <label htmlFor="subjects">Add Subjects:</label>
    <select
      defaultValue=""
      onChange={handleSelectChange}
      name="subjects"
      id="subjects"
      style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none', outline: 'none', marginLeft: '10px' }}
    >
      <option value="" disabled>
        Select Subjects
      </option>
      

{filteredSubjects.map((subject, index) => (
    <option key={subject.id} value={subject.id}>
      ({subject.Subname}) - {subject.SubDescriptions}
    </option>
  ))}


      
    </select>
    <div style={{ marginTop: '2em' }}>
      <label style={{ marginLeft: '2em' }} htmlFor="first_name">
        First name:
      </label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={newformData.first_name}
        onChange={(e) => newsetFormData({ ...newformData, first_name: e.target.value })}
        style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
      />
      <label htmlFor="last_name">Last name:</label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={newformData.last_name}
        onChange={(e) => newsetFormData({ ...newformData, last_name: e.target.value })}
        style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
      />
    </div>
  </div>

  <div style={{display:'flex',flexDirection:'column',marginTop:'2em'}}>
<label htmlFor=""> Password: 
<input
  type="password"
  value={newformData.password}
  onChange={handlePasswordChange}
  name="password"
  id="password"
  style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
/>
{passwordError && <div style={{color:'red'}}>{passwordError}</div>}
</label>

<label style={{marginTop:'2em'}}>
ConfirmPassword
 <input
            type="password"
            value={newformData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            name="confirmPassword"
            id="confirmPassword"
            style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
        />
        {confirmPasswordError && <div style={{color:'red'}}>{confirmPasswordError}</div>}
</label>
</div>



  <table style={{ border: 'black solid 1px', borderRadius: '7px', display: 'block', marginTop: '2em' }}>
    <thead>
      <tr>
        <th>Added Subjects:</th>
      </tr>
    </thead>
    <tbody>
    {tableData.map((subject, index) => (
  <tr key={index}>
    <td>{subject.SubDescriptions} <button onClick={() => handleRemoveSubject(subject.id)}>remove</button></td>
  </tr>
))}
    </tbody>
  </table>
  <div style={{ marginTop: '1em' }}>
    <label htmlFor="status">Status:</label>
    <select
     value={newformData.status}
     onChange={(e) => newsetFormData({ ...newformData, status: e.target.value })}
      defaultValue=""
      name="status"
      id="status"
      style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none', outline: 'none', padding: '2px' }}
    >
      <option value="" disabled>
        Select Status
      </option>
      <option value="Regular">Regular</option>
      <option value="On Call">On Call</option>
    </select>
  </div>
  <div style={{ marginTop: '1em' }}>
    <button
      type="submit"
      style={{
        width: '6em',
        height: '2em',
        background: 'rgb(0 99 255)',
        boxShadow: 'rgb(0 0 0) 0px 0px 5px',
        outline: 'none',
        borderRadius: '2px',
        border: 'none',
        color: 'white',
        marginBottom: '1em',
        marginTop: '1em',
      }}
    >
      Save
    </button>
  </div>
</form>






</div>   

   <div className='fclty-view' 
    
    style={{display: IconActive.faculty ? 'block' : 'none', paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
       onClick={toggleNewFaculty}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      > + New faculty
      </button>

      


      <input style={{outline:'none',marginLeft:'2em',borderTop:'black solid 2px',borderLeft:'black solid 2px',borderBottom:'2px solid #564c4cba',borderRight:'2px solid #564c4cba',height:'2em'}}
       type="search" name="" id="" placeholder='Search'/>


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
      type="submit"
      style={{width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      
      > Edit</button>
      
  
  </div>

</div>))}


    </div>

    </div>
    
    <div className= 'smll-cntnr' id='addDepartment' style={{display:showAddDepartmentDiv? 'block' : 'none'}} >


    <form onSubmit={handleSubmit}>

    <div>
      <label htmlFor="Coded Name:">Code Name:</label>

<input
 name="CodeName"
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
 type="text"
 value={formData.CodeName}
 onChange={handleChange}
 >


</input>
<label
style={{marginLeft:'2em'}}
 htmlFor="Description">Description:</label>
<input
 name="Descriptions"
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none', padding:'5px'}}
 type="text"
 value={formData.Descriptions}
 onChange={handleChange}
                
 /> 

      </div>

      <button
      type="submit"
      style={{width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      
      > Save</button>
  
  </form>
      
          
     </div>

    <div className='dprtmnt-view' 
    
    style={{display: IconActive.department ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
      onClick={toggleAddDepartment}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      >
+ Department
      </button>
      
    
      <input 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{outline:'none',marginLeft:'2em',borderTop:'black solid 2px',borderLeft:'black solid 2px',borderBottom:'2px solid #564c4cba',borderRight:'2px solid #564c4cba',height:'2em'}}
      type="search" name="" id="" placeholder='Search'/>

<table style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '25em', overflowY: 'auto',maxWidth: '95em'}} className='custom-table'> 
<thead>
        <tr>
          <th style={{width:'5em'}}>#</th>
          <th style={{width:'5em'}}>ID</th>
          <th style={{width:'20em'}}>Code Name</th>
          <th style={{width:'70em'}}> Description</th>
          <th> Actions</th>
        </tr>
      </thead>
      <tbody  >
      {filteredDepartments.map((department,index) => (
          <tr key={department.id}>
            <td style={{width:'5em'}}>{index}</td>
            <td style={{width:'5em',maxWidth:'15em'}}>{department.id}</td>
            <td style={{width:'20em'}}>{department.CodeName}</td>
            <td style={{width: '60em' }}>{department.Descriptions} </td>
            <td style={{width:'5em'}}>

           <div style={{display:"flex",flexDirection:'row'}}>

           <button
                  style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>Update</button>
            <button
                  style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }} >Delete</button>

           </div>
                     
          </td>
          </tr>
        ))}
      </tbody>
    </table>
   
    </div>



    <div className= 'smll-cntnr' id='addSubject' style={{display:showAddSubjectDiv? 'block' : 'none'}} >

<div>
 <form onSubmit={(e) => {
      e.preventDefault(); // Prevent default form submission behavior
      handleAddSubject(selectedDepartmentId); // Call handleAddSubject with the selected departmentId
    }}>
      <div>
        <div style={{ marginBottom: '2em' }}>
          <label style={{ fontSize: '1.4em', fontWeight: '500' }}>
            {selectedDepartmentId ? `Department: ${selectedDepartmentId}` : 'No Department Selected'}
          </label>
        </div>
        <label htmlFor="Subject_Coded_Name">Subject Code:</label>
        <input
          name="Subname"
          value={subjectsData.Subname}
          onChange={newhandleSubChange}
          style={{ border: 'none', borderBottom: 'black 1.5px solid', outline: 'none', padding: '5px' }}
          type="text"
        />
        <label style={{ marginLeft: '2em' }} htmlFor="Description">
          Description:
        </label>
        <input
          name="SubDescriptions"
          value={subjectsData.SubDescriptions}
          onChange={newhandleSubChange}
          style={{ border: 'none', borderBottom: 'black 1.5px solid', outline: 'none', padding: '5px' }}
          type="text"
        />
      </div>
      <button
        type="submit"
        style={{
          width: '5em',
          height: '2em',
          background: 'rgb(0 99 255)',
          boxShadow: 'rgb(0 0 0) 0px 0px 5px',
          outline: 'none',
          borderRadius: '2px',
          border: 'none',
          color: 'white',
          marginBottom: '1em',
          marginTop: '1em',
        }}
      >
        Save
      </button>
    </form>

    <button
    onClick={() => {
          setDepartmentIdTonull();
          toggleAddSubject(); 

        }}
      style={{
          width: '5em',
          height: '2em',
          background: 'rgb(0 99 255)',
          boxShadow: 'rgb(0 0 0) 0px 0px 5px',
          outline: 'none',
          borderRadius: '2px',
          border: 'none',
          color: 'white',
          marginBottom: '1em',
          marginTop: '1em',
        }}>Done</button>
</div>



    
</div>


    <div className='sbjct-view' 
    
    style={{ display: IconActive.subject ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
   <div style={newcontainerStyles}>
   {subjectData.map(({ departmentId, subjects }) => (
        <div key={departmentId}>
          <div style={{marginBottom:'2em', marginTop: '2em',padding:'1em',background:'#19c2e7e3',borderRadius:'0.8em',boxShadow:"rgb(0,0,0) 2px 4px 4px",maxWidth:'96%'}}>
            <label style={{ fontSize: '1.4em', fontWeight: '500' }}>
              {filteredDepartments.find(dep => dep.id === departmentId)?.Descriptions}
            </label>
          </div>
          <button
            onClick={() => {
              handleSelectDepartment(departmentId);
              toggleAddSubject();
            }}
            style={{
              width: '11em', height: '2em', background: 'rgb(0 99 255)', boxShadow: 'rgb(0 0 0) 0px 0px 5px',
              outline: 'none', borderRadius: '2px', border: 'none', color: 'white', marginBottom: '1em', marginTop: '1em'
            }}
          >
            + Subject
          </button>
          <input
            value={searchSubjQuery}
            onChange={(e) => setSearchSubjQuery(e.target.value)}
            style={{
              outline: 'none', marginLeft: '2em', borderTop: 'black solid 2px', borderLeft: 'black solid 2px',
              borderBottom: '2px solid #564c4cba', borderRight: '2px solid #564c4cba', height: '2em'
            }}
            type="search"
            name=""
            id=""
            placeholder='Search'
          />
          <table   style={{marginBottom:'2em', display: 'block', color: 'white', fontFamily: 'serif', backgroundColor: '#0a193a', maxHeight: '25em', overflowY: 'auto', maxWidth: '95em' }}
           className='custom-table'
          >
            <thead>
              <tr>
                <th style={{ width: '10em' }} >#</th>
                <th style={{ width: '10em' }} >Subject Code</th>
                <th style={{ width: '70em' }} >Subject Description</th>
                <th style={{ width: '10em' }}>Actions </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subject.Subname}</td>
                  <td>{subject.SubDescriptions} </td>
                  <td>
                  <div style={{display:"flex",flexDirection:'row'}}>
<button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>Update</button>
 <button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }} >Delete</button>

</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </div>
      ))}
</div>

      
     
      
   
    </div>

 <div className= 'smll-cntnr' id='addCourse' style={{display:showAddCourseDiv? 'block' : 'none'}} >

<div>
<label htmlFor="Select_Department:">Department:</label>


<form onSubmit={Course_Submit}>


<select 
value={Course_formData.department}
onChange={handleDepartmentChange}

  name="department" id="select_Department" 
        style={{borderLeft:'none',borderTop:'none',borderRight:'none',outline:'none',padding:'2px'}}>
          <option value="" disabled>Select Department: </option>

          {filteredDepartments.map((department) => (
      <option 
      key={department.id}
       value={department.codeName}>
        {department.CodeName}
      </option>
      ))}



       </select >
       <label
       style={{marginLeft:'3em'}}
       htmlFor="course_name">Course Name:</label>

<input
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
type="text"
value={Course_formData.course_name}
onChange={Course_Change}
name="course_name"
 />



<label
style={{marginLeft:'2em'}}
htmlFor="description">Description:</label>
<input
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none', padding:'5px'}}
value={Course_formData.description}
onChange={Course_Change}
type="text"
name="description" 
 
 /> 

<div>
<button
style={{width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
type='submit'
> Save</button>
</div>

</form>


</div>


    
</div>

<div className='Crses-view' 
    
    style={{display: IconActive.course ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
      onClick={toggleAddCourse}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      >
+ Course
      </button >
      <input style={{outline:'none',marginLeft:'2em',borderTop:'black solid 2px',borderLeft:'black solid 2px',borderBottom:'2px solid #564c4cba',borderRight:'2px solid #564c4cba',height:'2em'}}
       type="search" name="" id="" placeholder='Search'/>
   <table  style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '25em', overflowY: 'auto',maxWidth: '95em'}}  className='custom-table'> 
       <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            Department
          </th>
          <th>
            Name
          </th>
          <th>
           Description
          </th>
          <th>Actions</th>
          
        </tr>
       </thead>
       <tbody>
        {filteredCourses.map((course,index) => (
          <tr key={course.id}>
             <td style={{width:'5em'}}>{index}</td>
            <td style={{width:'5em',maxWidth:'15em'}}>{course.department}</td>
            <td style={{width:'20em'}}>{course.course_name}</td>
            <td style={{width: '60em' }}>{course.description} </td>
            <td style={{width:'5em'}}>

<div style={{display:"flex",flexDirection:'row'}}>

<button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>Update</button>
 <button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }} >Delete</button>

</div>
          
</td>
          </tr>
        ))}
       </tbody>
       </table>
    </div>

   





<div className= 'smll-cntnr' id='addStudent' style={{display:showAddStudentDiv? 'block' : 'none'}} >


 <form onSubmit={handleSubmitStudent}>
<div style={{marginBottom:'2em'}}>
<label htmlFor="Student Number">ID Number: </label>

<input
style={{borderLeft:"none", borderRight:'none', borderTop:'none', borderBottom:'1.5px solid black', padding: '4px',outline:'none'}}
type="text"
name="id_number"
value={formData.id_number}
onChange={handleInputChange} />

       <label
       style={{marginLeft:'3em'}}
        htmlFor="First Name">First Name:</label>

<input
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
type="text"
name="first_name"
value={formData.first_name}
onChange={handleInputChange}>

</input>

</div>
<hr />

<div style={{marginTop:'1em',marginBottom:'2em'}}>

  
<label
      
        htmlFor="Last Name">Last Name:</label>

<input
name='last_name'
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
type="text"
value={formData.last_name}
 onChange={handleInputChange}>

</input>

<label
       style={{marginLeft:'3em'}}
        htmlFor="Suffix">Suffix Name:</label>

<input
name='suffix'
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
type="text"
value={formData.suffix}
onChange={handleInputChange}>

</input>


<label htmlFor="Select_Course:">Course:</label>
<select value={studentFormData.course}
        onChange={handleInputChange}
        name="course" 
        style={{borderLeft:'none',borderTop:'none',borderRight:'none',outline:'none',padding:'2px'}}>

          <option value="" disabled>Select Course: </option>
          {filteredCourses.map((course) => (
      <option key={course.id}  value={course.course_name}>
        {course.course_name}
      </option>
      ))}
       </select >

</div>
<hr />
<div>
<label htmlFor="Student Pass">Password: </label>
<input
 value={formData.password}
      onChange={handleInputChange}
       name='password'
        type="password" />

<label style={{marginLeft:'3em'}} htmlFor="Confrim Student Pass">Confrim Password: </label>
<input name='confrm-pass' type="password" />
</div>


<hr />
<div>
<button
style={{width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
type='submit'
> Save</button>
</div>
</form>


<button
style={{marginLeft:'3em', width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
> Import</button>
    
</div>

    <div className='stdnt-view' 
    
    style={{display: IconActive.students ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
      onClick={toggleAddStudent}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      >
+ Students
      </button>


      <input style={{outline:'none',marginLeft:'5em',borderTop:'black solid 2px',borderLeft:'black solid 2px',borderBottom:'2px solid #564c4cba',borderRight:'2px solid #564c4cba',height:'2em'}}
       type="search" name="" id="" placeholder='Search'/>


<table style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '25em', overflowY: 'auto',width: '100%'}}  className='custom-table'> 
       <thead style={{width:'100%'}}>
        <tr>
          
          <th style={{width:'24%'}}>
            ID number
          </th>
          <th style={{width:'50%'}}>
            Name
          </th>
          <th style={{width:'42%'}}>
           Course
          </th >
          <th style={{width:'20%'}}>
           Actions
          </th>
        </tr>
       </thead >
       <tbody style={{width:'100%'}}>
        {filteredStudents.map((student) => (
          <tr key={student.id}>
             <td style={{width:'20%'}}>{student.id_number}</td>
            <td style={{width:'20%'}}>{student.first_name}  {student.last_name} {student.suffix} </td>
            <td style={{width:'20%'}}>{student.course}</td>
            <td style={{width:'20%'}}>

<div style={{display:"flex",flexDirection:'row'}}>

<button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>Update</button>
 <button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }} >Delete</button>

</div>
          
</td>
          </tr>
        ))}
       </tbody>
       </table>
   
    </div>

<div className='smll-cntnr' id='new evaluation' style={{display:VisibleDiv ? 'block' : 'none'}}>
  <div style={{display:'flex',flexDirection:'column', marginBottom:'1.5em'}}>
  <label htmlFor=""> Semester:</label> 
    <select defaultValue=""
    style={{borderLeft:'none',borderTop:'none',borderRight:'none',outline:'none'}}
     name="" id="">
       <option value="" disabled>Select Semester </option>
       <option value="1stsem">1st-Sem</option>
       <option value="2ndsem">2nd-Sem</option>

    </select>
  </div>
  <div style={{display:'flex',flexDirection:'column', marginBottom:'1.5em'}}>
  <label htmlFor=""> Date:
  
  </label> 
  </div>
  <div>
  <label style={{marginRight:'1em'}} htmlFor=""> From:  
  </label> 
  <input type="date" />
  <label style={{marginRight:'1em'}}  htmlFor=""> To:  
  </label> 
  <input type="date" />
  </div>
  <button onClick={toggleVisibility}
   style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }} >Done</button>
</div>


    <div className='evltn-lst-view' 
    style={{display: IconActive.evaluationList ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}> 
    

     <div style={{display: 'flex',borderBottom:'grey solid 1px'}}>

      <button onClick={toggleVisibility}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      >
Start New Evaluation
      </button>
      
       </div>

       <div style={{display: 'flex',borderBottom:'grey solid 1px'}}>

       <table style={{color:'white', fontFamily:'serif',backgroundColor:'#0a193a', height:'20em'}} className='custom-table'> 
       <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            Semester
          </th>
          <th>
            From
          </th>
          <th>
           To
          </th>
          <th>
           Status
          </th>
        </tr>
       </thead>
       <tbody>
        <tr>
          <td>
            
          </td>
          <td>
           -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
        </tr>
        <tr>
          <td>
            
          </td>
          <td>
           -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
        </tr>
        <tr>
          <td>
            
          </td>
          <td>
           -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
        </tr>
        <tr>
          <td>
            
          </td>
          <td>
           -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
        </tr>
        <tr>
          <td>
            
          </td>
          <td>
           -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
        </tr>
        <tr>
          <td>
            
          </td>
          <td>
           -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
          <td>
            -
          </td>
        </tr>
        


       </tbody>
       </table>

       </div>
       

 
   
    </div>

    <div className='evltn-frm-view' 
    
    style={{display: IconActive.evaluationForm ? 'block' : 'none', paddingLeft:'1em', background: 'white',height: '251em',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
     <h2 style={{display:'flex'}}>CRITERIA</h2>
     
     


<table style={{color:'white', fontFamily:'serif',backgroundColor:'#0a193a', height:'20em'}} className='custom-table'>
        <thead>
          <tr>
            <th>A. Commitment</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
        {criteriaList.map((criteria) => (
          <tr key={criteria.id}> 
            <td className='dscrptv-p' >{criteria.criteria_a}
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          ))}

        </tbody>
      </table>

      <table style={{color:'white', fontFamily:'serif',backgroundColor:'#0a193a', height:'20em'}} className='custom-table'>
        <thead>
          <tr>
            <th>B. Knowledge of Subject</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
        {criteriaList.map((criteria) => (
          <tr key={criteria.id}> 
            <td className='dscrptv-p' >{criteria.criteria_b}
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          ))}
          
         
        </tbody>
      </table>

      <table style={{color:'white', fontFamily:'serif',backgroundColor:'#0a193a', height:'20em'}} className='custom-table'>
        <thead>
          <tr>
            <th>C. Teaching for Independent Learning</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
        {criteriaList.map((criteria) => (
          <tr key={criteria.id}> 
            <td className='dscrptv-p' >{criteria.criteria_c}
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          ))}

        </tbody>
      </table>
      <table style={{color:'white', fontFamily:'serif',backgroundColor:'#0a193a', height:'20em'}} className='custom-table'>
        <thead>
          <tr>
            <th>D. Management Learning</th>
            <th colSpan={5}>Scale</th>
  
          </tr>
        </thead>
        <tbody>
        {criteriaList.map((criteria) => (
          <tr key={criteria.id}> 
            <td className='dscrptv-p' >{criteria.criteria_d}
            </td>
            <td className='scl-rt'>5</td>
            <td className='scl-rt'>4</td>
            <td className='scl-rt'>3</td>
            <td className='scl-rt'>2</td>
            <td className='scl-rt'>1</td>
          </tr>
          ))}

        </tbody>
      </table>


   
    </div>

    <div className='prfile-view' 
    
    style={{display: IconActive.editProfile ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100em',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      
            {/* Display the profile picture */}
             <div className={'evltn-hdr'}>
            <div className='evltn-dp'>
                
                <img src={profileImage} alt="user profile" />
            

            {/* Use a button to trigger file input */}
            <button  style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
             onClick={handleProfileImageClick}>Upload Photo</button>

            {/* Hidden file input element */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleProfileImageUpload} />

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
        <div >
          <button style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}> Post </button>
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

        

<label htmlFor="OldPass">Old Password</label>
<input id =  "Opass" type='password'  />

<label htmlFor="NewPass">New Password</label>
<input id='Npass' type="password" />
<div >
  <button style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
  > Change Password </button>



</div>

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

        <div >
        <button style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
        > Update </button>
        

        </div>
        </div>

       


        </div>
        </form>
        
   
    </div>
    
      
<div className={`lg-out-mn ${MenuOpen? 'active':'inactive'}`} id='menu' >
<ul >

  <li onClick={handleClickLogOut}>Log Out</li>
  </ul>
</div>

</div>

</div>


</div>
    
 
  )
}
