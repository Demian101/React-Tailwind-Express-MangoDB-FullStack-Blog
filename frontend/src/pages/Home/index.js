import {useState} from 'react'
import { AiOutlineSwap } from "react-icons/ai";
import { FaCat } from "react-icons/fa";
import { GiCat, GiHollowCat } from "react-icons/gi";
import { IoLogoOctocat, IoIosLeaf } from "react-icons/io";
// import Slider from "@/components/Slider"
import Slider from "../../components/Slider"
import pics from '../../data/pics';


export default function Layout(){
  const [isRevert,setIsRevert] = useState(false)
  const ClickHandle = () =>{
    setIsRevert((preValue) => !preValue)
  }
  return(
    <div className="grid grid-flow-row grid-cols-4">
      <div className="col-start-1 col-span-3 row-span-full z-0">
        <Slider data={pics}/> 
      </div>   {/* Slider End */}
     {/* Card 部分 */}
      <div className="grid grid-cols-1">
        <div className="z-10 max-w-lg  my-6 border border-slate-200 rounded-xl mr-16 mx-auto p-5 shadow-md font-inter group font-serif selection:bg-slate-300   dark:hover:bg-slate-300 ">
          <div className="flex justify-between font-bold text-slate-700 text-lg mb-3  dark:group-hover:text-slate-800">
            <h5> @Kate  </h5>
            <button onClick={(e)=> console.log("Clicked!")}>
              <AiOutlineSwap className="mt-1" />
            </button>
          </div>
          <div className="text-slate-600 h-full  selection:bg-slate-200   dark:group-hover:text-slate-800">
            <p className="h-full">
              独立研究者、当代游牧民族、爱睡觉的小猫咪、童话书里森林小精灵之间切换。知道自己想要什么 
             近期在做】一个以伊斯兰几何为素材的解谜游戏；一个帮助理解中华文明脉络的大纲；《人文行游指南》；各个文明和学科视角的综合图谱 计划八月来大理，做一些探索跨学科思维的小活动 
              长期方向】思考“思考” , 无数的观念碰撞之中，我们在经历着从“认识者”到“创造者”的转变，新的范式（后现代的出口）正在孕育诞生。在学术圈之外学术，可以摒弃许多固有的套路，甚至用类似艺术的方式。具体方向是语言学和赵汀阳文化哲学。喵～              
            </p>
          </div>
        </div>  {/* Card End */}
        <div className="flex space-x-4 mt-10 justify-between ml-12 pr-10 mr-16"> <FaCat /> <GiCat /> <GiHollowCat /> <IoLogoOctocat /> </div>
      </div>
    </div>
  )
}