import { useContext, useEffect, useRef, useState } from "react";
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff } from "react-icons/md";

import {
  ToolBar,
  Video,
  VideoTurnedOff,
  VideoCard,
  FirstNameChar,
  IconButton,
} from "./styled";
import { IProps } from "./types";
import { useTrack } from "../../hooks/useTrack";
import { MyVideo, VideoContainer } from "../../pages/meet/styles";
import { ParticipantsContext } from "../../contexts/Participants";

const ParticipantCard = ({ participant, isLocal, width, height }: IProps) => {
  const {
    audioTracks,
    isRemoteCameraOn,
    isRemoteMicOn,
    videoTracks,
  } = useTrack(participant);

  const { isAlone } = useContext(ParticipantsContext);

  // const [
  //   isRemoteCameraDisabledFromLocal,
  //   setIsRemoteCameraDisabledFromLocal,
  // ] = useState(false);
  // const [
  //   isRemoteMicDisabledFromLocal,
  //   setIsRemoteMicDisabledFromLocal,
  // ] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // const toggleLocalCamera = () => {
  //   if (isRemoteCameraOn) {
  //     videoTracks[0].mediaStreamTrack.enabled = isRemoteCameraDisabledFromLocal;
  //     setIsRemoteCameraDisabledFromLocal(!isRemoteCameraDisabledFromLocal);
  //   }
  // };

  // const toggleLocalMic = () => {
  //   if (isRemoteMicOn) {
  //     console.log(!isMicOn());
  //     setIsRemoteMicDisabledFromLocal(isMicOn());
  //   }
  // };

  // const isMicOn = () => isRemoteMicOn && !isRemoteMicDisabledFromLocal;
  // const isCameraOn = () => isRemoteCameraOn && !isRemoteCameraDisabledFromLocal;

  useEffect(() => {
    const videoTrack = videoTracks[0];
    const audioTrack = audioTracks[0];
    if (videoTrack?.attach && videoRef.current) {
      videoTrack.attach(videoRef.current);
    }

    if (audioTrack?.attach && audioRef.current) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      if (videoTrack?.detach && audioTrack?.detach) {
        videoTrack?.detach();
        audioTrack?.detach();
      }
    };
  }, [videoTracks, audioTracks]);

  return (
    <>
      {isRemoteCameraOn ? (
        <MyVideo ref={videoRef} autoPlay isPrincipal={isLocal && !isAlone} />
      ) : (
        <VideoTurnedOff />
      )}
      <audio ref={audioRef} autoPlay />
    </>
  );
};
export default ParticipantCard;
