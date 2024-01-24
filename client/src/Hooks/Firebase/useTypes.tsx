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
