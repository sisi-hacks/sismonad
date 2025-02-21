import React, { useState } from 'react';
import Phaser from 'phaser';

const villains = [
  {
    name: "Furyfang Fox",
    description: "A cunning fox with razor sharp teeth.",
    power: 5,
    strength: 5,
  },
  {
    name: "Dustwing Panther",
    description: "A stealthy panther that prowls in the dark.",
    power: 4,
    strength: 4,
  },
  {
    name: "Sinbad Tiger",
    description: "A tiger with electrifying powers.",
    power: 6,
    strength: 6,
  },
  {
    name: "Deathtail Scorpion",
    description: "A scorpion with venomous stingers.",
    power: 5,
    strength: 5,
  },
  {
    name: "Blazewing Phoenix",
    description: "An immortal fiery phoenix that is reborn from ashes every time. The only way to defeat it is to pluck its single golden feather under its breast.",
    power: 8,
    strength: 8,
  },
  {
    name: "IceWolf",
    description: "A wolf with icy breath that freezes enemies.",
    power: 6,
    strength: 6,
  },
  {
    name: "Doom Snake",
    description: "A snake with toxic venom.",
    power: 5,
    strength: 5,
  },
  {
    name: "Stormfeather Eagle",
    description: "An eagle that summons storms.",
    power: 7,
    strength: 7,
  },
  {
    name: "Mudshell Turtle",
    description: "A turtle with impenetrable armor.",
    power: 4,
    strength: 4,
  },
  {
    name: "Port and Nova Sharks",
    description: "Sharks with blood red scales and incredible speed.",
    power: 6,
    strength: 6,
  },
  {
    name: "Crystalclaw Lioness",
    description: "A lioness with crystalline claws.",
    power: 7,
    strength: 7,
  },
  {
    name: "Darkmane Horse",
    description: "A horse with shadowy powers.",
    power: 5,
    strength: 5,
  },
  {
    name: "Plaguebeak Raven",
    description: "A raven spreading chaos.",
    power: 4,
    strength: 4,
  },
  {
    name: "Thorn Hyena",
    description: "A hyena with thorny fur.",
    power: 5,
    strength: 5,
  },
  {
    name: "Gloomfin Octopus",
    description: "An octopus lurking in underwater caves.",
    power: 6,
    strength: 6,
  },
  {
    name: "Soulwhisperer Bat",
    description: "A bat that manipulates minds.",
    power: 5,
    strength: 5,
  },
  {
    name: "Ironhoof Bison",
    description: "A bison with unbreakable hooves.",
    power: 5,
    strength: 5,
  },
  {
    name: "Poison Porcupine",
    description: "A porcupine with poisonous quills.",
    power: 4,
    strength: 4,
  },
  {
    name: "Smogbreath Dragon",
    description: "A dragon exhaling smoky fumes.",
    power: 8,
    strength: 8,
  },
  {
    name: "Nightfang Wolverine",
    description: "A wolverine with night vision.",
    power: 5,
    strength: 5,
  },
  {
    name: "Frostbite Polar Bear",
    description: "A polar bear freezing its foes.",
    power: 6,
    strength: 6,
  },
  {
    name: "Crimsonmane Cheetah",
    description: "A cheetah with blazing speed.",
    power: 7,
    strength: 7,
  },
  {
    name: "Dustwing Locust",
    description: "A locust causing destruction.",
    power: 4,
    strength: 4,
  },
  {
    name: "Bane Alligator",
    description: "An alligator with obsidian teeth.",
    power: 6,
    strength: 6,
  },
  {
    name: "Glacier Seal",
    description: "A seal with icy breath.",
    power: 5,
    strength: 5,
  },
];

// Randomize power levels and strengths
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomVillain() {
  const randomIndex = getRandomInt(0, villains.length - 1);
  const villain = { ...villains[randomIndex] };
  villain.power = getRandomInt(villain.power - 2, villain.power + 2);
  villain.strength = getRandomInt(villain.strength - 2, villain.strength + 2);
  return villain;
}

function GameScene(config) {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      preload: function () {
        this.load.image("background", "assets/background.png");
        this.load.image("player", "assets/player.png");
        this.load.image("villain", "assets/villain.png");
      },
      create: function () {
        this.add.image(400, 300, "background");
        this.player = this.add.image(100, 300, "player");
        this.villain = this.add.image(700, 300, "villain");
      },
      update: function () {
        // Add game logic here
      },
    },
  };

  const game = new Phaser.Game(config);

  return <div id="game-container"></div>;
}

function Quest() {
  const [currentVillainIndex, setCurrentVillainIndex] = useState(0);
  const [powerLevel, setPowerLevel] = useState(0);
  const [strengthLevel, setStrengthLevel] = useState(0);

  const defeatVillain = () => {
    const currentVillain = villains[currentVillainIndex];
    setPowerLevel(powerLevel + currentVillain.power);
    setStrengthLevel(strengthLevel + currentVillain.strength);
    setCurrentVillainIndex(currentVillainIndex + 1);
  };

  const currentVillain = villains[currentVillainIndex];
  if (!currentVillain) {
    return <div>Quest completed!</div>;
  }

  return (
    <div>
      <h2>Defeat {currentVillain.name}</h2>
      <p>{currentVillain.description}</p>
      <p>Power: {currentVillain.power}</p>
      <p>Strength: {currentVillain.strength}</p>
      <button onClick={defeatVillain}>Fight</button>
      <p>Power Level: {powerLevel}</p>
      <p>Strength Level: {strengthLevel}</p>
      <GameScene />
    </div>
  );
}

export default Quest;