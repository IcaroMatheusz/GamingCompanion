import MainLayout from "../components/MainLayout";
import GameList from "../components/GameList";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

function Dashboard() {
  


  return (
    <>
      <MainLayout>

        <SearchBar />

        <GameList />
      </MainLayout>

      <Footer />
    </>
  );
}

export default Dashboard;
