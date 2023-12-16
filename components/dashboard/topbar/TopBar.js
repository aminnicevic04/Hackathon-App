"use client";
import { Add, ElectricBolt, HomeOutlined } from "@mui/icons-material";
import TopBarCard from "./TopBarCard";
import useDialog from "../../../lib/hooks/useDialog";
import Dialog from "../../../components/shared/ui/Dialog";
import AddDeviceForm from "./AddDeviceForm";

const TopBar = ({ data }) => {
  const { dialogs, closeDialog, openDialog } = useDialog({
    add_devices: { isOpen: false },
  });
  const ukupnaPotrosnja = data.ukupnaPotrosnja;
  const prosecnaPotrosnja = data.prosecnaPotrosnja;
  const co2Potrosnja = data.co2Potrosnja;
  const troskoviEnergije = data.troskoviEnergije;

  return (
    <section>
      <Dialog
        isOpen={dialogs.add_devices.isOpen}
        closeDialog={() => closeDialog("add_devices")}
      >
        <AddDeviceForm closeDialog={closeDialog} />
      </Dialog>
      <div className="flex justify-between items-center">
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
        <div>
          <button
            onClick={() => openDialog("add_devices")}
            className="bg-blue-600 p-3 rounded-lg flex gap-3 items-center text-white"
          >
            Dodaj Uredjaj
            <Add style={{ color: "#fff" }} />
          </button>
        </div>
      </div>
      <div className="mb-3 mt-7 grid grid-cols-1 items-center gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TopBarCard
          title={ukupnaPotrosnja.title}
          data={`${ukupnaPotrosnja.value} kW/h`}
          icon={<ElectricBolt style={{ color: "#fff" }} />}
        />
        <TopBarCard
          title={prosecnaPotrosnja.title}
          data={`${prosecnaPotrosnja.value} kW/h`}
          icon={<ElectricBolt style={{ color: "#fff" }} />}
        />
        <TopBarCard
          title={co2Potrosnja.title}
          data={`${co2Potrosnja.value} kg`}
          icon={<ElectricBolt style={{ color: "#fff" }} />}
        />
        <TopBarCard
          title={troskoviEnergije.title}
          data={`${troskoviEnergije.value} din`}
          icon={<ElectricBolt style={{ color: "#fff" }} />}
        />
      </div>
    </section>
  );
};

export default TopBar;
