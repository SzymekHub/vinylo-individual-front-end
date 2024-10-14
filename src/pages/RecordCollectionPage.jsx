import React, { useState, useEffect } from "react";
import VinylsList from "../components/VinylsList";
import { Disc3 } from "lucide-react";
import useFetchVinyls from "../components/useFetchVinyls";

function RecordCollectionPage() {
  const {
    vinylsItems: fetchedVinyls,
    loading: loadingVinyls,
    error: fetchError,
  } = useFetchVinyls();
  const [vinylsItems, setVinylsItems] = useState(fetchedVinyls);
  // Update vinylsItems state whenever fetchedVinyls changes
  useEffect(() => {
    setVinylsItems(fetchedVinyls);
  }, [fetchedVinyls]);

  if (loadingVinyls) return <div>Loading...</div>; // Show loading state
  if (fetchError) return <div>Error loading vinyls: {fetchError.message}</div>; // Handle errors

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-1xl font-bold">Record Collection</h1>
        <a
          href={"/Vinyls"}
          className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
        >
          <Disc3 className="mr-2 h-5 w-5 text-emerald-50" />
          {"Add New Vinyls"}
        </a>
      </div>
      <div className="inner">
        <VinylsList vinylsItems={vinylsItems} />
      </div>
    </div>
  );
}

export default RecordCollectionPage;
