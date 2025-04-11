import axios from "axios";

// Define the base URL for the stock API
const PrincipalUrl = "/api/entry"


const getEntrada= async() => {
   // Perform a GET request to the base URL
   const response = await axios.get(PrincipalUrl)
   // Return the data from the response
   return response.data
}
const createEntrada = async(object) =>{
   // Perform a POST request to the base URL with the new stock item object
   const response = await axios.post(PrincipalUrl, object)
   // Return the data from the response
   return response.data
}
const updateEntrada = async (updatedObject) => {
   const response = await axios.put(`${PrincipalUrl}/${updatedObject.id}`, updatedObject);
   return response.data;
 };

 // Export the functions as part of an object for use in other modules
export default {
    getEntrada: getEntrada,
    createEntrada:createEntrada,
    updateEntrada: updateEntrada,
    
}