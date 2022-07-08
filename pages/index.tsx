import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Video, { Room } from "twilio-video";
import styles from "../styles/Home.module.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2U1YjU5MTQ5NGZlODFiOWQ1ZjMzNjhhOGM3MWI4MjlmLTE2NTczMDc2NDUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJWaW5pY2l1cyIsInZpZGVvIjp7fX0sImlhdCI6MTY1NzMwNzY0NSwiZXhwIjoxNjU3MzExMjQ1LCJpc3MiOiJTS2U1YjU5MTQ5NGZlODFiOWQ1ZjMzNjhhOGM3MWI4MjlmIiwic3ViIjoiQUM3MmFhNGYwZWM4MjJmYWU2ZDJmYTg2NzU4NjlkZDU0MSJ9.Sux2P48jn63L7SQDPxILPk1IsxRx0GTkJwMhwC1tgyg";

const Home: NextPage = () => {
  // useEffect(() => {
  //   createVideo();
  // }, []);

  const [roomConnected, setRoom] = useState<Video.Room>();
  const connect = useCallback(() => {
    Video.connect(token, {
      name: "EvoleTeste",
    }).then((room) => {
      setRoom(room);
      const { localParticipant } = room;

      room.on("participantConnected", (participant) =>
        console.log(participant)
      );

      localParticipant.videoTracks.forEach((videoTrack) => {
        console.log("videoTrack", videoTrack.kind);
        document
          .getElementById("video")
          ?.appendChild(videoTrack.track.attach())
          ?.classList.add("videotrack");
      });
    });
  }, []);

  const disconnect = useCallback(() => {
    roomConnected?.disconnect();
    const node = document.getElementsByClassName("videotrack")?.[0];
    document.getElementById("video")?.removeChild(node);
  }, [roomConnected]);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(roomConnected?.state !== "connected");
    console.log(roomConnected);
  }, [roomConnected]);

  return (
    <div>
      teste video twilio
      <button onClick={connect}>connect room</button>
      <button onClick={disconnect} disabled={isDisabled}>
        disconnect room
      </button>
      <div id="video"></div>
    </div>
  );
};

export default Home;
