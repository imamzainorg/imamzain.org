export type Legacy = {
  id: number;
  title: string;
  slug: string;
  dictionaries: Dictionary[];

};

export type Dictionary = {
  id: number;
  title: string;
  slug: string;
  subjects: Subject[];
};

export type Subject = {
  id: string;
  title: string;
  slug: string;
  audio: string;
  margins?: Margins;
  phrases: Phrase[];
};

export type Phrase = {
  id: string;
  content: string;
  explanations: Explanation[];
};

export type Explanation = {
  id: number;
  author: string;
  content: string;
  /**
   * The exact word or phrase inside the parent Phrase.content that this
   * explanation is about. Optional so legacy entries (which only ever
   * rendered below the phrase, with no positional link into the text)
   * keep working unchanged.
   */
  text?: string;
  /**
   * When `text` repeats more than once inside `content`, this restricts
   * the explanation to one specific 1-based occurrence instead of every
   * occurrence. Omit it when the explanation applies to every occurrence
   * of `text` in the phrase (the default, and the safe choice — it never
   * produces a link to the wrong instance of a repeated word).
   */
  occurrence?: number;
};

export type Margins = {
  id: number;
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
