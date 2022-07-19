import { useGetArticlesQuery } from "@/store/api/articleApi";
// import { useEffect } from "react";
import ArticlePreview from "@/components/ArticlePreview"

import { useNavigate } from "react-router-dom";

const ArticlePreviewList = () => {
  console.log("渲染 Articles Lists")
  const {data: articleData} = useGetArticlesQuery();  // 获取文章列表

  const navigate = useNavigate();

  /* 点击渲染具体文章的组件 ： 
   *  navigate(`/article/${articleId}`) ， App.js 定义了 article/:id 路由
   *  路由会去渲染 ArticleDetail 组件   
   *  ArticleDetail 组件的 useParams() 方法，获取路由参数  */
  const clickHandler = (e, articleId) => {
    console.log("click Readmore， Navigate to: " , `/article/${articleId}`)
    navigate(`/articles/${articleId}`)
  }

  return (
    <div>
    { articleData ? 
        (articleData.map((article) => {
          // console.log("article.title",article)
          return (
            <ArticlePreview 
              key={article._id}
              title={article.title} 
              content={article.description} 
              id={article._id}
              clickHandler={(e, _id) => clickHandler(e, article._id)}
            />
          )
        })) : (null)
    }
    </div>
  )
}

export default ArticlePreviewList;