export default function OAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative container grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
