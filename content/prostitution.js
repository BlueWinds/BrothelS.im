"use strict";
Person.prostitution = {
  girlMaxCustomers: 5,
  minWhoreCustomers: 3,
  maxWhoreCustomers: 20,
  refuseDelta: {
    obedience: -1,
    happiness: -5
  },
  types: {
    soft: {
      r: 10,
      money: 100,
      girl: {
        endurance: -5,
        softExperience: 1
      }
    },
    hard: {
      r: 20,
      money: 150,
      girl: {
        endurance: -7,
        hardExperience: 1,
        softExperience: 0.2
      }
    },
    anal: {
      r: 30,
      money: 200,
      girl: {
        endurance: -9,
        analExperience: 1,
        hardExperience: 0.2,
        softExperience: 0.2
      }
    },
    fetish: {
      r: 40,
      money: 300,
      girl: {
        endurance: -10,
        fetishExperience: 1,
        analExperience: 0.2,
        hardExperience: 0.2,
        softExperience: 0.2
      }
    }
  },
  customerClass: {
    'Very Low Class': {
      minReputation: 0,
      maxReputation: 25,
      pays: 0.75,
      minSatisfaction: 0.2,
      bad: { reputation: -0.4 },
      good: { reputation: 0.7 }
    },
    'Low Class': {
      minReputation: 10,
      maxReputation: 60,
      pays: 0.9,
      minSatisfaction: 0.3,
      bad: { reputation: -0.5 },
      good: { reputation: 0.7 }
    },
    'Middle Class': {
      minReputation: 25,
      maxReputation: 90,
      pays: 1.2,
      minSatisfaction: 0.4,
      bad: { reputation: -0.5 },
      good: { reputation: 0.8 }
    },
    'Upper Class': {
      minReputation: 60,
      maxReputation: 100,
      pays: 1.3,
      minSatisfaction: 0.5,
      bad: { reputation: -0.7 },
      good: { reputation: 1 }
    },
    'High Class': {
      minReputation: 80,
      maxReputation: 100,
      pays: 2,
      minSatisfaction: 0.75,
      bad: { reputation: -1.3 },
      good: { reputation: 1.3 }
    }
  }
};
