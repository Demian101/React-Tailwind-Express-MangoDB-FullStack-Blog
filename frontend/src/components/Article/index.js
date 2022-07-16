import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Acticle = ({content}) => {
  return (
    <div className="p-20">
      <h1 className="text-3xl"> title </h1>

      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Acticle;