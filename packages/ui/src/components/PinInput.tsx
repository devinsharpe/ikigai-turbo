"use client";

import {
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useState,
  useRef
} from "react";
import { twMerge } from "tailwind-merge";
import { PinContext } from "../context/PinContext";

export function PinNode({
  className,
  ...props
}: React.HTMLAttributes<Element>) {
  const id = useId();
  const context = useContext(PinContext);

  useEffect(() => {
    if (context) context.addInputs(id);
  }, [id]);

  const index = useMemo(() => {
    if (!context) return -1;
    return context.inputs.indexOf(id);
  }, [context]);

  const isFocused = useMemo(() => {
    if (!context) return false;
    return context.value.length === index && context.isActive;
  }, [context, index]);

  const indexValue = useMemo(() => {
    if (!context) return "•";
    if (context.value.length <= index) return "•";
    return context.value.charAt(index);
  }, [context, index]);

  return (
    <div
      {...props}
      id={id}
      data-index={index}
      data-active={isFocused}
      className={twMerge(
        "border w-full aspect-square font-bold flex items-center justify-center text-xl md:text-2xl",
        "data-[active=true]:ring data-[active=true]:ring-zinc-800/50 dark:data-[active=true]:ring-white/50",
        className
      )}
    >
      <span>{indexValue}</span>
    </div>
  );
}

function inputsReducer(
  inputs: string[],
  action: {
    type: "add";
    id: string;
  }
) {
  switch (action.type) {
    case "add":
      if (inputs.includes(action.id)) return inputs;
      return [...inputs, action.id];
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

interface PinInputProps {
  children: ReactNode;
  errorMessage?: string;
  value: string;
  onChange: (val: string) => void;
}

export default function PinInput({
  children,
  errorMessage,
  value,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & PinInputProps) {
  const [inputs, inputsDispatch] = useReducer(inputsReducer, []);
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddInput = (id: string) => {
    inputsDispatch({
      type: "add",
      id: id
    });
  };

  const handleInputFocus = () => {
    requestAnimationFrame(() => {
      if (inputRef.current === null) return;
      inputRef.current.setSelectionRange(value.length + 1, value.length + 1);
    });
  };

  const checkFocusStatus = () => {
    setHasFocus(
      inputRef.current !== null && document.activeElement === inputRef.current
    );
  };

  return (
    <PinContext.Provider
      value={{
        isActive: hasFocus,
        inputs,
        addInputs: handleAddInput,
        value
      }}
    >
      <div className="relative">
        <input
          {...props}
          type="text"
          maxLength={inputs.length}
          ref={inputRef}
          className="absolute inset-0 opacity-0"
          value={value}
          onBlur={checkFocusStatus}
          onFocus={() => {
            checkFocusStatus();
            handleInputFocus();
          }}
          onChange={(e) => onChange(e.target.value)}
        />
        {children}
      </div>
      {errorMessage && (
        <p className="text-sm mt-1 text-rose-800 dark:text-rose-100">
          {errorMessage}
        </p>
      )}
    </PinContext.Provider>
  );
}
