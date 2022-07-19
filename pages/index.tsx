import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Video, { Room, VideoTrack } from "twilio-video";
import { api } from "../service/api";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [roomConnected, setRoom] = useState<any>({});
  const [token, setToken] = useState<string>("");
  const connect = useCallback(
    (token: string) => {
      Video.connect(token, {
        name,
      }).then((room) => {
        setRoom(room);
        const { localParticipant } = room;

        room.on("participantConnected", (participant) => {
          participant.videoTracks.forEach((videoTrack) => {
            const video = document.getElementById("video");
            if (videoTrack.track) {
              video?.appendChild?.(videoTrack.track.attach());
            }
          });
        });

        localParticipant.videoTracks.forEach((videoTrack) => {
          console.log("videoTrack", videoTrack.kind);
          document
            .getElementById("video")
            ?.appendChild(videoTrack.track.attach())
            ?.classList.add("videotrack");
        });
      });
    },
    [token]
  );

  // useEffect(() => {
  //   roomConnected?.on("participantConnected", (participant) => {
  //     participant.videoTracks.forEach((videoTrack) => {
  //       const video = document.getElementById("video");
  //       if (videoTrack.track) {
  //         video?.appendChild?.(videoTrack?.track?.attach());
  //       }
  //     });
  //   });
  // }, [roomConnected]);

  const [name, setName] = useState("");

  const createToken = useCallback(() => {
    api
      .post("/token", {
        name,
        indentity: "Vinicius",
      })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  const createRoom = useCallback(async () => {
    await api
      .post("/room", {
        name,
      })
      .then((response) => setRoom(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, [setRoom]);

  const disconnect = useCallback(() => {
    roomConnected?.disconnect();
    const node = document.getElementsByClassName("videotrack")?.[0];
    document.getElementById("video")?.removeChild(node);
  }, [roomConnected]);

  const disabledVideo = useCallback(() => {
    if (roomConnected) {
      roomConnected.localParticipant.videoTracks.forEach((videoTrack: any) =>
        videoTrack.track.isEnabled
          ? videoTrack.track.disable()
          : videoTrack.track.enable()
      );
    }
  }, [roomConnected]);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(roomConnected?.state !== "connected");
    console.log(roomConnected);
  }, [roomConnected]);

  return (
    <div>
      teste video twilio
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={createRoom} disabled={name === ""}>
        create room
      </button>
      <button onClick={createToken}>create token</button>
      <button onClick={() => connect(token)}>connect room</button>
      <button onClick={disconnect} disabled={isDisabled}>
        disconnect room
      </button>
      <div>sala: {roomConnected?.uniqueName}</div>
      <div>token: {token}</div>
      <div style={{ display: "flex" }}>
        <div id="video"></div>
      </div>
      <button onClick={disabledVideo}>desligar camera</button>
    </div>
  );
};

export default Home;
