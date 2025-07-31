export default function InputWrapper({ children }) {
  return (
    <div className="flex justify-center items-center gap-1 text-[26px] bg-[var(--bg-primary)] text-[var(--text-primary)] p-1 rounded-xl border border-[var(--border-color)] transition-colors duration-300">
      {children}
    </div>
  );
}
