import {CrowOutline} from "@react-icons/all-files/bi/BiCrowOutline";
import { useContext } from "react";
import {Result} from 'antd';

const HomePage = () => {
    return (
        <Result
            icon={<CrowOutline style={{color:"#08c"}}/>}
            title="Welcome to Crow's Nest"
            subTitle="The Crow's Nest is a simple social media app built with React and Firebase. It allows users to sign up, log in, create posts, and view posts from other users. The app is designed to be easy to use and navigate, with a clean and modern interface."
        />
    )
}

export default HomePage;