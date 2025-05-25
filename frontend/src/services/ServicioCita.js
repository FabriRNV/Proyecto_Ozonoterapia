import axios from "axios";

// Define the base URL for the stock API
const PrincipalUrl = "/api/citas"


const get_cita= async() => {
   // Perform a GET request to the base URL
   const response = await axios.get(PrincipalUrl)
   // Return the data from the response
   return response.data
}
const getId_cita = async(id) => {
   const response = await axios.get(`${PrincipalUrl}/${id}`);
   return response.data; // Retorna el objeto directamente
 }
const create_cita = async(object) =>{
   // Perform a POST request to the base URL with the new stock item object
   const response = await axios.post(PrincipalUrl, object)
   // Return the data from the response
   return response.data
}
const update_cita = async (updatedObject) => {
   const response = await axios.put(`${PrincipalUrl}/${updatedObject.id}`, updatedObject);
   return response.data;
 };

const eliminate_cita = async(id) => {
  const response = await axios.delete(`${PrincipalUrl}/${id}`)
  return response.data
}

export default {
   get_cita: get_cita,
   getId_cita: getId_cita,
   create_cita:create_cita,
   update_cita: update_cita,
   eliminate_cita:eliminate_cita,
    
}