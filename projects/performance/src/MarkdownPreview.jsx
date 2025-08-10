const JANK_DELAY = 200; // 0.2s

export default function MarkdownPreview({ render, options }) {
  function expensiveRender() {
    const start = performance.now();
    while (performance.now() - start < JANK_DELAY) {
      // Nothing, just loop to simulate a delay
    }
    return null;
  }

  return (
    <div>
      <h1>Last Render: {Date.now()}</h1>
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: render(options.text) }}
        style={{ color: options.theme }}
      >
        {expensiveRender()}
      </div>
    </div>
  );
}
