import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import Video, { Room } from "twilio-video";

import api from "../services/api";

interface Params {
  identity: string;
  roomName: string;
}

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzBjM2VmMmYxNjE4ZTVjNTI1ODgzOTc5OWMwNTkxMmY5LTE2NTg5NTM3NTUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJWaW5pY2l1cyIsInZpZGVvIjp7InJvb20iOiJUZXN0ZUZyb250In19LCJpYXQiOjE2NTg5NTM3NTUsImV4cCI6MTY1ODk1NzM1NSwiaXNzIjoiU0swYzNlZjJmMTYxOGU1YzUyNTg4Mzk3OTljMDU5MTJmOSIsInN1YiI6IkFDNzJhYTRmMGVjODIyZmFlNmQyZmE4Njc1ODY5ZGQ1NDEifQ.gzHEtopfVlRf5kokmEc5rYkKIvKkur-Q3aKEF0SU7tI";

export const useRoom = ({ identity, roomName }: Params) => {
  const history = useHistory();
  const [room, setRoom] = useState<Room | null>(null);

  if (!identity && !roomName) {
    history.push("/");
  }

  const connect = useCallback(async () => {
    const {
      data: { token },
    } = await api.post("video/token", {
      identity,
      room: roomName,
    });
    const roomResponse = await Video.connect(token, {
      name: roomName,
      video: true,
      audio: true,
    });

    setRoom(roomResponse);
    return roomResponse;

    // disableMicAndCanOnInit(roomResponse);
  }, []);

  const disconnect = () => {
    setRoom((currentRoom) => {
      if (currentRoom && currentRoom.localParticipant.state === "connected") {
        currentRoom.localParticipant.videoTracks.forEach((trackPublication) => {
          trackPublication.track.stop();
          trackPublication.unpublish();
        });
        currentRoom.localParticipant.audioTracks.forEach((trackPublication) => {
          trackPublication.track.stop();
          trackPublication.unpublish();
        });
        currentRoom?.disconnect();

        return null;
      }

      return null;
    });
  };

  return { room, connect, disconnect };
};
