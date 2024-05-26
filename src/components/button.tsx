import Link from "next/link";
import React from "react";

interface MyProps {
  name: string;
  link: string;
  styles: string;
}
const Mybutton = ({ link, name, styles }: MyProps) => {
  return (
    <Link
      className={`p-4 h-40 flex justify-center items-center font-extrabold rounded-md text-white text-2xl w-96 text-center cursor-pointer ${styles}`}
      href={link}
    >
      {name}
    </Link>
  );
};

export default Mybutton;
