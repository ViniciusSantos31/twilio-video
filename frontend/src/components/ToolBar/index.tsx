import { useContext, useMemo } from "react";
import {
  FiMic,
  FiMicOff,
  FiPhoneOff,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { ParticipantsContext } from "../../contexts/Participants";
import { RoomContext } from "../../contexts/Room";
import { useAudio } from "../../hooks/useAudio";
import { useVideo } from "../../hooks/useVideo";
import {
  ActionsContainer,
  ButtonAction,
  ButtonHangUp,
  Container,
} from "./styles";

export const ToolBar = () => {
  const history = useHistory();
  const { isCameraOn, toggleVideo } = useVideo();
  const { isMicOn, toggleAudio } = useAudio();

  const { disconnect } = useContext(RoomContext);
  const { localParticipant } = useContext(ParticipantsContext);

  const handleOnCloseClick = () => {
    disconnect();
    history.push("/");
  };

  const renderButtonActions = useMemo(() => {
    return (
      <ActionsContainer>
        <ButtonAction
          isDisabled={!isMicOn}
          onClick={() => toggleAudio({ localParticipant })}
        >
          {isMicOn ? <FiMic size={24} /> : <FiMicOff size={24} />}
          <span>{isMicOn ? "Desligar microfone" : "Ativar microfone"}</span>
        </ButtonAction>
        <ButtonAction
          isDisabled={!isCameraOn}
          onClick={() => toggleVideo({ localParticipant })}
        >
          {isCameraOn ? <FiVideo size={24} /> : <FiVideoOff size={24} />}
          <span>{isCameraOn ? "Desligar câmera" : "Ativar camera"}</span>
        </ButtonAction>
      </ActionsContainer>
    );
  }, [isCameraOn, isMicOn, toggleAudio, toggleVideo, localParticipant]);

  return (
    <Container>
      <ButtonHangUp onClick={handleOnCloseClick}>
        <FiPhoneOff size={24} />
        <span>Sair da chamada</span>
      </ButtonHangUp>
      {renderButtonActions}
    </Container>
  );
};
