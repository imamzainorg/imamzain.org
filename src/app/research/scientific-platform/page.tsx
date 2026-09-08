import studentData from "@/data/student.json";
import type { StudentResearch } from "@/types/student";
import PlatformClient from "./_components/platform-client";

export default function Page() {
  return <PlatformClient studentData={studentData as StudentResearch[]} />;
}
