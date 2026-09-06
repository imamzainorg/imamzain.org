export type Legacy = {
  id: number;
  title: string;
  slug: string;
  dictionaries: Dictionary[];
};

type Dictionary = {
  id: number;
  title: string;
  slug: string;
  subjects: Subject[];
};

type Subject = {
  id: string;
  title: string;
  slug: string;
  audio: string;
  phrases: Phrase[];
};

type Phrase = {
  id: string;
  content: string;
  explanations: Explanation[];
};

type Explanation = {
  id: number;
  author: string;
  content: string;
};

// Slim projections that cross the server/client boundary. Keeping these
// separate from Dictionary/Subject is what stops the full phrase corpus from
// being serialized into every page under the dictionary layout.
export type NavSubject = Pick<Subject, "id" | "title" | "slug">;

// `subjects` is populated only for the dictionary the current page is
// showing; the rest carry `subjectCount` for the sidebar badge and get
// their subjects fetched on demand (see /api/library-nav) if the reader
// expands one of them without navigating there.
export type NavDictionary = Pick<Dictionary, "id" | "title" | "slug"> & {
  subjectCount: number;
  subjects: NavSubject[];
};

export type SearchIndexPhrase = {
  id: string;
  text: string;
};

export type SearchIndexEntry = {
  dictionaryId: number;
  dictionaryTitle: string;
  dictionarySlug: string;
  subjectId: string;
  subjectTitle: string;
  subjectSlug: string;
  phrases: SearchIndexPhrase[];
};
