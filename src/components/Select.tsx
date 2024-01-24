import React from "react";

interface SelectProps {
  label: string;
  values: number[] | string[];
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  values,
  value,
  onChange,
}: SelectProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-blue-500 font-bold">{label}</label>
      <select value={value} className="p-2 border border-blue-200 rounded-xl hover:cursor-pointer" onChange={onChange}>
        {values.map((value: string | number) => (
          <option value={value}>
            {typeof(value) == "string" ? value : value + " px"}
          </option>
        ))}
      </select>
    </div>
  );
}
