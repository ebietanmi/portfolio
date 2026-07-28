import { useEffect } from "react";
import createUserAPI, { createProjectAPI, createBlogAPI, deleteProjectAPI, loginAPI, resetPasswordAPI, sendMailAPI } from "./APIs";


//Handles Login Functions
export async function handleLogin({ username, password }, isLoading, setLoading, navigate) {
  setLoading(isLoading => true)
  const response = await loginAPI({ username, password }).then(res => res.json());
  if (response.ok) {
    localStorage.setItem('token', response.token);
    setLoading(isLoading => false)
    navigate('/dashboard',);
  } else {
    setLoading(isLoading => false)
    alert("Incorrect Credentials")
    navigate('/login');
  }
}


//Handles Logout functions
export function handleLogout({ isLoading, setLoading, navigate }) {
  setLoading(isLoading => true);
  const token = localStorage.getItem('token');
  if (token !== null || '') {
    localStorage.removeItem('token');
    setLoading(isLoading => false);
    navigate('/')
  } else {
    navigate('/login')
    setLoading(isLoading => false)
  }
}

//Create User Handler functions
export async function handleCreateUser(formData, isLoading, setLoading, navigate) {
  setLoading(isLoading => true);
  const response = await createUserAPI(formData).then(res => res.json());
  if (response.ok) {
    alert(response.message);
    setLoading(isLoading => false);
    navigate('/dashboard');
  } else {
    switch (response.status) {
      case 401:
        alert(response.message);
        setLoading(isLoading => false);
        navigate('/dashboard');
        break;
      case 500:
        alert(response.message);
        setLoading(isLoading => false);
        navigate('/dashboard');
        break;
      default:
        alert(response.message);
        setLoading(isLoading => false);
        navigate('/dashboard');
        break;
    }
  }
}

//Handles Project Creation Functions
export async function handleCreateProject({ formData }, isLoading, setLoading, navigate) {
  setLoading(isLoading => true)
  const response = await createProjectAPI(formData).then(res => res.json());
  if (response.ok) {
    setLoading(isLoading => false);
    alert('Project Created Succesfully');
    navigate('/dashboard');
  }
  else {
    switch (response.status) {
      case 500:
        alert(response.message);
        navigate('/dashboard/create-project');
        setLoading(isLoading => false);
        break;
      case 501:
        alert(response.message);
        navigate('/dashboard/');
        setLoading(isLoading => false);
        break;
      case 502:
        alert(response.message);
        navigate('/dashboard');
        setLoading(isLoading => false);
        break;
      default:
        alert('Unspecified error, try again');
        navigate('/dashboard/create-project');
        setLoading(isLoading => false);
        break;
    }
  }
}

//Handles creation of blogs functions
export async function handleCreateBlog({ formData }, isLoading, setLoading, navigate) {
  setLoading(isLoading => true);
  const response = await createBlogAPI(formData).then(res => res.json());
  setLoading(isLoading => false);
  if (response.ok) {
    alert('Blog created successfully');
    setLoading(isLoading => false);
    navigate('/blogs');
  } else {
    switch (response.status) {
      case 500:
        alert(response.message);
        setLoading(isLoading => false);
        navigate('/dashboard');
        break;
      case 502:
        alert(response.message);
        setLoading(isLoading => false);
        navigate('/dashboard');
        break;
      default:
        alert('Unspecified error, try again');
        setLoading(isLoading => false);
        navigate('/dashboard');
        break;
    }
  }
}

//Handle delete project functions
export async function handleDeleteProject(id) {
  const response = await deleteProjectAPI(id)
}

//Handles Getting Single Project functions
export async function handleCreateProjects({ formData }, isLoading, setLoading, navigate) {
  setLoading(isLoading => true)
  const response = await createProjectAPI(formData);
  response.ok ? (setLoading(isLoading => false), navigate('/')) : (navigate('/dashboard/create-project'), setLoading(isLoading => false));
}

//Handle CV Download functions
export async function resumeDownloadHandler() {
  const link = document.createElement("a");
  link.href = "../client/assets/docs/AssistantOperatorSolventplant.pdf";
  link.download = "AssistantOperatorSolventplant.pdf";
  link.click()

}

//Handle Password Reset functions
export async function handleChangePassword(formData, isLoading, setLoading) {
  setLoading(isLoading => true);
  const response = resetPasswordAPI(formData).then(res => res.json());
  if (response.ok) {
    alert(response.message);
    setLoading(isLoading => false);
  } else {
    alert(response.message);
    setLoading(isLoading => false);
  }

}

//Handle sending of mail functions
export async function handleSendMail(form, isLoading, setLoading) {
  setLoading(isLoading => true);
  const response = await sendMailAPI(form).then(res => res.json());
  if (response.ok) {
    alert(response.message);
    setLoading(isLoading => false);
  } else {
    alert(response.message);
    setLoading(isLoading => false);
  }
}
