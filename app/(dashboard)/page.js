import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/session";
import { redirect } from "next/navigation";
import { fetchUser } from "../../lib/actions/user.actions";
import DevicesList from "../../components/dashboard/devices/DevicesList";
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

  const user = await fetchUser(session?.user.id);
  const userData = JSON.parse(JSON.stringify(user));

  return (
    <main className="py-9 px-3 flex flex-col gap-6">
      <div>
        <TopBar data={userData} />
      </div>
      <div className="flex gap-3 max-2xl:flex-col">
        <div className="basis-1/2 flex justify-between rounded-xl p-6 h-64 card max-2xl:basis-full">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-gray-400">Dobrodosli</h2>
            </div>
            <div>
              <h2 className="text-2xl text-white font-bold">{user.name}</h2>
            </div>
            <div>
              <h2 className="text-gray-400">Lepo vas je ponovo videti</h2>
            </div>
          </div>
        </div>
        <div className="flex gap-3 max-xl:flex-col">
          <div className="basis-1/2 growmax-xl:basis-full">
            <AvgLastMonthConsumption data={user.prosecnaPotrosnjaMeseca} />
          </div>
          <div className="basis-1/2 max-xl:basis-full">
            <HoursConsumption data={user.prosecnaPotrosnjaSatima} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
        <div className="basis-1/2">
          <TotalsConsumption data={user.ukupnaPotrosnjaEnergetskih} />
        </div>
        <div className="basis-1/2">
          <CategoryConsumption data={user.potrosnjaPoKategorijama} />
        </div>
      </div>
      <DevicesList devices={userData.devices} />
    </main>
  );
}
