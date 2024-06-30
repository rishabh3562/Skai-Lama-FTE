import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../constants";

export const getProject = async (projectId) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.projects}/${projectId}`);
        return response.data;
    } catch (error) {
        // console.error("Error fetching project", error);
        return null;
    }
};

export const getProjectsByUserEmail = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.projectList}/${email}`);
        return response.data;
    } catch (error) {
        // console.error("Error fetching projects", error);
        return error;
    }
}
//this is what a project looks like
// const project = {  
//     userEmail:email,
//     name: projectName,
 
//   };
export const createProject = async (project) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.projects}`, project);
        return response.data;
    } catch (error) {
        // console.error("Error creating project", error);
        return error;
    }
}

export const getSlug=async (projectId)=>{
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.projects}/${projectId}/slug`);
        return response.data;
    } catch (error) {
        // console.error("Error fetching project", error);
        return error;
    }
};

