export interface ServiceType{
  title: string,
  description: string,
  tools: string[],
  imageUrl: string,
  status: string
}
export interface EmailUsType{
  name:string,
  email:string,
  message:string,
  createdAt:number,
}
export interface BasicInformation{
  aboutUs:string,
  email:string,
  location:string,
  phone:string,
  termsCondition:string,
  facebook:string,
  github:string,
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
  link:string,
  title:string,
  description:string,
  date:number,
  image:string,
  type: "Mobile Application"| "Web Application" | "Games" | "UI/UX Design"| "Logo Design",
  createdAt: number,
  id:any
}