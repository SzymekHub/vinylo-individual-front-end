import axios from "axios";
import TokenManager from "./TokenManager";

export async function useFetchVinylsCollectionDetails(
  userId,
  id,
  setCollectionVinylDetails
) {
  await axios
    .get(`http://localhost:8080/collections/userVinyl/${userId}/${id}`, {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    })
    .then((response) => {
      setCollectionVinylDetails(response.data);
      console.log("Fetched detailed vinyl for the user:", response.data); // Logs the response
    })
    .catch((error) => {
      console.error("Error fetching vinyl details:", error);
    });
}

export default useFetchVinylsCollectionDetails;
