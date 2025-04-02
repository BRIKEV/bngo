import logo from '../../assets/BnGO_logo.svg';
import JoinGame from "./components/JoinGame/JoinGame";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center max-w-2xs w-full p-4 md:max-w-xl">
        <img src={logo} alt="" className="mb-4 max-w-50" />
        <h1 className="text-2xl font-bold mb-4 text-center">Bngo app is a fun application to play picture bingo with your friends</h1>
        <div className="mb-4">
          <JoinGame />
        </div>
      </div>
    </div>
  )
}

export default Home;
