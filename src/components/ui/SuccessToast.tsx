import { CircleCheck } from "lucide-react";
import { type FunctionComponent } from "react";

type SuccessToastProps = {
  title: string;
  description?: string;
};

export const SuccessToast: FunctionComponent<SuccessToastProps> = ({ title, description }) => {
  return (
    <div className="bg-primary text-primary-foreground dark:bg-background dark:text-foreground flex w-[calc(var(--spacing)*110)] items-start gap-3 space-y-2 rounded-xl border px-4 py-5 font-[family-name:var(--font-inter)]">
      <div className="size-8 shrink-0 rounded-full border-4 border-green-500/20 p-0.5">
        <CircleCheck className="size-full text-green-500" />
      </div>
      <section className="space-y-1">
        <h5 className="text-sm font-medium tracking-wide">{title}</h5>
        {description && <p className="text-sm text-white/60 dark:text-white/50">{description}</p>}
      </section>
    </div>
  );
};
