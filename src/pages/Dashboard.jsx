import MainLayout from "../components/MainLayout";
import GameList from "../components/GameList";
import SearchBar from "../components/SearchBar"

function Dashboard() {
  return (
    <>
      <MainLayout>

          <SearchBar />

          <GameList />

      </MainLayout>
    </>
  );
}

export default Dashboard;
