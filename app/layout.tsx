import "./globals.css";

export const metadata = {
  title: "Report a Repair Concern | Croydon Housing",
  description:
    "Tell Croydon Housing about a repair concern — poor workmanship, missed appointments, delays or unresolved issues.",
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