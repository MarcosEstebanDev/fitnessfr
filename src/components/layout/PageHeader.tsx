interface Props {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: Props) => (
  <header className="text-center mt-4">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent bg-size-200 animate-gradient-move">
      {title}
    </h1>
    {subtitle && <p className="text-indigo-100 mt-2">{subtitle}</p>}
  </header>
);