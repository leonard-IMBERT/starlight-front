type Magic = {
  id: string,
  Name: string,
  Constelation: string,
  StarChart: { x: number, y: number },
  Spell: string,
  Levels: [{ Level: number, Description: string }],
  OmCombo: string | null,
};
export default Magic;
