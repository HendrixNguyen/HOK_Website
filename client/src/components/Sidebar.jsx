import React, { useEffect, useContext } from "react";
import { SocketContext } from "../Context";

const Sidebar = () => {
  const { callUser } = useContext(SocketContext);
  useEffect(callUser, []);
  return <></>;
};

export default Sidebar;
