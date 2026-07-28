
const API = 'https://portfoliobackend-production-7d3c.up.railway.app';

export default async function createUserAPI(credentials) {
  const response = await fetch('/api/create-user', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  return response;
}

// API to facilitate login.
export const loginAPI = async (credentials) => {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  return response;
};

// API for resetting password
export async function resetPasswordAPI(credentials) {
  const response = await fetch('/api/reset-password', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  return response;
}

// API to facilitate creation of new project.
export const createProjectAPI = async (formData) => {
  const response = await fetch(`/api/create-project`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
  return response;
}


// API to get all project.
export const getProjectsAPI = async () => {
  const data = await fetch(`${API}/projects`);
  console.log(data)
  return data;
}

// API to delete project.
export const deleteProjectAPI = async (id) => {
  try {
    const response = await fetch(`/api/delete-project/${id}`, { method: "DELETE" });
    if (response.ok) {
      return { "Message": 'Project Deleted', ok: true }
    }
    else { return { "Message": 'Failed to delete Project', ok: false } }

  } catch (error) {
    alert("Failed to delete project")
  }
}

  export async function createBlogAPI(formData) {
 const response = await fetch(`/api/create-blog`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
  return response;
}
  export async function getBlogsAPI(formData) {
 const response = await fetch("/api/blog",{method:'GET'});
  return response;
}
  export async function getUsersAPI(formData) {
 const response = await fetch(`/api/users`,{method:'GET'});
  return response;
}


export async function checkMailNetworkStatusAPI(){
  const response = await fetch(`/api/check-mail-network`,{method:'GET'});
  return response;
}

export async function sendMailAPI(form) {
  const response = await fetch(`/api/send-mail`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
    credentials: 'include'
  });
  return response;
}
