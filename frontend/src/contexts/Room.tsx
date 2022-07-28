/* eslint-disable no-undef */
import { createContext } from "react";
import { useLocation } from "react-router-dom";
import { Room } from "twilio-video";
import { useRoom } from "../hooks/useRoom";

interface RoomContextValues {
  room: Room | null;
  connect: () => Promise<Room>;
  disconnect: () => void;
}

interface RoomProviderProps {
  children: React.ReactNode;
}

export const RoomContext = createContext<RoomContextValues>(
  {} as RoomContextValues
);

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const dataRoom = useLocation<{ roomName: string; username: string }>().state;

  const { connect, disconnect, room } = useRoom({
    roomName: dataRoom?.roomName,
    identity: dataRoom?.username,
  });

  return (
    <RoomContext.Provider
      value={{
        room,
        connect,
        disconnect,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
