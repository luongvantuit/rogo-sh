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
    const [showNotification, setShowNotification] =
        React.useState<boolean>(false);
    const [notificationContent, setNotificationContent] =
        React.useState<string>();

    const classNameNotificationContainer = () => {
        if (showNotification) {
        } else {
        }
    };

    React.useEffect(() => {
        if (!mqtt) {
            mqtt = new Mqtt((message) => {
                if (showNotification) {
                    setShowNotification(false);
                }
                console.log({
                    topic: message.destinationName,
                    msg: message.payloadString,
                });
                setNotificationContent(message.payloadString);
                setShowNotification(true);
            });
        }
    }, []);

    return (
        <React.Fragment>
            <AppRouter />
        </React.Fragment>
    );
});
