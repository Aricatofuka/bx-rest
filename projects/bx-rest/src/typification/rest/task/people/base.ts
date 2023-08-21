export interface iBXRestTaskPeople extends iBXRestBaseTaskPeople{
  id:number,
}

export interface iBXRestHttpTaskPeople extends iBXRestBaseTaskPeople{
  id: string,
}

export interface iBXRestBaseTaskPeople{
  name: string,
  link: string,
  icon: string,
  workPosition: string
}
