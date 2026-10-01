import type { PropsWithChildren, ReactNode } from 'react';

export function ToolHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="tool-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function ToolPanel({
  title,
  actions,
  children,
}: PropsWithChildren<{ title: string; actions?: ReactNode }>) {
  return (
    <section className="tool-panel">
      <div className="panel-heading">
        <span>{title}</span>
        <div className="actions">{actions}</div>
      </div>
      {children}
    </section>
  );
}

export function Button({
  children,
  variant = 'secondary',
  ...props
}: PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
  }
>) {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}

export function CopyButton({ value }: { value: string }) {
  return (
    <Button
      onClick={() => void navigator.clipboard.writeText(value)}
      disabled={!value}
    >
      Copy
    </Button>
  );
}

export function ErrorNotice({ message }: { message: string }) {
  return message ? <div className="error-notice">{message}</div> : null;
}
