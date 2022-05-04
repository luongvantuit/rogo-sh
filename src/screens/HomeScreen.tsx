import React from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { Logger } from "../utils/Logger";
import HomeBackground from "../assets/home-background.jpg";

export class HomeScreen extends React.PureComponent {
    private static TAG: string = HomeScreen.name;
    private static TITLE_DEFAULT: string = "Rogo Solutions - Home";

    private setTitle(): void {
        if (document) {
            document.title = HomeScreen.TITLE_DEFAULT;
        }
    }

    componentDidMount() {
        this.setTitle();
    }

    componentDidUpdate() {
        this.setTitle();
    }

    render(): React.ReactNode {
        Logger.debug(HomeScreen.TAG, `Render --> ${HomeScreen.name}`);
        return (
            <React.Fragment>
                <HeaderComponent />
                <div className="relative">
                    <img src={HomeBackground} alt="Home Background" className="duration-200" />
                    <a
                        className="absolute left-[57px] bottom-[64px] text-white w-[280px] h-[72px] group"
                        href={`${process.env.PUBLIC_URL}/dashboard`}
                    >
                        <p className="text-center text-[48px] font-black group-hover:border-b-4 group-hover:border-b-[#FE3567] duration-150 border-b-[#FFFFFF]">
                            Dashboard
                        </p>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}
