import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #050714;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const VideoContainer = styled.div`
  width: 100%;
  padding: 1rem;
  min-height: 80vh;
`;

export const Videos = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #000;
  overflow: hidden;
  min-height: 30rem;
  height: 100%;
`;

type VideoProps = {
  isPrincipal?: boolean;
};

export const MyVideo = styled.video<VideoProps>`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000;
  object-fit: contain;
  ${({ isPrincipal }) =>
    !isPrincipal &&
    css`
      border-radius: 10px;
      max-width: 20rem;
      position: absolute;
      right: 25px;
      bottom: 25px;
      z-index: 2;
      cursor: pointer;
    `}
`;
