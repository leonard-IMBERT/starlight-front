type Survivor = {
  Name: string,
  Description: string,
  Position: { x: number, y: number },
  Health: { current: number, max: number },
  Items: string[],
  Conditions: string | null,
  Jobs: [{ Name: string, Level: string }],
  id: string | null
}

export default Survivor;
