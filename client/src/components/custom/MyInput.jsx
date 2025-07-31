export default function MyInput({
  label,
  autoComplete,
  handler,
  blur,
  type,
  dirty,
  error,
  children,
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="flex justify-between text-xl">
          <label htmlFor={label.toLowerCase()}>{label}</label>
          {children}
        </span>
        <input
          required={true}
          autoComplete={autoComplete}
          type={type}
          name={label.split(" ").join("").toLowerCase()}
          id={label.toLowerCase()}
          onChange={handler}
          onBlur={blur}
          className="outline-0 font-medium text-[26px] bg-[var(--bg-primary)] rounded-xl w-full overflow-hidden px-2 border-2 border-[var(--border-color)] transition-all focus:border-blue-600"
        />
      </div>
      {dirty && error ? <div className="text-red-500">{error}</div> : ""}
    </>
  );
}
