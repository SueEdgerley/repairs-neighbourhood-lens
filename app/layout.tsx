import "./globals.css";

export const metadata = {
  title: "Repairs - Neighbourhood Lens",
  description: "Resident repairs reporting app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}