import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/session";
import { redirect } from "next/navigation";
import TopBar from "../../components/dashboard/topbar/TopBar";
import TotalsConsumption from "../../components/dashboard/charts/TotalsConsumption";
import CategoryConsumption from "../../components/dashboard/charts/CategoryConsumption";
import AvgLastMonthConsumption from "../../components/dashboard/charts/AvgLastMonthConsumption";
import HoursConsumption from "../../components/dashboard/charts/HoursConsumption";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="py-9 px-3 flex flex-col gap-6">
      <div>
        <TopBar />
      </div>
      <div className="flex gap-3">
        <div className="basis-1/2 flex flex-col gap-3 rounded-xl p-6 h-64 bg-blue-900">
          <div>
            <h2 className="text-gray-400">Welcome back,</h2>
          </div>
          <div>
            <h2 className="text-2xl text-white font-bold">John Doe</h2>
          </div>
          <div>
            <h2 className="text-gray-400">Glad to see you again!</h2>
          </div>
        </div>
        <div className="basis-1/2 grow">
          <TotalsConsumption />
        </div>
        <div className="basis-1/2">
          <CategoryConsumption />
        </div>
      </div>
      <div className="flex">
        <div className="basis-1/2">
          <AvgLastMonthConsumption />
        </div>
        <div className="basis-1/2">
          <HoursConsumption />
        </div>
      </div>
    </main>
  );
}
