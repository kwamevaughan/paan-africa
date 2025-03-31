import { Icon } from "@iconify/react";

const Tier1 = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-none hover:translate-y-[-5px] transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="bg-[#00AEEF] text-white text-center py-6 rounded-t-lg">
        <h3 className="text-xl font-semibold ">Associate Members</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-normal mb-6">
        Best for startups and niche creative or tech specialists
        </p>

        {/* List of Benefits */}
        <ul className="space-y-4">
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#00AEEF] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Tailored for influencer marketers, UX designers, etc.
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#00AEEF] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Join networking and industry events
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#00AEEF] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Access skill-building workshops
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#00AEEF] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Subcontract on larger projects
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#00AEEF] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Grow within a supportive, innovative network
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tier1;
