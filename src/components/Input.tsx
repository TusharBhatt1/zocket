interface InputProps {
  label: string;
  value?: string;
  type: string;
  checked?:boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, value, type, onChange,checked }: InputProps) {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label className="text-blue-500 font-bold ">
       {label}
       </label>
        <input
        className={`w-full border-2 border-blue-200 p-3 rounded-xl hover:cursor-pointer `}
          type={type}
          checked={checked}
          value={value}
          onChange={onChange}
        />
    </div>
  );
}
