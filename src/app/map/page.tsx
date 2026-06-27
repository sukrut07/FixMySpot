import { MapLoader } from "@/components/map/map-loader";
import { getIssues } from "@/lib/data";

export default async function MapPage() {
  const issues = await getIssues();
  return <MapLoader issues={issues} full />;
}
