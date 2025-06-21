import axios from "axios";

// Define the base URL for the doctor API
const PrincipalUrl = "/api/doctores"

const get_doctor = async() => {
   // Perform a GET request to the base URL
   const response = await axios.get(PrincipalUrl)
   // Return the data from the response
   return response.data
}

const getId_doctor = async(id) => {
   const response = await axios.get(`${PrincipalUrl}/${id}`);
   return response.data;
}

const create_doctor = async(object) =>{
   // Perform a POST request to the base URL with the new doctor object
   const response = await axios.post(PrincipalUrl, object)
   // Return the data from the response
   return response.data
}

const update_doctor = async (updatedObject) => {
   const response = await axios.put(`${PrincipalUrl}/${updatedObject.id}`, updatedObject);
   return response.data;
};

const eliminate_doctor = async(id) => {
  const response = await axios.delete(`${PrincipalUrl}/${id}`)
  return response.data
}

export default {
   get_doctor,
   getId_doctor,
   create_doctor,
   update_doctor,
   eliminate_doctor
}