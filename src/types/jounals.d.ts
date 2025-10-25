declare module "@/types/jounals" {
export type Jounals = {
  id: string;

  translations: {
    languageid: number;
    language: string;
    title: string;
    authors: string[];
    publicationVenue: string;
    category?: string;
    pagenam?: number; 
  }[];
  publishedYear: string;
  pdfUrl: string;
}}
