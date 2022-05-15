import React from "react";
import { AppRouter } from "./routes/AppRouter";
import pahoMqtt from "paho-mqtt";

class Mqtt {
    onMessage: (message: pahoMqtt.Message) => void;

    constructor(onMessage: (message: pahoMqtt.Message) => void) {
        this.onMessage = onMessage;
    }

    public hasMessage(message: pahoMqtt.Message) {
        this.onMessage(message);
    }
}

var mqtt: Mqtt;

const clientId = (() => {
    return `rogo__hotel__${(Math.random() + 1).toString(36)}`;
})();

const { mqttBrokerHost, mqttBrokerPort, mqttBrokerPath } = (() => {
    const mqttBrokerHost: string =
        process.env.REACT_APP_BROKER_HOST || "hotel.rogo.com.vn";
    const mqttBrokerPort: number = parseInt(
        process.env.REACT_APP_BROKER_PORT || "8083"
    );
    const mqttBrokerPath: string = process.env.REACT_APP_BROKER_PATH || "/mqtt";
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
    var timeOutShowNotification: NodeJS.Timeout | undefined = undefined;
    const [showNotification, setShowNotification] =
        React.useState<boolean>(false);
    const [notificationContent, setNotificationContent] =
        React.useState<string>();

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
