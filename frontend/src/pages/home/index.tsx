import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleChangeRoomName = (e: ChangeEvent<HTMLInputElement>) =>
    setRoomName(e.target.value);

  const handleClick = () => {
    history.push("/room", { username, roomName });
  };

  useEffect(() => {
    setIsButtonEnabled(
      username.trim().length > 0 && roomName.trim().length > 0
    );
  }, [username, roomName]);

  return (
    <div>
      <input
        onChange={handleChangeUsername}
        value={username}
        placeholder="username"
      />
      <input
        onChange={handleChangeRoomName}
        value={roomName}
        placeholder="room name"
      />
      <button disabled={!isButtonEnabled} onClick={handleClick}>
        Criar sala
      </button>
    </div>
  );
};

export default Home;
