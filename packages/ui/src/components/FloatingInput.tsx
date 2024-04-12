import { twMerge } from "../lib/utils";

interface FloatingFieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode;
}

export function FloatingFieldset({
  children,
  className,
  ...props
}: FloatingFieldsetProps) {
  return (
    <fieldset {...props} className={twMerge("relative", className)}>
      {children}
    </fieldset>
  );
}

interface FloatingLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function FloatingLabel({
  children,
  className,
  ...props
}: FloatingLabelProps) {
  return (
    <label
      {...props}
      className={twMerge(
        "absolute -top-3 left-2 bg-white px-1 text-sm text-zinc-600 transition-all",
        "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400",
        "peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-zinc-600",
        "dark:bg-zinc-800 dark:peer-focus:text-white",
        className
      )}
    >
      {children}
    </label>
  );
}

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  placeholder: string;
}

export function FloatingInput({
  className,
  errorMessage,
  ...props
}: FloatingInputProps) {
  return (
    <>
      <input
        {...props}
        data-error={!!errorMessage}
        className={twMerge(
          "peer h-12 w-full rounded border border-zinc-300 p-2 placeholder-transparent",
          "bg-transparent",
          "focus:border-zinc-600 focus:outline-none focus:ring-0",
          "dark:focus:border-white",
          "data-[error=true]:border-rose-600",
          className
        )}
      />
      {errorMessage && (
        <p className="text-sm mt-1 text-rose-800 dark:text-rose-100">
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default {
  Fieldset: FloatingFieldset,
  Input: FloatingInput,
  Label: FloatingLabel
};
