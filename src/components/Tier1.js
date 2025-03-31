import { Icon } from "@iconify/react";

const Tier1 = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-none hover:translate-y-[-5px] transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="bg-[#8DC63F] text-white text-center py-6 rounded-t-lg">
        <h3 className="text-xl font-semibold ">Founding Agencies</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-normal mb-6">
          Ideal for leading agencies with proven regional success
        </p>

        {/* List of Benefits */}
        <ul className="space-y-4">
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#8DC63F] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
              Leading agency in communication, marketing, or tech
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#8DC63F] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
              Participate in PAAN governance
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#8DC63F] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
              Contribute to funding seed initiatives
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#8DC63F] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
              Mentor newer member agencies
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#8DC63F] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
              Help shape the network’s strategic direction
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tier1;
