import ArticlePreviewList from "@/components/ArticlePreviewList"
// import ArticlePreview from "@/components/ArticlePreview"

// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import ExampleComponent from '../../components/ExampleComponent'
// import Acticle from '../../components/Article';
// import { http } from '../../utils'
// import { useEffect } from 'react'
/* Markdown 渲染条件: 
1. 必须空首行 
2. 左侧缩进不能太多 */

/*
const defaultMd = `

  * [x] azeazea

    | Feature    | Support              |
    | ---------- | -------------------- |
    | CommonMark | 100%                 |
    | GFM        | 100%                 |`;

export default function Article() {  
  // 获取文章列表
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/api/tutorials')
      console.log("res",res)
    }
    loadList()
  }, [])
  return (
    <Acticle content={defaultMd} />
  )
}
*/

function ArticlesPage() { 
  return (
    <div>
      <ArticlePreviewList />
      {/* <ArticlePreview /> */}
    </div>
  )
}
export default ArticlesPage;