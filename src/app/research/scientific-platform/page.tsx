import studentData from "@/data/student.json";
import journalsData from "@/data/journals.json";
import researchData from "@/data/research.json";
import type { StudentResearch } from "@/types/student";
import type { Journals } from "@/types/journals";
import type { Research } from "@/types/research";
import PlatformClient from "./_components/platform-client";

export default function Page() {
  return (
    <PlatformClient
      studentData={studentData as StudentResearch[]}
      journalsData={journalsData as Journals[]}
      researchData={researchData as Research[]}
    />
  );
}
