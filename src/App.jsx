import React from "react";
import { AppRouter } from "./routes/AppRouter.jsx";
import pahoMqtt from "paho-mqtt";
import { AppContextComponent } from "./contexts/AppContext.jsx";

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
                    if (!mqtt) {
                        mqtt = new Mqtt();
                    }
                    mqtt.hasMessage(message);
                };
            },
        });
    },
});

export const App = React.memo(() => {
    React.useEffect(() => {
        if (!mqtt) {
            mqtt = new Mqtt((message) => {
                if (Notification.permission == "granted") {
                    new Notification("Reception", {
                        body: message.payloadString,
                    });
                }
            });
        } else if (!mqtt?.onMessage) {
            mqtt.onMessage = (message) => {
                if (Notification.permission == "granted") {
                    new Notification("Customer", {
                        body: message.payloadString,
                    });
                }
            };
        }
    }, [mqtt]);
    if (Notification.permission != "granted") {
        Notification.requestPermission();
    }

    return (
        <React.Fragment>
            <AppContextComponent>
                <AppRouter />
            </AppContextComponent>
        </React.Fragment>
    );
});
