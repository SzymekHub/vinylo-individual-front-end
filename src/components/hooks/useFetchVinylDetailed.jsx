import axios from "axios";

export async function useFetchVinylDetailed(id, setVinylDetails) {
  await axios
    .get(`http://localhost:8080/vinyls/${id}`)
    .then((response) => {
      setVinylDetails(response.data);
      console.log("Fetched vinyls:", response.data); // Logs the response
    })
    .catch((error) => {
      console.error("Error fetching vinyl details:", error);
    });
}

export default useFetchVinylDetailed;
