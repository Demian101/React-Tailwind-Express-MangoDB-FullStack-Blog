
const ArticlePreview = ( {title, content, id, clickHandler} ) => {
  return(
    <div className="container w-2/3   mx-auto pt-4 font-inter font-serif items-center">
      <div className="rounded-2xl shadow-2xl border-2 ">  {/*  比较大的圆角 和中等大小的阴影 */}
        <div className="flex">
          {/*  左 div --> */}
          <div className="w-2/6 m-4 p-3">
            <img 
              className="rounded-2xl" 
              alt="failed" src="https://w.wallhaven.cc/full/wq/wallhaven-wqve97.png"></img>
          </div>

          {/*  右 div  */}
          <div className="w-4/6 flex flex-col justify-center  py-2">  {/* 使文本区域上下居中 */}
            <div> 
              <h2 className="text-2xl font-bold text-gray-700"> {title} </h2>
              <p className="my-2 text-lg text-gray-600 "> {content} </p>
              <button onClick={clickHandler} className="text-lg text-white  self-center font-bold bg-gray-400 rounded-full shadow-md px-4 py-2 mt-4 transform hover:bg-slate-500 hover:scale-110 transition" > Read more </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ArticlePreview;