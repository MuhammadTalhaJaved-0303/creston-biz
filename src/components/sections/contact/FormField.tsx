import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { InquiryField } from "@/lib/inquiry-schema";

type Common = {
  readonly name: InquiryField;
  readonly label: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly className?: string;
};

type InputField = Common & {
  readonly kind?: "input";
  readonly type?: "text" | "email" | "tel";
  readonly autoComplete?: string;
};

type SelectField = Common & {
  readonly kind: "select";
  readonly options: ReadonlyArray<string>;
};

type TextareaField = Common & {
  readonly kind: "textarea";
  readonly rows?: number;
};

export type FormFieldProps = InputField | SelectField | TextareaField;

const ID_PREFIX = "inquiry";

type ControlProps = FormFieldProps & { readonly id: string; readonly describedBy?: string };

function Control(props: ControlProps) {
  const { id, name, required, error, defaultValue, placeholder, describedBy } = props;
  const shared = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  } as const;

  if (props.kind === "select") {
    return (
      <span className="relative block">
        <select {...shared} className="input-box appearance-none pr-11" defaultValue={defaultValue ?? ""}>
          <option value="" disabled={required}>
            {placeholder}
          </option>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.75}
          className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2 text-ink-3"
        />
      </span>
    );
  }

  if (props.kind === "textarea") {
    return (
      <textarea
        {...shared}
        rows={props.rows ?? 4}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input-box min-h-[7.5rem] flex-1 resize-y leading-relaxed"
      />
    );
  }

  return (
    <input
      {...shared}
      type={props.type ?? "text"}
      autoComplete={props.autoComplete}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="input-box"
    />
  );
}

/** Label, control and inline error for one inquiry field. */
export function FormField(props: FormFieldProps) {
  const { name, label, required, error, className } = props;
  const id = `${ID_PREFIX}-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-blue">
            *
          </span>
        ) : null}
      </label>
      <Control {...props} id={id} describedBy={error ? errorId : undefined} />
      {error ? (
        <p id={errorId} className="text-caption font-medium text-[#d92d20]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
