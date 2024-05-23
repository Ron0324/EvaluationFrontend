import React, { useState, useRef, useEffect, useCallback } from 'react';
import './HomepageStyle.css';
import prmsu__logo from '../Assets/PrmsuLogo.png';
import dflt_prfl_img from '../Assets/dflt_prfl_img.jpeg';
import { useNavigate } from 'react-router-dom';
import profile from '../Assets/profile.jpg'
import { useLocation } from 'react-router-dom';

export const AdminDashBoard = () => {

  const location = useLocation();
  const [adminInfo, setSAdminInfo] = useState(null);

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
      id_number,
      full_name,
    
      // Add other fields if needed
    } = queryParams;

    // Set student information in state
    setSAdminInfo({
      id,
      id_number,
      full_name,
      // Add other fields if needed
    });

    
  }, [location.search]);
  console.log(adminInfo)
 

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
      dashboard: false,
      faculty: false,
      department: false,
      subject: false,
      course: false,
      students: false,
      evaluationList: false,
      evaluationForm: false,
      editProfile: false,
      evaluation: false,
      admin: false,
      evaluate: true,
      show:false,
    });
   
    

    const ToggleActive = (IconName,facultyId) =>{
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
      evaluate: IconName === 'evaluate' ? !IconActive.evaluate : false,
      evaluation: IconName === 'evaluation' ? !IconActive.evaluation : false,
      admin: IconName === 'admin' ? !IconActive.admin : false,
      show: IconName === 'show' ? !IconActive.show : false,
   

     });

     if (IconName === 'evaluation'){
      navigate(`/admin-evaluation/${facultyId}`, { state: { adminInfo } })
     

      
    } else if (IconName === 'show'){
      navigate(`/Evaluation/Results/${facultyId}`)
    }


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

    const toggleAddStudent = (e) => {
      e.stopPropagation();
      setShowStudentDiv(!showAddStudentDiv);

    };

    const [showAddAdminDiv, setShowAdminDiv] = useState(false);

    const toggleAddAdmin = () => {
      setShowAdminDiv(!showAddAdminDiv);

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
 background:'#0a193a',maxHeight:'27em',
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
      const response = await fetch('  http://91.108.111.180:8000/Departments/api/save_department/', {
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
      const response = await fetch(`  http://91.108.111.180:8000/Departments/show_departments/?search=${searchQuery}`);
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
      const response = await fetch(`  http://91.108.111.180:8000/Departments/api/save_multiple_subjects/${departmentId}/`, {
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
    const response = await fetch(`  http://91.108.111.180:8000/Departments/show_subjects/?search=${searchSubjQuery}`);
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
      const response = await fetch('  http://91.108.111.180:8000/Add_faculty/show_all_faculty/');
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
          const response = await fetch(`  http://91.108.111.180:8000/Departments/show_subjects_by_department/${departmentId}/`);
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
    const response = await fetch(' http://91.108.111.180//Add_faculty/save_faculty/', {
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
      
      });
      
    } else {
      alert('Error saving faculty data.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while saving faculty data.');
  }
};


const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete all faculty records?")) {
      // Get the CSRF token from the cookie
      const csrfToken = getCsrfToken();

      fetch('  http://91.108.111.180:8000/Add_faculty/delete_all_faculty_records/', {
          method: 'DELETE',
          headers: {
            'X-CSRFToken': csrfToken, 
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
      const response = await fetch('  http://91.108.111.180:8000/Courses/save_course/', {
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
    const response = await fetch(`   http://91.108.111.180:8000/Courses/show_Students/?search=${student_searchQuery}`);
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
  student.course.toLowerCase().includes(student_searchQuery.toLowerCase()) ||
  student.year_level.lowercase().includes(student_searchQuery.toLowerCase())
);




const updateAdmin = async () => {
  try {
    const response = await fetch(' http://91.108.111.180:8000/Courses/admin_update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedAdmin), // Send updated admin information as JSON
    });

    if (response.ok) {
      alert('Admin information updated successfully');
      // Optionally, you can reload the page or perform any other actions upon successful update
    } else {
      alert('Failed to update admin information');
    }
  } catch (error) {
    console.error('Error updating admin information:', error);
    alert('Error updating admin information');
  }
};
const handleDeleteClick = async (adminId) => {
  const confirmation = window.confirm('Are you sure you want to delete this admin?');

  if (confirmation) {
    try {
      const response = await fetch(` http://91.108.111.180:8000/Courses/admin_delete/${adminId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Admin deleted successfully');
        // Optionally, you can perform any additional actions upon successful deletion
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete admin: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Error deleting admin');
    }
  }
};





const [admins, setAdmins] = useState([]);
const [Admin_searchQuery, Admin_setSearchQuery] = useState('');

const Admin_fetchData = useCallback(async () => {
  try {
    const response = await fetch(`  http://91.108.111.180:8000/Courses/show_admins/?search=${Admin_searchQuery}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setAdmins(data);
  } catch (error) {
    console.error('Error fetching admins:', error);
  }
}, [Admin_searchQuery, setAdmins]);

useEffect(() => {
  Admin_fetchData();

  const intervalId = setInterval(() => Admin_fetchData(), 5000);

  return () => clearInterval(intervalId);
}, [Admin_fetchData]);


const filteredAdmins = admins.filter((admins) =>
  admins.full_name.toLowerCase().includes(Admin_searchQuery.toLowerCase()) ||
  admins.id_number.toLowerCase().includes(Admin_searchQuery.toLowerCase()) ||
  admins.id.toString().includes(Admin_searchQuery)
);



  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const hideSelectedAdmin = () => {
    setSelectedAdmin(null);
  };

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
  };
  const [selectedStudent, setSelectedStudent] = useState(null);

  const hideSelectedStudent = () => {
    setSelectedStudent(null);
  };
  

  const handleEditStudentClick = (student) => {
    setSelectedStudent(student);


  };


  const [newselectedFaculty, newsetSelectedFaculty] = useState(null);

  const newhideSelectedfaculty = () => {
    newsetSelectedFaculty(null);
  };

  const newhandleEditFacultySubject = (faculty) => {
    newsetSelectedFaculty(faculty);
  };
 
  

  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch years associated with selected faculty member when selectedFaculty changes
    if (newselectedFaculty) {
      const csrfToken = getCsrfToken(); // Assuming getCsrfToken() function retrieves the CSRF token
      fetch(`  http://91.108.111.180:8000/Add_faculty/get_years/${newselectedFaculty.id}`, {
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
  }, [newselectedFaculty]);


  const hideSelectedfaculty = () => {
    setSelectedFaculty(null);
  };




  

  const [selectedFaculty, setSelectedFaculty] = useState(null);


  const handleIdfacultyNumberChange = (e) => {
    setSelectedFaculty((prevFaculty) => ({
      ...prevFaculty,
      id_number: e.target.value,
    }));
  };

  const handleEditFacultySubject = (faculty) => {
    setSelectedFaculty(faculty);
  };




  

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  const [newsubject, newsetSubjects] = useState([]);
  // Function to fetch subjects based on selected year, semester, and faculty
  const fetchSubjects = () => {
  if (newselectedFaculty && selectedYear && selectedSemester) {
    fetch(`http://91.108.111.180:8000/Add_faculty/fetch_subjects/${newselectedFaculty.id}/${selectedYear}/${selectedSemester}`)
      .then(response => response.json())
      .then(data => {
        newsetSubjects(data.subjects);
        console.log('New subjects:', data.subjects);
      })
      .catch(error => console.error('Error fetching subjects:', error));
  }
};

  // Fetch subjects whenever selectedFaculty, selectedYear, or selectedSemester changes
  useEffect(() => {
    fetchSubjects();


  }, [newselectedFaculty, selectedYear, selectedSemester]);

  // Function to handle changes in the year dropdown
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Function to handle changes in the semester dropdown
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };


const [year, setYear] = useState('');
const [semester, setSemester] = useState('');
const [selectedSubject, setSelectedSubject] = useState([]);

const handleSelectChange = (event) => {
  const selectedId = parseInt(event.target.value, 10);
  const selectedSubject = subjects.find(subject => subject.id === selectedId);

  if (selectedSubject && !tableData.some(subject => subject.id === selectedId)) {
    setTableData(prevTableData => [...prevTableData, selectedSubject]);
  }

  // Update the selected_subject_ids directly
  setFormData(prevData => {
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
const subjectshandleSubmit = (e) => {
  e.preventDefault();

  // Collect form data
  const formData = {
      id: selectedFaculty.id,
      year: year,
      semester: semester,
      subjects: tableData.map(subject => subject.id) // Use tableData to collect selected subjects
  };

  // Get CSRF token from cookie or wherever it's stored
  const csrfToken = getCsrfToken();

  // Send form data to Django view using Fetch API
  fetch('http://91.108.111.180:8000/Add_faculty/add_subjects_to_faculty/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Add CSRF token to headers
      },
      body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Handle success, e.g., show a success message
          console.log("Subjects added successfully");
      } else {
          // Handle failure
          console.error("Failed to add subjects");
      }
  })
  .catch(error => {
      // Handle error
      console.error("An error occurred:", error);
  });
};





const [courses, setCourses] = useState([]);
const [course_searchQuery, course_setSearchQuery] = useState('');

const course_fetchData = useCallback(async () => {
  try {
    const response = await fetch(`  http://91.108.111.180:8000/Courses/show_courses/?search=${course_searchQuery}`);
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
  year_level: '',
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
    const response = await fetch('  http://91.108.111.180:8000/Courses/create_students/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(studentFormData),  // Use studentFormData here
    });

    if (response.ok) {
      const data = await response.json();
      
      alert('New Student created');

      const form = document.querySelector('form'); 
      form.reset();
    } 
  } catch (error) {
    console.error('Error creating student:', error);
    alert('Something went wrong creating new Student');
  }
};

const [adminFormData, setAdminFormData] = useState({
  id_number:'',
  full_name:'',
  password:'',
});

const handleNewInputChange = (e) => {
  setAdminFormData({
    ...adminFormData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmitAdmin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('  http://91.108.111.180:8000/Courses/create_admin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(adminFormData),  
    });

    if (response.ok) {
      const data = await response.json();
      
      alert('New Admin created');
    } else {
      
      alert('Failed to create new Admin');
    }
  } catch (error) {
    console.error('Error creating new Admin:', error);
    alert('Something went wrong creating new Admin');
  }
};


const [criteriaList, setCriteriaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('  http://91.108.111.180:8000/Criteria/show_criteria/');
        const data = await response.json();
        setCriteriaList(data);
      } catch (error) {
        console.error('Error fetching criteria data:', error);
      }
    };

    fetchData();
  }, []);

  const saveEvaluationDate = async () => {
    // Function to save evaluation date
    const data = {
      semester: document.getElementById('Semester').value ,
      date_started: document.getElementById('startDate').value,
      date_ended: document.getElementById('endDate').value
    };

    try {
      const response = await fetch('  http://91.108.111.180:8000/Criteria/save_evaluation_date/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'Your CSRF Token' // Replace 'Your CSRF Token' with your actual CSRF token
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('EvaluationDate saved successfully');
        // Add any further actions you want to take upon successful save
      } else {
        console.error('Failed to save EvaluationDate');
        // Handle failure case
      }
    } catch (error) {
      console.error('Error saving EvaluationDate:', error);
      // Handle error case
    }
  };

  const [evaluationDates, setEvaluationDates] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(' http://91.108.111.180:8000/Criteria/get_evaluation_dates/', {
        credentials: 'include', // Include cookies in the request
        headers: {
          'X-CSRFToken': getCookie('csrftoken') // Include CSRF token in the request headers
        }
      })
      .then(response => response.json())
      .then(data => {
        setEvaluationDates(data);
      })
      .catch(error => {
        console.error('Error fetching evaluation dates:', error);
      });
    };
  
    // Fetch data initially
    fetchData();
  
    // Set interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 4000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleStop = (id) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const updatedDates = [...evaluationDates];
    const index = updatedDates.findIndex(date => date.id === id);
    if (index !== -1) {
      updatedDates[index].date_ended = currentDate;

      fetch('  http://91.108.111.180:8000/Criteria/update_evaluation_date/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') // Include CSRF token in the request headers
        },
        body: JSON.stringify({ id, date_ended: currentDate }),
        credentials: 'include' // Include cookies in the request
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setEvaluationDates(updatedDates);
          alert('Successfully ended evaluation.');
        })
        .catch(error => {
          console.error('Error updating evaluation date:', error);
          // Handle error here (e.g., display a message to the user)
        });
    } else {
      console.error('Evaluation date with ID', id, 'not found.');
    }
  };


  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Fetch evaluation dates from Django backend
    fetch('   http://91.108.111.180:8000/Criteria/get_evaluation_dates/')
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

<h3 className={`admn-slctn ${IconActive.evaluate? 'active':'inactive'}`} onClick={()=>ToggleActive('evaluate')} style={{ cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em',borderBottom:'1px solid #a39d9d', borderTop:'1px solid #a39d9d'  } }>
  Evaluation

</h3>

<h3 className={`admn-slctn ${IconActive.dashboard? 'active':'inactive'}`} onClick={()=>ToggleActive('dashboard')} style={{ cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em',borderBottom:'1px solid #a39d9d'  } }>
  Results

</h3>



<h3 className={`admn-slctn ${IconActive.faculty? 'active':'inactive'}`}onClick={()=>ToggleActive('faculty')} 
style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Faculty

</h3>

<h3 className={`admn-slctn ${IconActive.admin? 'active':'inactive'}`}onClick={()=>ToggleActive('admin')} 
style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Admin

</h3>

<h3 className={`admn-slctn ${IconActive.students? 'active':'inactive'}`} onClick={()=>ToggleActive('students')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Students

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


{/*
<h3 className={`admn-slctn ${IconActive.evaluationList? 'active':'inactive'}`} onClick={()=>ToggleActive('evaluationList')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Evaluation List

</h3>
*/}
<h3 className={`admn-slctn ${IconActive.evaluationForm? 'active':'inactive'}`} onClick={()=>ToggleActive('evaluationFrom')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em', borderBottom:'1px solid #a39d9d'  } }>
  Criteria

</h3>

<h3 className={`admn-slctn ${IconActive.editProfile? 'active':'inactive'}`} onClick={()=>ToggleActive('editProfile')}
 style={{cursor: 'default', display:'flex', width:'97%', height:'3em', fontFamily:'serif', justifyContent:'center',alignItems:'center', margin:'.2em',borderBottom:'1px solid #a39d9d'  } }>
  Edit Profile

</h3>



</div>

<div className='mainview'>

    <div className='dshbrd-view'
 style={{
  paddingLeft:'1em',background:'#b5cad9',height: '100%',width: '100%',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black',
  display: IconActive.dashboard ? 'block' : 'none'
}}>

<div style={{display: 'flex'}}>

    

</div>



<div className='newcontainer' style={containerStyles}>

{facultyList.map(faculty => (
  <div key={faculty.id} style={facultycontainer} className='fclty-hldr'>

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
 

<button
      
      style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      onClick={()=>ToggleActive('show', faculty.id)} 
      > Show Result</button>
      
  
  </div>

</div>))}


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

              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2em' }}>
                <label htmlFor=""> Password:
                  <input
                    type="password"
                    value={newformData.password}
                    onChange={handlePasswordChange}
                    name="password"
                    id="password"
                    style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
                  />
                  {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                </label>

                <label style={{ marginTop: '2em' }}>
                  ConfirmPassword
                  <input
                    type="password"
                    value={newformData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    name="confirmPassword"
                    id="confirmPassword"
                    style={{ border: 'none', borderBottom: '1px solid black', outline: 'none', padding: '2px', marginLeft: '2px' }}
                  />
                  {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
                </label>
              </div>



             
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
                  <option value="On Call">OCM</option>
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
    
    style={{display: IconActive.evaluate ? 'block' : 'none', paddingLeft:'1em',background:'#b5cad9',height: '100%',width: '100%',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
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
  <div>

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
    </button></div>
  

      
  
  </div>



</div>))}


    </div>
    <div>
      <>
       
        {/* Add other labels for additional fields */}
      </>
    </div>
    </div>


   <div className='fclty-view' 
    
    style={{display: IconActive.faculty ? 'block' : 'none', paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
       onClick={toggleNewFaculty}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      > + New faculty
      </button>

      


      


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

<div>
<button

      onClick={() => handleEditFacultySubject(faculty)}
      style={{width: '8em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      
      > Add Subjects</button>
    

      </div>
  
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
     
   <table  style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '70%', overflowY: 'auto',maxWidth: '95em'}}  className='custom-table'> 
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

onChange={handleInputChange} />

       <label
       style={{marginLeft:'3em'}}
        htmlFor="First Name">First Name:</label>

<input
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
type="text"
name="first_name"

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

onChange={handleInputChange}>

</input>

<div style={{marginTop:'2em'}}>
<label htmlFor="Select year level:">Year Level:</label>
<select
        
        value={studentFormData.year_level}
        style={{ marginLeft: '2em' }}
        id="year_level"
        name='year_level'
        onChange={handleInputChange}
    >
        <option value="">Select Year Level</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4rth Year">4rth Year</option>
    </select>

       

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

</div>
<hr />
<div>
<label htmlFor="Student Pass">Password: </label>
<input
 
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

<button
              onClick={toggleAddStudent}
              style={{marginLeft:'2em',width: '5em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}>
                Done
              </button>
</div>
</form>



</div>

<div className= 'smll-cntnr' id='addAdmin' style={{display:showAddAdminDiv? 'block' : 'none'}} >


 <form onSubmit={handleSubmitAdmin}>
<div style={{marginBottom:'2em'}}>
<label htmlFor="Student Number">ID Number: </label>

<input
style={{borderLeft:"none", borderRight:'none', borderTop:'none', borderBottom:'1.5px solid black', padding: '4px',outline:'none'}}
type="text"
name="id_number"
value={adminFormData.id_number}
onChange={handleNewInputChange} />

       <label
       style={{marginLeft:'3em'}}
        htmlFor="Full Name">Full Name:</label>

<input
style={{border:'none', borderBottom:"black 1.5px solid", outline:'none',padding:'5px'}}
type="text"
name="full_name"
value={adminFormData.full_name}
onChange={handleNewInputChange}>

</input>

</div>
<hr />

<div style={{marginTop:'1em',marginBottom:'2em'}}>


</div>

<div>
<label htmlFor="Student Pass">Password: </label>
<input
 value={adminFormData.password}
      onChange={handleNewInputChange}
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
    
</div>

<div className='admin-view' 
    
    style={{display: IconActive.admin ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
      onClick={toggleAddAdmin}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      >
+ Admin
      </button>




<table style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '70%', overflowY: 'auto',width: '100%'}}  className='custom-table'> 
       <thead style={{width:'100%'}}>
        <tr>
          
          <th style={{width:'24%'}}>
            ID number
          </th>
          <th style={{width:'50%'}}>
           Full Name
          </th>
          <th style = {{width:'14%'}}>
            password
          </th>
          
          <th style={{width:'20%'}}>
           Actions
          </th>
        </tr>
       </thead >
       <tbody style={{width:'100%'}}>
        {filteredAdmins.map((admins) => (
          <tr key={admins.id}>
             <td style={{width:'30%'}}>{admins.id_number}</td>
            <td style={{width:'40%'}}>{admins.full_name} </td>
            <td style={{width:'40%'}} >********</td>
            
            <td style={{width:'30%'}}>

<div style={{display:"flex",flexDirection:'row'}}>

<button
  onClick={() => handleEditClick(admins)} 

       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
        Edit
       </button>
 <button
 onClick={() => handleDeleteClick(admins.id)}
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }} >Delete</button>

</div>
          
</td>
          </tr>
        ))}
       </tbody>
       </table>
   
    </div>

     {/* Display selected admin's information in another div */}
     {selectedAdmin && (
        <div style={{backgroundColor:'white',position:'absolute',color:'black',padding:'1.5em',border:'black solid 2px'}}>
          <h3>Selected Admin</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="id"> Id NUmber 
            <input
            value={selectedAdmin.id_number} 
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, id_number: e.target.value })}
              style={{marginLeft:'2em'}} type="text" placeholder={selectedAdmin.id_number} />

            </label>

            <label htmlFor="name"> Full Name:
            <input
            value={selectedAdmin.full_name} 
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, full_name: e.target.value })}
            style={{marginLeft:'2em'}} type="text" placeholder={selectedAdmin.full_name} />

            </label>
            <label htmlFor="admin pass"> Password
            <input  
  style={{marginLeft:'2em'}} 
  type="password" 
  onChange={(e) => setSelectedAdmin({ ...selectedAdmin, password: e.target.value })}
/>

            </label>



            <div>
              <button 
               onClick={updateAdmin}
              style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
                Update
              </button>

              <button
              onClick={hideSelectedAdmin} style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
                Done
              </button>

            </div>
          
          </form>
          
    
        </div>
      )}

    <div className='stdnt-view' 
    
    style={{display: IconActive.students ? 'block' : 'none',paddingLeft:'1em', background: 'white',height: '100%',width: '85%',marginTop: '2em',boxShadow: '0 0 10px rgba(84, 76, 76, 0.6)',borderRadius: '8px',paddingRight: '1em',color: 'black', }}
     > 
      <button
      onClick={toggleAddStudent}
       style={{width: '11em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
      >
+ Students
      </button>


    


<table style={{display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a',maxHeight: '70%', overflowY: 'auto',width: '100%'}}  className='custom-table'> 
       <thead style={{width:'100%'}}>
        <tr>
          
          <th style={{width:'24%'}}>
            ID number
          </th>
          <th style={{width:'50%'}}>
            Name
          </th>
          <th style={{width:'42%'}}>
           Course and Year Level
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
            <td style={{width:'20%'}}>{student.course}-{student.year_level}</td>
            <td style={{width:'20%'}}>

<div style={{display:"flex",flexDirection:'row'}}>

<button onClick={() => handleEditStudentClick(student)}
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
        Edit</button>
 <button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }} >Delete</button>




</div>




          
</td>
          </tr>
        ))}
       </tbody>
       </table>
   
    </div>


    



    {selectedFaculty&& (
        <div style={{backgroundColor:'white',position:'absolute',color:'black',padding:'1.5em',border:'black solid 2px',}}>
          <h3>Add Subjects for {selectedFaculty.first_name} {selectedFaculty.last_name}</h3>
          <form onSubmit={subjectshandleSubmit}>
    <label htmlFor="facultyId">Faculty ID:</label>
    <input
        value={selectedFaculty.id}
        onChange={(e) => setSelectedFaculty({ ...selectedFaculty, id: e.target.value })}
        style={{ marginLeft: '2em' }}
        type="text"
        id="facultyId"
        placeholder="Enter Faculty ID"
    />

    <label style={{ marginLeft: '2em' }} htmlFor="year">Year:</label>
    <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ marginLeft: '2em' }}
        type="number"
        id="year"
        placeholder="Enter year"
    />

    <label style={{ marginLeft: '2em' }} htmlFor="semester">Semester:</label>
    <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        style={{ marginLeft: '2em' }}
        id="semester"
    >
        <option value="">Select Semester</option>
        <option value="1">First</option>
        <option value="2">Second</option>
    </select>

    <div style={{ marginTop: '2em' }}>
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
            {filteredSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                    ({subject.Subname}) - {subject.SubDescriptions}
                </option>
            ))}
        </select>

        <table style={{ border: '1px solid black', borderRadius: '7px', marginTop: '2em', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Added Subjects:</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((subject, index) => (
                    <tr key={index}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{subject.SubDescriptions} <button onClick={() => handleRemoveSubject(subject.id)}>remove</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <button
       style={{width: '8em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}
      type="submit">Save Subjects</button>

      <button
              onClick={hideSelectedfaculty}
               style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
                Done
              </button>
</form>
          
    
        </div>
      )}









    {selectedStudent && (
        <div style={{backgroundColor:'white',position:'absolute',color:'black',padding:'1.5em',border:'black solid 2px',}}>
          <h3>Selected Student</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="id"> Id NUmber 
            <input
            value={selectedStudent.id_number} 
            onChange={(e) => setSelectedStudent({ ...selectedStudent, id_number: e.target.value })}
              style={{marginLeft:'2em'}} type="text" placeholder={selectedStudent.id_number} />

            </label>

            <label htmlFor="name"> First Name:
            <input
            value={selectedStudent.first_name} 
            onChange={(e) => setSelectedStudent({ ...selectedStudent, first_name: e.target.value })}
            style={{marginLeft:'2em'}} type="text" placeholder={selectedStudent.first_name} />

            </label>

            <label htmlFor="name"> Last Name:
            <input
            value={selectedStudent.last_name} 
            onChange={(e) => setSelectedStudent({ ...selectedStudent, last_name: e.target.value })}
            style={{marginLeft:'2em'}} type="text" placeholder={selectedStudent.last_name} />


            
            </label>


            <div style={{ marginTop:'1em'}}>
              
            <label htmlFor="name"> Last Name:
            <input
            value={selectedStudent.suffix} 
            onChange={(e) => setSelectedStudent({ ...selectedStudent, suffix: e.target.value })}
            style={{marginLeft:'2em'}} type="text" placeholder={selectedStudent.suffix} />


            
            </label>


            <label htmlFor="admin pass"> Password
            <input  
  style={{marginLeft:'3.05em'}} 
  type="password" 
  onChange={(e) => setSelectedStudent({ ...selectedStudent, password: e.target.value })}
/>

            </label>


            <select
        
        
        style={{ marginLeft: '2em' }}
        id="year_level"
        name='year_level'
        
        onChange={(e) => setSelectedStudent({ ...selectedStudent, year_level: e.target.value })}
    >
        <option value="">Select Year Level</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4rth Year">4rth Year</option>
    </select>
            </div>



            <div>
              <button 
               onClick={updateAdmin}
              style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
                Update
              </button>

              <button
              onClick={hideSelectedStudent}
               style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
                Done
              </button>

            </div>
          
          </form>
          
    
        </div>
      )}





<div className='smll-cntnr' id='new evaluation' style={{display:VisibleDiv ? 'block' : 'none'}}>
  <div style={{display:'flex',flexDirection:'column', marginBottom:'1.5em'}}>
  <label htmlFor=""> Semester:</label> 
    <select id = 'Semester' defaultValue=""
    style={{borderLeft:'none',borderTop:'none',borderRight:'none',outline:'none'}}
     name="" >
       <option value="" disabled>Select Semester </option>
       <option value="1st-sem">1st-Sem</option>
       <option value="2nd-sem">2nd-Sem</option>

    </select>
  </div>
  <div style={{display:'flex',flexDirection:'column', marginBottom:'1.5em'}}>
  <label htmlFor=""> Date:
  
  </label> 
  </div>
  <div>
  <label style={{ marginRight: '1em' }} htmlFor="startDate"> From: </label>
        <input type="date" id="startDate" />
        <label style={{ marginRight: '1em' }} htmlFor="endDate"> To: </label>
        <input type="date" id="endDate" />
      </div>
      <button
        onClick={saveEvaluationDate}
        style={{
          width: '11em',
          height: '2em',
          background: 'rgb(0 99 255)',
          boxShadow: 'rgb(0 0 0) 0px 0px 5px',
          outline: 'none',
          borderRadius: '2px',
          border: 'none',
          color: 'white',
          marginBottom: '1em',
          marginTop: '1em'
        }}
      >
        Done
      </button>
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

       <table style={{ display:'block',color:'white', fontFamily:'serif',backgroundColor:'#0a193a', maxHeight:'32em', overflowY:'auto'}} className='custom-table'> 
       <thead>
        <tr>
        
          <th>
            Semester
          </th>
          <th>
            From
          </th>
          <th>
           To
          </th>
          <th>Action</th>
       
        </tr>
       </thead>
       <tbody>
          {evaluationDates.map((date, index) => (
            <tr key={date.id}>
             
              <td style={{width:'20em'}}>{date.semester}</td>
              <td style={{width:'20em'}} >{date.date_started}</td>
              <td style={{width:'20em'}} >{date.date_ended}</td>
              <td style={{width:'20em'}}>
                <button 
                style={{width: '4em',height:'2em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
                >Edit</button>
                <button
                 onClick={() => handleStop(date.id)}
                style={{width: '4em',height:'2em',marginLeft:'1em', background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginBottom:'1em',marginTop:'1em' }}
                 >Stop</button>
              </td>
            </tr>
          ))}
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
            <th >Action</th>
  
          </tr>
        </thead>
        <tbody>
        {criteriaList.map((criteria) => (
          <tr key={criteria.id}> 
            <td className='dscrptv-p' >{criteria.criteria_a}
            </td>
            <td style={{width:'5em'}} ><button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
        Update</button></td>
          
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
            <td style={{width:'5em'}} ><button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
        Update</button></td>
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
            <td style={{width:'5em'}} ><button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
        Update</button></td>
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
            <td style={{width:'5em'}} ><button
       style={{width: '5em',height:'1.5em',background:'rgb(0 99 255)',boxShadow: 'rgb(0 0 0) 0px 0px 5px',outline:'none',borderRadius:'2px',border:'none', color:'white', marginRight:'1em', marginTop:'1em' }}>
        Update</button></td>
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
