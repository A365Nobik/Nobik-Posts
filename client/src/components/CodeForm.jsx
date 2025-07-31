import BasicForm from "./BasicForm";
import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
export default function CodeForm({
  title,
  codeError,
  user,
  setUserCode,
  userCode,
  children,
  setFormValid,
  setCodeError,
  endOfSession,
  customStyleMain
}) {
  const codeRefs = useRef([]);
  const [searchParams] = useSearchParams("");

  useEffect(() => {
    const codeParams = searchParams.get("code");
    if (codeParams) {
      setUserCode(codeParams);
      [...codeParams].forEach((char, index) => {
        codeRefs.current[index].value = char;
        codeRefs.current[5].focus();
      });
    }
  }, [searchParams, codeError, setUserCode]);

  useEffect(() => {
    if (userCode.length === 6) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    if (codeError && !endOfSession && userCode.length < 6) {
      setCodeError("");
    }
  }, [userCode, codeError, endOfSession, setCodeError, setFormValid]);

  const handlePast = (event) => {
    const paste = event.clipboardData.getData("text");
    setUserCode(paste);
    [...paste].forEach((char, index) => {
      codeRefs.current[index].value = char;
      codeRefs.current[5].focus();
    });
  };
  const swithNextInput = (event, index) => {
    if (event.target.value.length > 0) {
      codeRefs.current[index + 1].focus();
    }
  };

  const swithPrevInput = (event, index) => {
    if (event.key === "Backspace" && !event.target.value) {
      codeRefs.current[index - 1].focus();
    }
  };

  const handleChange = (event, index) => {
    codeRefs.current[index].value = event.target.value;
    const char = codeRefs.current.map((element) => element.value).join("");
    setUserCode(char);
    swithNextInput(event, index);
  };

  return (
    <>
      <BasicForm title={title} customStyleMain={customStyleMain}>
        <h1 className="text-2xl w-2/3 text-center ">
          Please enter the field with code that have send on {user?.email} email
        </h1>
        {codeError ? (
          <div className="border-2 border-red-500 p-1 font-medium rounded-md">
            {codeError}
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-center items-center gap-1.5">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                ref={(event) => (codeRefs.current[index] = event)}
                className="outline-0 bg-[var(--bg-primary)] w-17.5 h-17.5 rounded-md text-center text-3xl code-input"
                type="text"
                maxLength={1}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => swithPrevInput(event, index)}
                onPaste={(event) => handlePast(event)}
              />
            ))}
        </div>
        {children}
      </BasicForm>
    </>
  );
}
