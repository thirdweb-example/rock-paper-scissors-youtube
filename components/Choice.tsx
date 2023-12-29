import React from 'react';
import { GameChoice } from '../utils/gameLogic';
import styles from '../styles/Home.module.css';

type Props = {
  onChoice: (choice: GameChoice) => void;
};

const ChoiceComponent: React.FC<Props> = ({ onChoice }) => {
  return (
    <div>
      <button className={styles.button} onClick={() => onChoice('rock')}>Rock</button>
      <button className={styles.button} onClick={() => onChoice('paper')}>Paper</button>
      <button className={styles.button} onClick={() => onChoice('scissors')}>Scissors</button>
    </div>
  );
};

export default ChoiceComponent;
