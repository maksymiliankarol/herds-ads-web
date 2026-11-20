import Markdown from "./markdown";

export default function AdStep({ text, onNext }: { text: string; onNext: () => void }) {
  return (
    <>
      <p>You're going to publish your ad:</p>
      <div className="column">
        <Markdown text={text} />
      </div>
      <button type="button" onClick={onNext}>Next</button>
    </>
  );
}