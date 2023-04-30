import type { NextPage } from "next";
import { GetWindowSize } from "../lib/hooks/useNewWindowSize";
import {useWindowSize} from "../lib/hooks/useWindowSize";

const Home: NextPage = () => {
    const [  screenWidth,screenHeight ] = useWindowSize();
    return (
        <div>
            height:{screenWidth} width:{screenHeight}
        </div>
    );
};

export default Home;