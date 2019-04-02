type Survivor = {
  Name: string,
  Description: string,
  Position: { x: number, y: number },
  Health: string,
  Items: string,
  Conditions: string | null,
  Jobs: string | null,
  id: string | null
}

export default Survivor;