import React, { useContext, useEffect } from "react";

import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall } = useContext(SocketContext);

  useEffect(answerCall, []);

  return <></>;
};

export default Notifications;
