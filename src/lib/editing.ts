export type Edit = { text: string; start: number; end: number };

// **bold** / *italic*: wraps the selection, or a placeholder if nothing is selected
export function wrap(text: string, start: number, end: number, mark: string, placeholder: string): Edit {
  const selected = text.slice(start, end) || placeholder;
  const s = start + mark.length;
  return {
    text: text.slice(0, start) + mark + selected + mark + text.slice(end),
    start: s,
    end: s + selected.length,
  };
}

// [label](https://): selects the URL part so you can type or paste over it
export function link(text: string, start: number, end: number): Edit {
  const label = text.slice(start, end) || "example";
  const url = "https://example.com";
  const urlStart = start + label.length + 3; // after "[label]("
  return {
    text: text.slice(0, start) + `[${label}](${url})` + text.slice(end),
    start: urlStart,
    end: urlStart + url.length,
  };
}

// Toggles "- " on every line touched by the selection
export function bullets(text: string, start: number, end: number): Edit {
  const from = start === 0 ? 0 : text.lastIndexOf("\n", start - 1) + 1;
  const i = text.indexOf("\n", end);
  const to = i === -1 ? text.length : i;

  const lines = text.slice(from, to).split("\n");
  const allBullets = lines.every((l) => l.startsWith("- "));
  const changed = lines
    .map((l) => (allBullets ? l.slice(2) : l.startsWith("- ") ? l : "- " + l))
    .join("\n");

  return { text: text.slice(0, from) + changed + text.slice(to), start: from, end: from + changed.length };
}