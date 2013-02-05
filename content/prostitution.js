"use strict";
Person.prostitution = {
  girlMaxCustomers: 6,
  minWhoreCustomers: 3,
  maxWhoreCustomers: 20,
  refuseDelta: {
    obedience: -1,
    happiness: -5
  },
  types: {
    soft: {
      r: 0.3,
      money: 100,
      girl: {
        endurance: -6,
        softExperience: 1
      }
    },
    hard: {
      r: 0.4,
      money: 150,
      girl: {
        endurance: -9,
        hardExperience: 1,
        softExperience: 0.2
      }
    },
    anal: {
      r: 0.5,
      money: 200,
      girl: {
        endurance: -14,
        analExperience: 1,
        hardExperience: 0.2,
        softExperience: 0.2
      }
    },
    fetish: {
      r: 0.7,
      money: 450,
      girl: {
        endurance: -16,
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
      pays: 0.8,
      minSatisfaction: 0.5,
      bad: { building: { reputation: -0.4 } },
      good: { building: { reputation: 0.7 } }
    },
    'Low Class': {
      minReputation: 10,
      maxReputation: 60,
      pays: 1.2,
      minSatisfaction: 0.6,
      bad: { building: { reputation: -0.5 } },
      good: { building: { reputation: 0.7 } }
    },
    'Middle Class': {
      minReputation: 25,
      maxReputation: 90,
      pays: 1.5,
      minSatisfaction: 0.7,
      bad: { building: { reputation: -0.5 } },
      good: { building: { reputation: 0.8 } }
    },
    'Upper Class': {
      minReputation: 60,
      maxReputation: 100,
      pays: 1.9,
      minSatisfaction: 1,
      bad: { building: { reputation: -0.7 } },
      good: { building: { reputation: 1 } }
    },
    'High Class': {
      minReputation: 80,
      maxReputation: 100,
      pays: 2.3,
      minSatisfaction: 1.3,
      bad: { building: { reputation: -1.3 } },
      good: { building: { reputation: 1.3 } }
    }
  }
};
