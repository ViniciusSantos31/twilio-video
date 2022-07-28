/* eslint-disable no-undef */
import { createContext, useMemo, useState } from "react";
import Video, { LocalParticipant } from "twilio-video";

interface ParticipantContextValues {
  isAlone: boolean;
  localParticipant: LocalParticipant | undefined;
  participants: Video.RemoteParticipant[];
  setParticipants: (participants: Video.RemoteParticipant[]) => void;
  setLocalParticipant: (localParticipant: LocalParticipant | undefined) => void;
}

interface ParticipantsProviderProps {
  children: React.ReactNode;
}

export const ParticipantsContext = createContext<ParticipantContextValues>({
  participants: [],
} as any);

export const ParticipantsProvider: React.FC<ParticipantsProviderProps> = ({
  children,
}) => {
  const [participants, setParticipants] = useState<Video.RemoteParticipant[]>(
    []
  );
  const [localParticipant, setLocalParticipant] = useState<LocalParticipant>();

  const isAlone = useMemo(() => {
    return participants.length === 0 && localParticipant !== undefined;
  }, [participants]);

  return (
    <ParticipantsContext.Provider
      value={{
        isAlone,
        localParticipant,
        participants,
        setParticipants,
        setLocalParticipant,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
};

export default ParticipantsProvider;
