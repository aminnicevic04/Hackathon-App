import { ElectricBolt, HomeOutlined } from "@mui/icons-material";
import TopBarCard from "./TopBarCard";
import { data } from "../../../data/index.js";

const TopBar = () => {
  return (
    <section>
      <div>
        <div className="flex items-center gap-3">
          <div>
            <HomeOutlined style={{ color: "#fff" }} />
          </div>
          <div className="mt-[0.3em]">
            <h2 className="text-xs text-white">Dashboard</h2>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold mt-[6px]">Dashboard</h2>
        </div>
      </div>
      <div className="mb-3 mt-7 grid grid-cols-1 items-center gap-3 lg:grid-cols-4">
        {data[0].infoCards.map(({ title, value }) => (
          <TopBarCard
            key={title}
            title={title}
            data={value}
            icon={<ElectricBolt style={{ color: "#fff" }} />}
          />
        ))}
      </div>
    </section>
  );
};

export default TopBar;
