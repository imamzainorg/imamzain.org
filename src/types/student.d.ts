export interface Translation {
  languageid: number;
  title: string;
  authors: string[];
  publicationVenue: string;
  category: string;
}

export interface Research {
  id: string;
  slug: string;
  translations: Translation[];
  publishedYear: string;
  pdfUrl: string;
}
