import Card from "../../../components/shared/ui/Card";

const TopBarCard = ({ title, data, icon }) => {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div>
            <p className="text-xs text-gray-400 whitespace-nowrap">{title}</p>
          </div>
          <div>
            <h2 className="text-xl text-white font-bold">{data}</h2>
          </div>
        </div>
        <div className="p-[0.8em] rounded-xl bg-[#0075ff] flex justify-center items-center">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default TopBarCard;
