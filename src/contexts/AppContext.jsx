import React from "react";
import { auth } from "../firebase/firebase-auth";
import { User } from "firebase/auth";
import Logo from "../assets/logo.png";

class FbAuthentication {
    /**
     * @type {(user:User)=>void}
     */
    onAuthChanged;

    constructor(onAuthChanged) {
        this.onAuthChanged = onAuthChanged;
    }

    /**
     *
     * @param {User} user
     */
    onChange(user) {
        if (this.onAuthChanged) {
            this.onAuthChanged(user);
        }
    }
}

/**
 * @type {FbAuthentication}
 */
let fbUser;

auth.onAuthStateChanged((user) => {
    if (!fbUser) {
        fbUser = new FbAuthentication();
    }
    fbUser.onChange(user);
});

export const AppContext = React.createContext(null);

export const AppContextComponent = React.memo(({ children }) => {
    const [user, setUser] = React.useState();
    const [initial, setInitial] = React.useState(false);

    React.useEffect(() => {
        if (!fbUser) {
            fbUser = new FbAuthentication((user) => {
                if (!initial) {
                    setInitial(true);
                }
                setUser(user);
            });
        } else if (!fbUser?.onAuthChanged) {
            fbUser.onAuthChanged = (user) => {
                if (!initial) {
                    setInitial(true);
                }
                setUser(user);
            };
        }
    }, []);

    return (
        <AppContext.Provider value={user}>
            {(() => {
                if (initial) {
                    return children;
                } else {
                    return (
                        <div className="flex flex-col justify-center items-center w-screen h-screen">
                            <img
                                src={Logo}
                                alt=""
                                className="w-[120px] h-[120px] p-[16px] rounded-md shadow-md transition drop-shadow-md"
                            />
                            <p className="tracking-[2px] font-bold text-[32px] text-gray-400 my-[16px] drop-shadow-md">
                                Rogo Solutions
                            </p>
                        </div>
                    );
                }
            })()}
        </AppContext.Provider>
    );
});
