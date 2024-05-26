"use client";
import { ILink } from "@/contants";
import { unstable_noStore } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { token: string };
}

export default function VerifyLink({ params }: Props) {
  const { token } = params;
  const [linkData, setLinkData] = useState<ILink | null>(null);
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
      console.log("token 1",params)
    const fetchLinkData = async () => {
        console.log("token2 ",token)
        if (token) {
          console.log("token3")
        try {
            unstable_noStore();
          const response = await fetch(`/api/verifyLinks?token=${token}`);
          console.log("response : ",response);
          const data = await response.json();
          if (response.ok) {
            setLinkData(data.linkData);
            setMessage("Link is valid");
          } else {
            setMessage(data.error || "Error verifying link");
          }
        } catch (error) {
          console.error("Error fetching link data:", error);
          setMessage("Error fetching link data");
        }
      } else {
        setMessage("Token not found");
      }
    };

    fetchLinkData();
  }, [token]);

  return (
    <div>
      <h1>Verification Status</h1>
      <p>{message}</p>
      {linkData && (
        <div>
          <p>User ID: {linkData.userId}</p>
          <p>Expiry: {linkData.expiry}</p>
        </div>
      )}
    </div>
  );
}
