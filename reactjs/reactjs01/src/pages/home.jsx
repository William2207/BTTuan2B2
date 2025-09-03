import { BiCrown } from "react-icons/bi";
import { Result } from "antd";

const HomePage = () => {
  return (
    <Result
      icon={<BiCrown style={{ color: "#08c" }} />}
      title="Welcome to Crow's Nest"
      subTitle="The Crow's Nest is a simple social media app built with React and Firebase. It allows users to sign up, log in, create posts, and view posts from other users. The app is designed to be easy to use and navigate, with a clean and modern interface."
    />
  );
};

export default HomePage;
