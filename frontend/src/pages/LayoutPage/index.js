// import Header from "@/pages/Header";
import { Outlet } from 'react-router-dom'
import Layout from "@/components/Layout"

export default function LayoutPage(){
  return(
    <>
      <Layout />
      <Outlet />
    </>
  )
};