import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-primary/10 rounded-md animate-[pulse_2s_ease-in-out_infinite]",
        className
      )}
      style={{
        animation: "pulse 0.8s ease-in-out infinite",
      }}
      {...props}
    />
  );
}

export { Skeleton };
