import { FullMessageType } from "@/app/types";
import React, { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  handleMenu: () => void;
  className?: string;
  data: FullMessageType;
};

const ContextMenu = ({ isOpen, handleMenu, className, data }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    console.log(e.target);
    console.log(menuRef.current?.contains(e.target as Node));
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      handleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    handleMenu();
  };
  return (
    <>
      <div className={className} ref={menuRef}>
        {isOpen && (
          <div className="border  border-gray-400 rounded-lg p-1 w-44">
            <ul className="rounded-lg">
              <li
                className="hover:bg-gray-100 text-center  transition-colors rounded-md p-2"
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ContextMenu;
