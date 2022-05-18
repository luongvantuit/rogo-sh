import React from "react";
import { AppRouter } from "./routes/AppRouter.jsx";
import pahoMqtt from "paho-mqtt";

class Mqtt {
    onMessage;

    constructor(onMessage) {
        this.onMessage = onMessage;
    }

    hasMessage(message) {
        this.onMessage(message);
    }
}

var mqtt;

const clientId = (() => {
    return `rogo__hotel__${(Math.random() + 1).toString(36)}`;
})();

const { mqttBrokerHost, mqttBrokerPort, mqttBrokerPath } = (() => {
    const mqttBrokerHost = "hotel.rogo.com.vn";
    const mqttBrokerPort = 8083;
    const mqttBrokerPath = "/mqtt";
    return {
        mqttBrokerHost: mqttBrokerHost,
        mqttBrokerPort: mqttBrokerPort,
        mqttBrokerPath: mqttBrokerPath,
    };
})();

const mqttClient = new pahoMqtt.Client(
    mqttBrokerHost,
    mqttBrokerPort,
    mqttBrokerPath,
    clientId
);

mqttClient.connect({
    onSuccess: () => {
        mqttClient.subscribe("/call_reception", {
            onSuccess: () => {
                mqttClient.onMessageArrived = (message) => {
                    if (mqtt) {
                        mqtt.hasMessage(message);
                    }
                };
            },
        });
    },
});

export const App = React.memo(() => {
    var timeOutShowNotification = undefined;
    const [showNotification, setShowNotification] = React.useState(false);
    const [notificationContent, setNotificationContent] = React.useState();

    const classNameNotificationContainer = () => {
        if (showNotification) {
            return "fixed top-[64px] right-[64px] bg-[#FFC764] justify-center duration-300 flex flex-row";
        }
        return "hidden";
    };

    React.useEffect(() => {
        if (!mqtt) {
            mqtt = new Mqtt((message) => {
                if (showNotification) {
                    setShowNotification(false);
                    if (timeOutShowNotification) {
                        clearTimeout(timeOutShowNotification);
                    }
                }
                setNotificationContent(message.payloadString);
                setShowNotification(true);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                timeOutShowNotification = setTimeout(() => {
                    setShowNotification(false);
                    clearTimeout(timeOutShowNotification);
                    timeOutShowNotification = undefined;
                }, 5000);
            });
        }
    }, [showNotification]);

    return (
        <React.Fragment>
            <AppRouter />
            <div className={classNameNotificationContainer()}>
                <p className="px-[24px] py-[18px] text-[16px] tracking-[4px] text-[#212529]">
                    {notificationContent}
                </p>
                <button
                    className="bg-[#EFA92E]"
                    onClick={() => {
                        setShowNotification(false);
                        if (timeOutShowNotification) {
                            clearTimeout(timeOutShowNotification);
                            timeOutShowNotification = undefined;
                        }
                    }}
                >
                    <i className="fa-solid fa-xmark text-white text-[16px]] px-[16px]" />
                </button>
            </div>
        </React.Fragment>
    );
});
