import React, { useState } from 'react';

// List of trivia questions
const triviaQuestions = [
  {
    question: "What is the native token of the Monad blockchain?",
    options: ["MON", "NAD", "mon", "NAWD"],
    correctAnswer: "MON",
    reward: 2,
  },
  {
    question: "What is the primary purpose of the Monad testnet?",
    options: ["To mine new tokens", "To test applications before deploying to mainnet", "To store user data", "To secure transactions"],
    correctAnswer: "To test applications before deploying to mainnet",
    reward: 1,
  },
  {
    question: "Which consensus mechanism does Monad use?",
    options: ["Proof of Work (PoW)", "Proof of Stake (PoS)", "Delegated Proof of Stake (DPoS)", "Byzantine Fault Tolerance (BFT)"],
    correctAnswer: "Proof of Stake (PoS)",
    reward: 1,
  },
  {
    question: "When was Monad testnet launched?",
    options: ["14 - 02 - 2025", "19 - 02 - 2025", "18 - 02 - 2024", "19 - 02 - 2025"],
    correctAnswer: "19 - 02 - 2025",
    reward: 2,
  },
  {
    question: "How many validators are required for a transaction to be confirmed on Monad?",
    options: ["1", "50% + 1", "All validators", "10"],
    correctAnswer: "50% + 1",
    reward: 2,
  },
  {
    question: "What is the ticker symbol for the Monad testnet token?",
    options: ["MON", "TEST", "MNH", "MND"],
    correctAnswer: "MON",
    reward: 2,
  },
  {
    question: "What is the maximum supply of MON tokens?",
    options: ["1 billion", "10 million", "Unlimited", "100 million"],
    correctAnswer: "1 billion",
    reward: 1,
  },
  {
    question: "Which programming language is primarily used for writing smart contracts on Monad?",
    options: ["Python", "Solidity", "JavaScript", "C++"],
    correctAnswer: "Solidity",
    reward: 2,
  },
  {
    question: "What is the block time for Monad?",
    options: ["1 second", "12 seconds", "1 minute", "10 minutes"],
    correctAnswer: "12 seconds",
    reward: 5,
  },
  {
    question: "What feature allows developers to build scalable applications on Monad?",
    options: ["High gas fees", "Low latency", "Centralized architecture", "Limited scalability"],
    correctAnswer: "Low latency",
    reward: 2,
  },
  {
    question: "Which layer does Monad operate on?",
    options: ["Layer 0", "Layer 1", "Layer 2", "Layer 3"],
    correctAnswer: "Layer 1",
    reward: 2,
  },
  {
    question: "What is the primary focus of Monad's development?",
    options: ["Gaming", "DeFi", "Scalability and interoperability", "Social media"],
    correctAnswer: "Scalability and interoperability",
    reward: 1,
  },
  {
    question: "Which tool does Monad provide for developers to quickly scaffold dApps?",
    options: ["Hardhat", "Scaffold-ETH-Monad", "Truffle", "Remix"],
    correctAnswer: "Scaffold-ETH-Monad",
    reward: 2,
  },
  {
    question: "What is the purpose of the Monad Explorer?",
    options: ["To mine new tokens", "To monitor network activity and transactions", "To store user data", "To secure transactions"],
    correctAnswer: "To monitor network activity and transactions",
    reward: 1,
  },
  {
    question: "Which project has collaborated with Monad to enhance its ecosystem?",
    options: ["OpenSea", "Uniswap", "Polygon", "Alchemy"],
    correctAnswer: "Alchemy",
    reward: 1,
  },
  {
    question: "What is the name of the initiative launched by Monad to support developers?",
    options: ["Monad Grants", "Monad Hackathon", "Monad Ecosystem Fund", "Monad Accelerator"],
    correctAnswer: "Monad Ecosystem Fund",
    reward: 5,
  },
  {
    question: "Which wallet is officially supported by Monad?",
    options: ["MetaMask", "Trust Wallet", "Phantom", "Ledger"],
    correctAnswer: "Phantom",
    reward: 1,
  },
  {
    question: "What is the purpose of the Monad Faucet?",
    options: ["To distribute free tokens for testing", "To secure the network", "To store user funds", "To mine new tokens"],
    correctAnswer: "To distribute free tokens for testing",
    reward: 1,
  },
  {
    question: "Which blockchain does Monad aim to interoperate with?",
    options: ["Bitcoin", "Ethereum", "Solana", "All of the above"],
    correctAnswer: "All of the above",
    reward: 1,
  },
  {
    question: "What is the most secure way to store private keys in Web3?",
    options: ["Write them down on paper", "Store them in a hardware wallet", "Keep them in a text file on your computer", "Share them with trusted friends"],
    correctAnswer: "Store them in a hardware wallet",
    reward: 5,
  },
  {
    question: "What is a 'phishing attack'?",
    options: ["A physical attack on data centers", "An attempt to trick users into revealing sensitive information", "A denial-of-service attack", "A mining attack"],
    correctAnswer: "An attempt to trick users into revealing sensitive information",
    reward: 1,
  },
  {
    question: "What is the purpose of a nonce in blockchain transactions?",
    options: ["To encrypt data", "To prevent replay attacks", "To increase gas fees", "To store user data"],
    correctAnswer: "To prevent replay attacks",
    reward: 1,
  },
  {
    question: "What is a 'smart contract'?",
    options: ["A contract written in natural language", "A self-executing contract with code that automatically enforces its terms", "A legal document signed by two parties", "A centralized database"],
    correctAnswer: "A self-executing contract with code that automatically enforces its terms",
    reward: 2,
  },
  {
    question: "What is the role of gas in blockchains?",
    options: ["To store user data", "To pay for executing transactions or smart contracts", "To mine new tokens", "To secure the network"],
    correctAnswer: "To pay for executing transactions or smart contracts",
    reward: 1,
  },
  {
    question: "What is the name of the main character in Meownad Galaxy?",
    options: ["Meowster", "CryptoCat", "Blocky", "ChainLink"],
    correctAnswer: "Meowster",
    reward: 6,
  },
  {
    question: "How many levels are there in the Meownad Galaxy quest?",
    options: ["10", "25", "35", "50"],
    correctAnswer: "35",
    reward: 3,
  },
  {
    question: "What is the ultimate goal of the Meownad Galaxy quest?",
    options: ["To collect all the treasure", "To rescue the kidnapped siblings", "To defeat the final boss", "To mine new tokens"],
    correctAnswer: "To rescue the kidnapped siblings",
    reward: 1,
  },
  {
    question: "What is the reward for completing all 35 levels of the quest?",
    options: ["A special NFT badge", "100 MEOWNAD", "Both A and B", "None of the above"],
    correctAnswer: "Both A and B",
    reward: 3,
  },
  {
    question: "What is the name of the villain in the first world of the quest?",
    options: ["Furyfang Fox", "DarkWolf", "ShadowDragon", "CyberPig"],
    correctAnswer: "Furyfang Fox",
    reward: 1,
  },
  {
    question: "What is the purpose of zero-knowledge proofs (ZKPs) in blockchain?",
    options: ["To prove the validity of information without revealing the underlying data", "To store user data securely", "To mine new tokens", "To secure transactions"],
    correctAnswer: "To prove the validity of information without revealing the underlying data",
    reward: 1,
  },
  {
    question: "What is the difference between ERC-20 and ERC-721 tokens?",
    options: ["ERC-20 tokens are non-fungible, while ERC-721 tokens are fungible", "ERC-20 tokens are fungible, while ERC-721 tokens are non-fungible", "There is no difference", "ERC-20 tokens are used for payments, while ERC-721 tokens are used for governance"],
    correctAnswer: "ERC-20 tokens are fungible, while ERC-721 tokens are non-fungible",
    reward: 5,
  },
];

function Trivia() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = triviaQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.reward);
      alert(`Correct! You earned ${currentQuestion.reward} MEOWNAD.`);
    } else {
      alert("Wrong answer. Try again!");
    }

    if (currentQuestionIndex < triviaQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("You've completed all questions!");
    }
  };

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Trivia Challenge</h2>
      <p>{currentQuestion.question}</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
      <p>Total MEOWNAD Earned: {score}</p>
    </div>
  );
}

export default Trivia;