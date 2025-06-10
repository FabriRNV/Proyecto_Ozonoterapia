import axios from "axios";

// Define the base URL for the stock API
const PrincipalUrl = "/api/tratamientos"


const get_tratamiento= async() => {
   // Perform a GET request to the base URL
   const response = await axios.get(PrincipalUrl)
   // Return the data from the response
   return response.data
}
const getId_tratamiento = async(id) => {
   const response = await axios.get(`${PrincipalUrl}/${id}`);
   return response.data; // Retorna el objeto directamente
 }
const create_tratamiento = async(object) =>{
   // Perform a POST request to the base URL with the new stock item object
   const response = await axios.post(PrincipalUrl, object)
   // Return the data from the response
   return response.data
}
const update_tratamiento = async (updatedObject) => {
   const response = await axios.put(`${PrincipalUrl}/${updatedObject.id}`, updatedObject);
   return response.data;
 };

const eliminate_tratamiento = async(id) => {
  const response = await axios.delete(`${PrincipalUrl}/${id}`)
  return response.data
}

export default {
   get_tratamiento: get_tratamiento,
   getId_tratamiento: getId_tratamiento,
   create_tratamiento:create_tratamiento,
   update_tratamiento: update_tratamiento,
   eliminate_tratamiento:eliminate_tratamiento,
    
}