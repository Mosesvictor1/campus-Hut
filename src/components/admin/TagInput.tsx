import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  color?: "orange" | "green";
}

export default function TagInput({ value, onChange, placeholder = "Add tag…", color = "orange" }: Props) {
  const [input, setInput] = useState("");

  const add = () => {
    const t = input.trim().replace(/,$/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    } else if (e.key === "Backspace" && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const chipClass = color === "green" ? "bg-campusGreen-600" : "bg-orange-600";

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-2 flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-campusGreen-600">
      {value.map((tag) => (
        <span
          key={tag}
          className={cn("inline-flex items-center gap-1 text-white text-xs px-2 py-0.5 rounded", chipClass)}
        >
          {tag}
          <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={add}
        placeholder={placeholder}
        className="flex-1 min-w-[100px] bg-transparent outline-none text-sm text-white placeholder:text-neutral-500"
      />
    </div>
  );
}
