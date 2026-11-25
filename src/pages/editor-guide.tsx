import { Link } from "react-router";

export default function EditorGuide() {
  return (
    <section className="page width-md column">
      <nav><Link to="/">Back</Link></nav>
      <h1>Editor Guide</h1>
      <p>Editor uses markdown formatting. It&apos;s really simple, take a look:</p>
      <ul>
        <li>Write <code>Text</code>, to get &quot;Text&quot;</li>
        <li>Write <code>[Text](https://example.com)</code>, to get a link: <a href="https://example.com">Text</a></li>
        <li>Write <code>**Text**</code>, to get bold: <strong>Text</strong></li>
        <li>Write <code>*Text*</code>, to get italic: <i>Text</i></li>
      </ul>
      <p>
        The editor also has a toolbar, in case remembering the syntax is not for you.
      </p>
      <p>
        If you&apos;re familiar with markdown, you may notice that this isn&apos;t all the formatting options it offers.
        That&apos;s the goal: to keep things simple. It&apos;s enough for writing good ads.
      </p>
    </section>
  );
}