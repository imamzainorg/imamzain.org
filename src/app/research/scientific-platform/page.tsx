import studentData from "@/data/student.json";
import type { TranslatedResearch } from "@/types/translated-research";
import PlatformClient from "./_components/platform-client";

export default function Page() {
  return <PlatformClient studentData={studentData as TranslatedResearch[]} />;
}
