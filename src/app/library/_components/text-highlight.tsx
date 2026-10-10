import { Fragment, createElement } from "react";
import {
  HTMLElement as ParsedElement,
  TextNode,
  parse,
} from "node-html-parser";

import { buildIndexMap, normalizeArabic } from "../_lib/arabic-text";

const ALLOWED_HTML_TAGS = new Set([
  "blockquote",
  "br",
  "em",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "small",
  "strong",
  "sub",
  "sup",
  "u",
  "ul",
]);

type ParsedNode = ParsedElement | TextNode;

const isParsedNode = (node: unknown): node is ParsedNode =>
  node instanceof ParsedElement || node instanceof TextNode;

/**
 * Wraps every diacritic-insensitive match of `term` in <mark>.
 * Pure React output (no `document`, no `dangerouslySetInnerHTML`), so it is safe
 * during SSR: it renders plain text until `term` arrives client-side.
 */
export function highlightPlain(
  text: string,
  term: string | undefined,
  keyPrefix: string,
): React.ReactNode {
  const trimmedTerm = term?.trim();
  if (!trimmedTerm) return text;

  const normalizedTerm = normalizeArabic(trimmedTerm.toLowerCase());
  if (!normalizedTerm) return text;

  const lowerText = text.toLowerCase();
  const normalizedText = normalizeArabic(lowerText);
  const indexMap = buildIndexMap(lowerText);

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let searchIndex = 0;

  while (true) {
    const match = normalizedText.indexOf(normalizedTerm, searchIndex);
    if (match === -1) break;

    const start = indexMap[match];
    const end = indexMap[match + normalizedTerm.length];

    if (start > lastIndex) parts.push(text.slice(lastIndex, start));

    parts.push(
      <mark
        key={`${keyPrefix}-mark-${start}`}
        className="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded-sm"
      >
        {text.slice(start, end)}
      </mark>,
    );

    lastIndex = end;
    searchIndex = match + normalizedTerm.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : text;
}

function renderHtmlNode(
  node: ParsedNode,
  term: string | undefined,
  key: string,
): React.ReactNode {
  if (node instanceof TextNode) {
    return (
      <Fragment key={key}>{highlightPlain(node.text, term, key)}</Fragment>
    );
  }

  const tagName = node.tagName.toLowerCase();
  const children = node.childNodes.map((child, index) =>
    isParsedNode(child) ? renderHtmlNode(child, term, `${key}-${index}`) : null,
  );

  if (!ALLOWED_HTML_TAGS.has(tagName)) {
    return <Fragment key={key}>{children}</Fragment>;
  }
  if (tagName === "br" || tagName === "hr") {
    return createElement(tagName, { key });
  }
  return createElement(tagName, { key }, children);
}

export function highlightHtml(
  html: string,
  term: string | undefined,
  keyPrefix: string,
): React.ReactNode {
  const root = parse(html);
  return root.childNodes.map((node, index) =>
    isParsedNode(node)
      ? renderHtmlNode(node, term, `${keyPrefix}-${index}`)
      : null,
  );
}
