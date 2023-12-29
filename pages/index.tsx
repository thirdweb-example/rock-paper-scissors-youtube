import { ConnectWallet, useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import ChoiceComponent from "../components/Choice";
import { useState } from "react";
import { GameChoice, determineWinner } from "../utils/gameLogic";
import { TOKEN_CONTRACT_ADDRESS } from "../constants/constants";

interface GameResult {
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: string;
}

const Home: NextPage = () => {
  const address = useAddress();

  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);

  const gameChoices: GameChoice[] = ['rock', 'paper', 'scissors'];

  const getRandomChoice = (): GameChoice => {
    const randomIndex = Math.floor(Math.random() * gameChoices.length);
    return gameChoices[randomIndex];
  };

  const handlePlayerChoice = async (playerChoice: GameChoice) => {
    const computerChoice: GameChoice = getRandomChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    const newGameResult: GameResult = { playerChoice, computerChoice, result: winner };
    setGameHistory(prevHistory => [newGameResult, ...prevHistory].slice(0, 10));

    if (winner === 'You win!') {
      try {
        const response = await fetch('/api/claimToken', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
          }),
        });

        const data = await response.json();

        if(!response.ok) {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const { contract } = useContract(TOKEN_CONTRACT_ADDRESS);

  const { data: tokenBalance } = useTokenBalance(contract, address);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet
          // displayBalanceToken={{
          //   80001: TOKEN_CONTRACT_ADDRESS,
          // }}
        />
        {address && (
          <>
            <h2>Balance: {tokenBalance?.displayValue}</h2>
            <h3>Select your choice: </h3>
            <ChoiceComponent
              onChoice={handlePlayerChoice}
            />
            <h3>Results: </h3>
            <ul className={styles.results}>
              {gameHistory.map((game, index) => (
                <li key={index}>
                  <strong>Player: </strong> {game.playerChoice}, <strong>Computer: </strong> {game.computerChoice}. <strong>{game.result}</strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
