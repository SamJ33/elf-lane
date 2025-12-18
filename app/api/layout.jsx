export const metadata = {
  title: "Secret Santa Deduction Game",
  description: "Guess who your Santa is and rate gifts!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#071f1a] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
