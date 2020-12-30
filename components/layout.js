export default function Layout({ children }) {
  return (
    <>
      <div className="mx-auto w-4/5 flex flex-col items-center">{children}</div>
      <footer className="h-20"></footer>
    </>
  );
}
