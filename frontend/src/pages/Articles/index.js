// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import ExampleComponent from '../../components/ExampleComponent'

import Acticle from '../../components/Article';

const defaultMd = `

* [x] azeazea
  | Feature    | Support              |
  | ---------- | -------------------- |
  | CommonMark | 100%                 |
  | GFM        | 100%                 |`;

export default function Article() {  
  return (
    <Acticle content={defaultMd} />
  )
}