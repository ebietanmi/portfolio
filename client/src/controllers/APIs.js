const API_URL = import.meta.env.VITE_API_URL;

export default async function createUserAPI(credentials) {
  const response = await fetch(`${API_URL}/create-user`, {
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
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  return response;
};

// API for resetting password
export async function resetPasswordAPI(credentials) {
  const response = await fetch(`${API_URL}/reset-password`, {
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
  const response = await fetch(`${API_URL}/create-project`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
  return response;
}


// API to get all project.
export const getProjectsAPI = async () => {
  const data = await fetch(`${API_URL}/projects`);
  return data;
}

// API to delete project.
export const deleteProjectAPI = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete-project/${id}`, { method: "DELETE" });
    if (response.ok) {
      return { "Message": 'Project Deleted', ok: true }
    }
    else { return { "Message": 'Failed to delete Project', ok: false } }

  } catch (error) {
    alert("Failed to delete project")
  }
}

  export async function createBlogAPI(formData) {
 const response = await fetch(`${API_URL}/create-blog`,
    {
      method: 'POST',
      body: formData,
    });
  return response;
}
  export async function getBlogsAPI(formData) {
 const response = await fetch(`${API_URL}/blog`,{method:'GET'});
  return response;
}
  export async function getUsersAPI(formData) {
 const response = await fetch(`${API_URL}/users`,{method:'GET'});
  return response;
}


export async function checkMailNetworkStatusAPI(){
  const response = await fetch(`${API_URL}/check-mail-network`,{method:'GET'});
  return response;
}

export async function sendMailAPI(form) {
  const response = await fetch(`${API_URL}/send-mail`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return response;
}
