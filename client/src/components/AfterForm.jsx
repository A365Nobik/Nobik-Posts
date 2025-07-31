export default function AfterForm({
  children,
  question,
  hyperLink,
  href,
  handleClick,
  customStyle,
}) {
  return (
    <>
      <div
        className={`flex justify-center items-center gap-1 text-lg font-medium text-[var(--text-primary)] ${customStyle}`}
      >
        {children}
        <p>{question}</p>
        <a
          className="transition-colors text-[var(--text-primary)] hover:text-blue-500"
          href={href}
          onClick={handleClick}
        >
          {hyperLink}
        </a>
      </div>
    </>
  );
}
