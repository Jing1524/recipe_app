import Recipes from "@/components/Recipes";
import Header from "@/components/Header";


export default function Home() {
  return (
    <main className="flex w-screen flex-col items-center justify-between p-10">
      <Header />
      <Recipes />
    </main>
  );
}