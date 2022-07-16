// import Article from '@/components/Article'
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

import ExampleComponent from '../../components/ExampleComponent'

export default function Articles() {
  const defaultMd = `
    * [x] azeazea

    | Feature    | Support              |
    | ---------- | -------------------- |
    | CommonMark | 100%                 |
    | GFM        | 100%                 |`;

  return (
    <ExampleComponent />
  )
}