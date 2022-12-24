export type Record = {
	year: number,
	month: number,
	day: number,
	minuteTime: number,
	comment?: string,
}


export type Skill = {
	skillNo: number | undefined,
	categoryId: number,
	item1: string,
	item2: string,
	comment: string
}


export type SkillCategory = {
	categoryId: number,
	categoryName: string
}