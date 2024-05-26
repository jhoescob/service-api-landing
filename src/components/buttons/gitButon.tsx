"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface GitButtonProps {
  link: string;
}

// Function to handle click and send user to a new window with the GitHub repository
const handleClick = (link: string) => {
  if (!link) return;
  window.open(link, "_blank");
};

export const GitButton = ({ link }: GitButtonProps) => {
  return (
    <Button
      className="hover:bg-slate-500 w-fit"
      onClick={() => handleClick(link)}
    >
      <Github /> Github Repository
    </Button>
  );
};
