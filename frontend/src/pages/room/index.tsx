import { useCallback, useContext, useEffect } from "react";
import Video from "twilio-video";

import Participant from "../../components/participant";
import { ParticipantsContext } from "../../contexts/Participants";
import { calculateVideoCardSize } from "../../services/screen";
// import { Container } from "./styled";

import { ToolBar } from "../../components/ToolBar";
import { RoomContext } from "../../contexts/Room";
import { Videos, VideoContainer, Container } from "../meet/styles";

const Room = () => {
  const {
    participants,
    localParticipant,
    setParticipants,
    setLocalParticipant,
  } = useContext(ParticipantsContext);

  const { connect, disconnect } = useContext(RoomContext);

  const videoCard = calculateVideoCardSize([]);

  const renderRemoteParticipants = useCallback(
    () =>
      participants.map((participant: Video.RemoteParticipant) => (
        <Participant
          width={videoCard.width}
          height={videoCard.height}
          key={participant.sid}
          participant={participant}
        />
      )),
    [participants]
  );

  const participantConnected = (participant: Video.RemoteParticipant) => {
    const newParticipants = [...participants, participant];
    setParticipants(newParticipants);
  };

  const participantDisconnected = (participant: Video.RemoteParticipant) => {
    const newParticipants = participants.filter(
      (p: Video.RemoteParticipant) => p !== participant
    );
    setParticipants(newParticipants);
  };

  const disableTrackOnInit = (
    room: Video.Room,
    type: "videoTracks" | "audioTracks"
  ) => {
    const { track } = [...room.localParticipant[type].values()][0];
    track.stop();
    track.disable();
  };

  useEffect(() => {
    connect().then((roomResponse) => {
      roomResponse.on("participantDisconnected", participantDisconnected);
      roomResponse.on("participantConnected", participantConnected);
      roomResponse.participants.forEach(participantConnected);
      setLocalParticipant(roomResponse.localParticipant);
      disableTrackOnInit(roomResponse, "videoTracks");
      disableTrackOnInit(roomResponse, "audioTracks");
    });

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Container>
      <VideoContainer>
        <Videos>
          {localParticipant && (
            <Participant
              width={videoCard.width}
              height={participants.length > 0 ? videoCard.height : "auto"}
              isLocal
              participant={localParticipant}
            />
          )}
          {renderRemoteParticipants()}
        </Videos>
      </VideoContainer>
      <ToolBar />
    </Container>
  );
};

export default Room;
