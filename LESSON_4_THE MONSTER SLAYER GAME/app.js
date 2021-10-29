function getRandomValue(min, max) { /* Function to calculate the impact of the attack made. */
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  computed: { /* This is a special vue function. */
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: { /* Special vue function which keeps a watch on each activity happening in the app. */
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Monster lost
        this.winner = 'player';
      }
    },
  }, 
  methods: { /* Methods component in vue where all your methods are defined.*/
    startGame() { /* This function restarts the game. */
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    attackMonster() { /* This function updates the last calculated health of the monster. */
      this.currentRound++;
      const attackValue = getRandomValue(6, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue); /* Updates the log message. */
      this.attackPlayer(); /* Implementing our first core feature. */
    },
    attackPlayer() { /* This function updates the last calculated health of the player. */
      const attackValue = getRandomValue(8, 17);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue); /* Updates the log message. */
    },
    specialAttackMonster() { /* This function enables the special attach feature for 
    the player to be made on monster. */
      this.currentRound++;
      const attackValue = getRandomValue(9, 22);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue); /* Updates the log message. */
      this.attackPlayer(); /* Implementing our first core feature. */
    },
    healPlayer() { /* This function heals the player. */
      this.currentRound++;
      const healValue = getRandomValue(9, 22);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue); /* Updates the log message. */
      this.attackPlayer(); /* Implementing our first core feature. */
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({ /* unshift pushes the log to the start of the array so that the log keep 
      on updating. */
        actionBy: who,
        actionType: what,
        actionValue: value
      }); /* should be send as an object. */
    }
  },
});

app.mount('#game');
