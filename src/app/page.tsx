import LogoutButton from "@/components/LogoutButton";
import AppButton from "../components/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      {/* <div className="flex  flex-col w-full"> */}

      <LogoutButton />
      <div className="flex gap-4">
        <AppButton
          name="New Request"
          styles="bg-blue-500 hover:bg-blue-400"
          link="requests/new"
        />
        <AppButton
          name="Send Email"
          styles="bg-green-500 hover:bg-green-400"
          link="requests"
        />
        {/* </div> */}
      </div>
    </div>
  );
}
