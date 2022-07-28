import { useState } from "react";
import { Container, MyVideo, VideoContainer, Videos } from "./styles";

import mockCam1 from "../../assets/mockCam1.png";
import { ToolBar } from "../../components/ToolBar";

export const Meet = () => {
  const [isPrincipal, setIsPrincipal] = useState(false);

  const handleIsPrincipal = () => {
    setIsPrincipal(!isPrincipal);
  };

  return (
    <Container>
      <VideoContainer>
        <Videos>
          <MyVideo
            isPrincipal={isPrincipal}
            src={mockCam1}
            onClick={() => !isPrincipal && handleIsPrincipal()}
          />
          <MyVideo
            isPrincipal={!isPrincipal}
            src={"https://thispersondoesnotexist.com/image"}
            onClick={() => isPrincipal && handleIsPrincipal()}
          />
        </Videos>
        <ToolBar />
        <div className="controls"></div>
      </VideoContainer>
      <div className="chat"></div>
    </Container>
  );
};

export default Meet;
