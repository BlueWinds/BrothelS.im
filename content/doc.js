
Events.EventID = {
  //An event's "conditions" are things that it must match in order to trigger at all.
  // Actions and the potential events that could occur during them are matched up using tags. The likelyhood of the event (after all the conditions have passed), is the sum of each matching tag times its corresponding value on the action. So for example, if an action had the tags: { docks: 0.5, indoors: 0.5 }, and the event has these tags:
  tags: {
    docks: 0.1,
    slums: 0.2,
    indoors: 0.02
  }
  // then the final chance for this event would be 0.5 * 0.1 (docks) + 0.5 * 0.02 (indoors) = 0.06 = 6%.
};
