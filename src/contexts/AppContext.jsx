import React from "react";
import { auth } from "../firebase/firebase-auth";
import { User } from "firebase/auth";

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
                    return <p>Loading...</p>;
                }
            })()}
        </AppContext.Provider>
    );
});
