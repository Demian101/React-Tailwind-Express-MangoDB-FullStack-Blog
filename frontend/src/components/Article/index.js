import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Article() {
  const markdown = `Just a link: https://reactjs.com.  a  [link](https://www.baidu.com) ![add](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-16-072531.png) 
  * dd
  * add
  * ddd
  `
  return (
    <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
  )
}