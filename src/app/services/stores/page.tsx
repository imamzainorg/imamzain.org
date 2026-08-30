import storeLocations from "@/data/store-locations.json";
import type { StoreLocation } from "@/types/store-locations";
import StoresClient from "./_components/stores-client";

export default function Page() {
  return <StoresClient storeLocations={storeLocations as StoreLocation[]} />;
}
