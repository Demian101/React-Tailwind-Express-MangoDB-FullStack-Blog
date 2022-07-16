import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const defaultMd = `
* [x] azeazea

| Feature    | Support              |
| ---------- | -------------------- |
| CommonMark | 100%                 |
| GFM        | 100%                 |`;

const ExampleComponent = () => {
  const [markdownSource, setMarkdownSource] = useState(defaultMd);

  const onChange = ({ currentTarget: { value } }) => {
    setMarkdownSource(value);
  };
  const val = "xx"
  return (
    <>
      <textarea
        onChange={onChange}
        value={`MM ${val}`}
        className="
          font-mono
          overflow-auto
          whitespace-pre
          border-solid
          border
          border-gray-300
          resize
          w-full
        "
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
        {markdownSource}
      </ReactMarkdown>
    </>
  );
};



export default ExampleComponent;
