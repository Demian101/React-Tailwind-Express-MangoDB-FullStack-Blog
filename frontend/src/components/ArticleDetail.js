import { useGetArticleByIdQuery } from "@/store/api/articleApi";
import ArticleShowMD from "@/components/ArticleShowMD";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import { setCurrentArticle } from "../store/reducer/articleSlice";

/* 
 * Textarea & Markdown 
 * Preview and Modify
 */
const ActicleDetail = () => {
  const [markdown, updateMarkdown] = useState(`## title\ndd \n - d\n - m\n > ddd\n `);

  const [isModified, setIsModified] = useState(false);
  const { articleId } = useParams();
  console.log("articleId from router", articleId)

  /*
   * 用了一个巨蠢的方法来获取 Article ID ： 
    ActicleDetail 这个组件是在 Router中： /articles/:articleId 路由中渲染的
    想要渲染文章，必须知道 articleId ，可以通过 useParams() 来获取路由中的 articleId。

    一开始我不知道有 useParams() 这玩意， 就想着 ArticleList 中点击某个文章的 ReadMore 时，
    触发 articleId 存储到 Redux Store 中， 然后路由触发后， 从 Redux 中 Retrieve articleId
    实在是太复杂 ： 

  const dispatch = useDispatch();
  const dispatchArticle = (id) => {
    console.log("Set articleId : ",id)
    dispatch(setCurrentArticle({
      articleId: id
    }));
  }
  dispatchArticle("我是 ID");

  const arti = useSelector(state => state.arti);
  console.log("arti ", arti)
  */

  const {data: articleDate} = useGetArticleByIdQuery(articleId);  // 获取具体文章
  console.log("articleDate", articleDate);

  const navigate = useNavigate();

  /* PUT 修改文章， 待开发 */
  const submitHandler = (e) => {
    e.preventDefault();
    // navigate("/")
  }

  return (
    <>
    { isModified ? (null) : (
    <div className="grid grid-cols-2 grid-rows-1 h-screen gap-4 container pl-10">
      <div>
        <form 
          className="w-full h-full"
          id="form-md" 
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="flex justify-between ">
            <h3 className="text-lg items-center font-serif pt-3"> Markdown  </h3>
            <button className="text-2xl items-center font-serif bg-gray-200 px-4 mt-1 my-3 rounded-2xl border-4 shadow-md hover:bg-gray-400 hover:border-gray-400">
              Post
            </button>
          </div>
          <textarea
            className="col-start-1 col-span-1 w-full h-auto min-h-screen p-4 border-2 border-gray-200 rounded-lg resize-none"
            placeholder="请输入markdown文本"
            id="editor"
            value={markdown}
            onChange={e => updateMarkdown(e.target.value)}
            />
        </form>
      </div>
      <div>
        {/* <div className="flex justify-between">
          <h3 className="text-lg items-center font-serif px-4 my-2 pt-2">  Preview </h3>
        </div> */}
        <div className="col-start-2 col-span-1  w-full h-full border-2 border-gray-200 rounded-lg resize-none p-4 mt-14">
          <ArticleShowMD mdContent={markdown}/>
        </div>
      </div>
    </div>)
    }
  </>
  )
};

export default ActicleDetail;