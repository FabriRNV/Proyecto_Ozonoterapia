import axios from "axios";

// Define the base URL for the stock API
const PrincipalUrl = "http://localhost:8000/pacientes"


const get_paciente= async() => {
   // Perform a GET request to the base URL
   const response = await axios.get(PrincipalUrl)
   // Return the data from the response
   return response.data
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

 // Export the functions as part of an object for use in other modules
export default {
   get_paciente: get_paciente,
   create_paciente:create_paciente,
   update_paciente: update_paciente,
    
}