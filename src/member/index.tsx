import {ILayOutProps} from "../types/create-membership";
import Membership from "../pages/membership";
import {auth} from "../constants/firebase-contants";
import Layout from "../layout";



const Member =({children}:ILayOutProps) => {

const isCheckJoin = auth.currentUser

    if(!isCheckJoin)  return <Membership />


    return children;
}

export default Member;