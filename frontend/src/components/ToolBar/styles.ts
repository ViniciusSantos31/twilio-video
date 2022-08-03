import styled, { css } from "styled-components";

export const Container = styled.div`
  background-color: #0c0e1d;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  width: 100%;
  padding: 25px;
  max-height: 20vh;
`;

const ButtonStyle = css`
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 15px;
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s;

  svg {
    margin-right: 10px;
  }
`;

export const ButtonHangUp = styled.button`
  background-color: #be1e2d;
  border: 2px solid #be1e2d;
  ${ButtonStyle}

  &:hover {
    opacity: 0.9;
  }
`;

interface ButtonActionProps {
  isDisabled?: boolean;
}

export const ButtonAction = styled.button.attrs({
  className: "button-action",
})<ButtonActionProps>`
  ${ButtonStyle}
  border: 2px solid #fff;
  background-color: transparent;
  transition: all 0.2s ease;

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          border-color: #be1e2d;
          background-color: #be1e2d;
          color: #fff;

          &:hover {
            opacity: 0.9;
          }
        `
      : css`
          &:hover {
            background-color: #fff;
            color: #0c0e1d;
            svg path {
              color: #0c0e1d;
            }
          }
        `}
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;

  .button-action + .button-action {
    margin-left: 10px;
  }
`;
