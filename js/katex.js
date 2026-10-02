// Currency-safe KaTeX configuration.
// Use \(...\) for inline math and \[...\] for display math.
// Dollar-sign delimiters are intentionally omitted so values such as $20
// remain ordinary text.
document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false
  });
});
