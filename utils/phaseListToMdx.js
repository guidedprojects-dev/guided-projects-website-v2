export default function phaseListToMdx(phases = []) {
  const stringifiedPhaseList = [];

  for (let i = 0; i < phases.length; i++) {
    try {
      const stringifiedPhase = await renderToString(phases[i].content);

      stringifiedPhaseList.push(stringifiedPhase);
    } catch (err) {}
  }

  const phaseList = phases.map((phase, i) => ({
    ...phase,
    content: stringifiedPhaseList[i],
  }));

  return phaseList;
}
