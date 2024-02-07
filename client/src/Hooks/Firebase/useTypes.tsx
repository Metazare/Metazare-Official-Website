export interface ServiceType{
  title: string,
  description: string,
  tools: string[],
  imageUrl: string,
  status: string
}
export interface BasicInformation{
  aboutUs:string,
  email:string,
  location:string,
  phone:string,
  termsCondition:string
}
export interface FAQType{
  question:string,
  answer:string,
  sequence:number,
}
export interface TeamType{
  name:string,
  roles:string,
  description:string,
  gmail:string,
  image:string,
  github?:string,
  facebook?:string,
  website?:string,
}
export interface ProjectType{
  title:string,
  description:"",
  date:number,
  image:string,
  type: "Mobile Application"| "Web Application" | "Games" | "UI/UX Design"| "Logo Design",
  createdAt: number,
  id:any
}