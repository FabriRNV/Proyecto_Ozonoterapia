import axios from "axios";

// Define the base URL for the stock API
const PrincipalUrl = "/api/pacientes"


const get_paciente= async() => {
   // Perform a GET request to the base URL
   const response = await axios.get(PrincipalUrl)
   // Return the data from the response
   return response.data
}
const getId_paciente = async(id) => {
   const response = await axios.get(`${PrincipalUrl}/${id}`);
   return response.data; // Retorna el objeto directamente
 }
const create_paciente = async(object) =>{
   // Perform a POST request to the base URL with the new stock item object
   const response = await axios.post(PrincipalUrl, object)
   // Return the data from the response
   return response.data
}
const update_paciente = async (updatedObject) => {
   const response = await axios.put(`${PrincipalUrl}/${updatedObject.id}`, updatedObject);
   return response.data;
 };

const eliminate_paciente = async(id) => {
  const response = await axios.delete(`${PrincipalUrl}/${id}`)
  return response.data
}

export default {
   get_paciente: get_paciente,
   getId_paciente: getId_paciente,
   create_paciente:create_paciente,
   update_paciente: update_paciente,
   eliminate_paciente:eliminate_paciente,
    
}