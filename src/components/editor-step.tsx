import { useRef } from "react";
import Markdown from "./markdown";
import { bullets, link, wrap, type Edit } from "../lib/editing";
import { Link } from "react-router";

const MAX_LENGTH = 5000;

const PLACEHOLDER = `**Summer Jazz Night** at Kraków Rynek!
Live music, food trucks and good vibes.

- Friday, 8 PM

Get tickets [here](https://example.com).`;

type Props = { text: string; onChange: (text: string) => void; onNext: () => void };

export default function EditorStep({ text, onChange, onNext }: Props) {
  const area = useRef<HTMLTextAreaElement>(null);

  function apply(edit: (text: string, start: number, end: number) => Edit) {
    const el = area.current;
    if (!el) return;

    const next = edit(text, el.selectionStart, el.selectionEnd);
    if (next.text.length > MAX_LENGTH) return; // maxLength doesn't apply to programmatic changes

    onChange(next.text);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(next.start, next.end);
    });
  }

  return (
    <section className="page width-lg column noscroll">
      <nav><Link to="/">Back</Link></nav>
      <small className="muted">Step 1 of 5</small>
      <div className="grid-two">
        <div className="panel is-active">
          <div className="preview-header"><p>Markdown Editor</p></div>
          <nav className="editor-toolbar">
            <button type="button" aria-label="Bold" className="editor-switch square" onClick={() => apply((t, s, e) => wrap(t, s, e, "**", "bold"))}>
              <strong>B</strong>
            </button>
            <button type="button" aria-label="Italic" className="editor-switch square" onClick={() => apply((t, s, e) => wrap(t, s, e, "*", "italic"))}>
              <em>I</em>
            </button>
            <button type="button" aria-label="Bullet list" className="editor-switch square" onClick={() => apply(bullets)}>
              •
            </button>
            <button type="button" aria-label="Link" className="editor-switch small" onClick={() => apply(link)}>
              Link
            </button>
          </nav>
          <textarea
            ref={area}
            className="editor-textarea"
            placeholder={PLACEHOLDER}
            maxLength={MAX_LENGTH}
            value={text}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="panel">
          <div className="preview-header"><p>Preview</p></div>
          <div className="scroll preview-body">
            <Markdown text={text} />
          </div>
        </div>
      </div>
      <button type="button" disabled={!text.trim()} onClick={onNext}>Next</button>
    </section>
  );
}