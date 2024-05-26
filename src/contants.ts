import { NextResponse } from "next/server";

export const baseUrl = 'http://localhost:3000/api'

export enum RStatus{
    SUCCESS="successfully fetched",
    CREATED="successfully created",
    UPDATED="successfully updated",
    DELETED="successfully deleted"
}

export function Message(title:string,status:string){
    return `${title} ${status}`
}

export function erMessage(message:string){
    return message
}
// export const SUCCESS = "successfully fetched"
export function AResponse(
  data: any = [],
  message: String = "",
  status: number = 200
) {
  return NextResponse.json(
    {
      data,
      message,
    },
    { status }
  );
}

export interface ILink {
  id: number;
  userId: string;
  token: string;
  expiry: string;
}

export function getQSParamFromURL(
  key: string,
  url: string | undefined
): string | null {
  if (!url) return "";
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
