// Splits text into words that can rise into place one by one (.w in index.css).
// `start` offsets the stagger index so several lines can share one sequence.
export default function Words({ text, start = 0 }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <span key={i}>
      <span className="w">
        <span style={{ "--i": start + i }}>{word}</span>
      </span>
      {i < words.length - 1 && " "}
    </span>
  ));
}
