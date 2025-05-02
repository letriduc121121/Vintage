import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer"
import Header from "../Common/Header"

const UserLayout=()=>{
    return(
        <>
            <Header/>
            {/* main content */}
            <main>
                <Outlet/>
            </main>
            {/* <main></main> */}
            <Footer/>
        </>
    )
}
export default UserLayout;