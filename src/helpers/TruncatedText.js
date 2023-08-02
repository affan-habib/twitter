
const TruncatedText = ({ text, maxCharacters=10 }) => {
  if (text.length <= maxCharacters) {
    return <span>{text}</span>;
  } else {
    return <span>{text.slice(0, maxCharacters)}...</span>;
  }
};

export default TruncatedText;
