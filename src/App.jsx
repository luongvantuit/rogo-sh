import React from "react";
import { AppRouter } from "./routes/AppRouter.jsx";
import pahoMqtt from "paho-mqtt";
import { AppContextComponent } from "./contexts/AppContext.jsx";
import { Provider } from "react-redux";
import { sliderBarStore } from "./stores/slider-bar-store.js";
import { auth } from "./firebase/firebase-auth.js";
import { RoomApi } from "./api/room-api.js";
import { updateStatusRoom } from "./screens/HomeScreen.jsx";

class Mqtt {
  onMessage;

  /**
   *
   * @param {(message: pahoMqtt.Message)=>void} onMessage
   */
  constructor(onMessage) {
    this.onMessage = onMessage;
  }

  hasMessage(message) {
    this.onMessage(message);
  }
}

/**
 * @type {Mqtt}
 */
export var mqtt;

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

/**
 * @type {pahoMqtt.Client}
 */
export const mqttClient = new pahoMqtt.Client(
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
          mqtt.hasMessage(message);
        };
      },
    });
    mqttClient.subscribe("/dnd");
  },
});

export const App = React.memo(() => {
  React.useEffect(() => {
    if (!mqtt) {
      mqtt = new Mqtt((message) => {
        const user = auth.currentUser;
        if (message.destinationName === "/call_reception") {
          if (user) {
            user.getIdToken().then((token) => {
              RoomApi.getFilterRoom(token, {
                rogo_location_id: message.payloadString.split(":")[1].trim(),
              }).then(async (response) => {
                const data = (await response.json())["data"][0];
                /**
                 * @type {Notification}
                 */
                const notify = new Notification(data.name, {
                  body: "Call Reception!",
                });
                notify.addEventListener("show", () => {
                  window.alert(`${data.name} call reception!`);
                });
              });
            });
          }
        } else if (message.destinationName === "/dnd") {
          const payload = JSON.parse(message.payloadString);
          if (user) {
            user.getIdToken().then((token) => {
              RoomApi.getFilterRoom(token, {
                rogo_location_id: payload.locationId,
              }).then(async (response) => {
                const data = (await response.json())["data"][0];
                const date = new Date(payload.time_not_disturb);
                if (payload.time_not_disturb > Date.now()) {
                  new Notification(data.name, {
                    body: `Do not disturb to ${date.toUTCString()}`,
                  });
                } else {
                  new Notification(data.name, {
                    body: `Turn off Do not disturb`,
                  });
                }
              });
            });
          }
          updateStatusRoom.onChange(payload.locationId);
        }
      });
    }
  }, [mqtt]);

  return (
    <React.Fragment>
      <AppContextComponent>
        <Provider store={sliderBarStore}>
          <AppRouter />
        </Provider>
      </AppContextComponent>
    </React.Fragment>
  );
});
