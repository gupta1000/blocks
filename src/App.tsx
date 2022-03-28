import React from "react";

import { Route, Routes } from "react-router-dom";

import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";

import useLocalStorage from "./hooks/useLocalStorage";

import { Game } from "./components/game";

import "./css/utils.css";

const DOCUMENT_TITLE = "blocks";

const LOCALSTORAGE_BLOCKS_USER_ID_KEY = "blocks.user_id.key";

document.title = DOCUMENT_TITLE;

function App(): JSX.Element {
  const [userId, setUserId] = useLocalStorage(
    LOCALSTORAGE_BLOCKS_USER_ID_KEY,
    ""
  );

  // Set the userId if it does not already exist.
  React.useEffect(() => {
    if (!userId) {
      setUserId(PubNub.generateUUID());
    }
  }, []);

  const { REACT_APP_PUBNUB_PUBLISH_KEY, REACT_APP_PUBNUB_SUBSCRIBE_KEY } =
    process.env;
  if (!REACT_APP_PUBNUB_PUBLISH_KEY || !REACT_APP_PUBNUB_SUBSCRIBE_KEY) {
    throw Error("missing pub/sub keys");
  }

  if (!userId) {
    return <>Error: no user id set</>;
  }

  const pubnub = new PubNub({
    publishKey: REACT_APP_PUBNUB_PUBLISH_KEY,
    subscribeKey: REACT_APP_PUBNUB_SUBSCRIBE_KEY,
    uuid: userId
  });

  return (
    <PubNubProvider client={pubnub}>
      <Routes>
        <Route index />
        <Route path="lobby" />
        <Route path="game/:sessionId" element={<Game userId={userId} />} />
      </Routes>
    </PubNubProvider>
  );
}

export default App;
