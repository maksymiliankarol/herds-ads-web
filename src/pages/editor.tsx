import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Markdown from "../components/markdown";
import { getAd, saveAd } from "../lib/ads";
import { bullets, link, wrap, type Edit } from "../lib/editing";

const MAX_LENGTH = 5000;

export default function Editor() {
  const { id } = useParams();
  // key resets the state when the id changes
  return <EditorView key={id} id={id!} />;
}

function EditorView({ id }: { id: string }) {
  const [title, setTitle] = useState(() => getAd(id)?.title ?? "");
  const [text, setText] = useState(() => getAd(id)?.text ?? "");
  const area = useRef<HTMLTextAreaElement>(null);

  // Autosave real changes only: opening an ad doesn't bump it, and a new empty ad isn't stored
  useEffect(() => {
    const saved = getAd(id);
    if (title !== (saved?.title ?? "") || text !== (saved?.text ?? "")) saveAd({ id, title, text });
  }, [id, title, text]);

  function apply(edit: (text: string, start: number, end: number) => Edit) {
    const el = area.current;
    if (!el) return;

    const next = edit(text, el.selectionStart, el.selectionEnd);
    if (next.text.length > MAX_LENGTH) return; // maxLength doesn't apply to programmatic changes

    setText(next.text);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(next.start, next.end);
    });
  }

  return (
    <section className="page width-lg column noscroll">
      <nav>
        <Link to="/ads">Back</Link>
      </nav>
      <nav>
        <button
          type="button"
          aria-label="Bold"
          className="editor-switch square"
          onClick={() => apply((t, s, e) => wrap(t, s, e, "**", "bold"))}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          aria-label="Italic"
          className="editor-switch square"
          onClick={() => apply((t, s, e) => wrap(t, s, e, "*", "italic"))}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          aria-label="Bullet list"
          className="editor-switch square"
          onClick={() => apply(bullets)}
        >
          •
        </button>
        <button
          type="button"
          aria-label="Link"
          className="editor-switch small"
          onClick={() => apply(link)}
        >
          Link
        </button>
      </nav>
      <div className="grid-two">
        <div className="panel is-active">
          <div className="editor-input">
            <input 
              placeholder="My title..." 
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            ref={area}
            className="editor-textarea"
            placeholder="Write here..."
            maxLength={MAX_LENGTH}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="panel">
          <div className="preview-header">
            <p>Preview</p>
          </div>
          <div className="scroll">
            <Markdown text={text} />
          </div>
        </div>
      </div>
    </section>
  );
}