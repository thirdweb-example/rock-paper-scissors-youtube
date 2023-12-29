type GameChoice = 'rock' | 'paper' | 'scissors';

function determineWinner(playerChoice: GameChoice, computerChoice: GameChoice): string {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  }

  switch (playerChoice) {
    case 'rock':
      return (computerChoice === 'scissors') ? 'You win!' : 'You Lost!';
    case 'paper':
      return (computerChoice === 'rock') ? 'You win!' : 'You Lost!';
    case 'scissors':
      return (computerChoice === 'paper') ? 'You win!' : 'You Lost!';
    default:
      return "Invalid choice";
  }
}

export type { GameChoice };
export { determineWinner };
