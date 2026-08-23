import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen  bg-gray-9000 flex flex-col">
      <Header />
      <main className="mt-30 flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
