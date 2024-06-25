import { AppIcon } from "@ikigai/ui/components";
import { twMerge } from "@ikigai/ui/lib";
import Link from "next/link";

interface AuthHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function AuthHeader({
  className,
  title,
  ...props
}: AuthHeaderProps) {
  return (
    <div
      {...props}
      className={twMerge("flex w-full flex-col justify-center", className)}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded  text-zinc-600 hover:bg-zinc-100 focus:text-zinc-800 focus:outline-none focus:ring focus:ring-zinc-800/25 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:text-zinc-50 dark:focus:ring-white/50"
        >
          <AppIcon className="duration-500" />
        </Link>
        <h1 className="text-2xl font-semibold md:text-4xl">{title}</h1>
      </div>
      <h2 className="text-lg text-zinc-600 dark:text-zinc-300">
        Live life a little differently
      </h2>
    </div>
  );
}
