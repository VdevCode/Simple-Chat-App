import "./App.css";
import { ZIMKitManager, Common } from "@zegocloud/zimkit-react";
import "@zegocloud/zimkit-react/index.css";
import { APP_ID, APP_SECRET } from "./components/constant/constants";
import { useEffect, useState } from "react";

const id = Math.floor(Math.random() * 1000);
console.log(id);
function App() {
  console.log(ZIMKitManager, Common);
  const [state, setState] = useState({
    appConfig: {
      appID: APP_ID,
      serverSecret: APP_SECRET,
    },

    userInfo: {
      // Your ID as a user.
      userID: `{vdevcode${id}}`,
      // Your name as a user.
      userName: `vdevcode${id}`,
      // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
      userAvatarUrl: "",
    },
  });

  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        state.appConfig.appID,
        state.appConfig.serverSecret,
        state.userInfo.userID
      );
      await zimKit.init(state.appConfig.appID);
      await zimKit.connectUser(state.userInfo, token);
    };
    init();
  }, []);

  return (
    <div>
      <h1>Hello {   state.userInfo.userID}</h1>
      <Common></Common>
    </div>
  )
}

export default App;
