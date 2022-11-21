interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: AuthLayoutProps) {
  return <main className="grid min-h-screen grid-cols-2">{children}</main>;
}
