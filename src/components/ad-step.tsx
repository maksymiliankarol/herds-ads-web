import { AD_MAX_LENGTH, AD_MIN_LENGTH, AD_URL_MAX_LENGTH, AD_URL_TEXT_MAX_LENGTH } from "../lib/publish";

type Props = {
  content: string;
  url: string;
  urlText: string;
  onContent: (content: string) => void;
  onUrl: (url: string) => void;
  onUrlText: (urlText: string) => void;
  onNext: () => void;
};

export default function AdStep({ content, url, urlText, onContent, onUrl, onUrlText, onNext }: Props) {
  const length = content.trim().length; // the API validates the trimmed text

  return (
    <form
      className="column"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <label>
        Text
        <textarea
          rows={4}
          placeholder="Jazz night at the Rynek, Saturday 8 PM. Free entry."
          maxLength={AD_MAX_LENGTH}
          value={content}
          onChange={(e) => onContent(e.target.value)}
        />
        <small className="muted">{length} / {AD_MAX_LENGTH} (min {AD_MIN_LENGTH})</small>
      </label>
      <label>
        Link
        <input
          type="url"
          required
          placeholder="https://example.com"
          pattern="https://([a-zA-Z0-9\-]+\.)+[a-zA-Z][a-zA-Z0-9\-]*(:[0-9]+)?([\/?#].*)?"
          title="A full link starting with https://, like https://example.com"
          maxLength={AD_URL_MAX_LENGTH}
          value={url}
          onChange={(e) => onUrl(e.target.value)}
        />
      </label>
      <label>
        Link text
        <input
          required
          placeholder="Buy tickets"
          maxLength={AD_URL_TEXT_MAX_LENGTH}
          value={urlText}
          onChange={(e) => onUrlText(e.target.value)}
        />
      </label>
      <button disabled={length < AD_MIN_LENGTH}>Next</button>
    </form>
  );
}