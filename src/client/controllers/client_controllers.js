import { useEffect } from "react";
import { createProjectAPI, deleteProjectAPI, loginAPI, resetPasswordAPI } from "./APIs";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

//Handles Login Functions
export async function handleLogin({ username, password }, navigate, isLoading, setLoading) {
  setLoading(isLoading => true)
  const response = await loginAPI({ username, password });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    setLoading(isLoading => false)
    navigate('/dashboard',);
  } else {
    setLoading(isLoading => false)
    alert("Incorrect Credentials")
    navigate('/login');
  }
}

export function handleLogout({isLoading, setLoading, navigate}) {
  setLoading(isLoading => true);
  const token = localStorage.getItem('token');
  if (token !== null || '') {
    localStorage.removeItem('token');
    setLoading(isLoading => false);
    navigate('/')
  } else {
    navigate('/login')
    setLoading(isLoading=>false)
  }
}

//Handles Project Creation Functions
export async function handleCreateProject({ formData }, isLoading, setLoading, navigate) {
  setLoading(isLoading => true)
  const response = await createProjectAPI(formData);
  response.ok ? (setLoading(isLoading => false), navigate('/dashboard')) : (navigate('/dashboard/create-project'), setLoading(isLoading => false));
}

//Handle delete project
export async function handleDeleteProject(id){
  const response = await deleteProjectAPI(id)
  console.log(response)
}

//Handles Getting Single Project Functions
export async function handleGetProjects({ formData }, isLoading, setLoading, navigate) {
  setLoading(isLoading => true)
  const response = await createProjectAPI(formData);
  response.ok ? (setLoading(isLoading => false), navigate('/')) : (navigate('/dashboard/create-project'), setLoading(isLoading => false));
}

//Handle CV Download.
export async function resumeDownloadHandler(){
  const link = document.createElement("a");
  link.href = "../client/assets/docs/AssistantOperatorSolventplant.pdf";
  link.download = "AssistantOperatorSolventplant.pdf";
  link.click()

}

export async function handleChangePassword(formData){
  const response = resetPasswordAPI(formData);
}