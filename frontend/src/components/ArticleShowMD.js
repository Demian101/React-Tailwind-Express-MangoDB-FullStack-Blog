import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ArticleShowMD = ({ mdContent }) => {
  console.log("渲染 ArticleShowMD")
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
      {mdContent}
    </ReactMarkdown>
  )
}
export default ArticleShowMD;