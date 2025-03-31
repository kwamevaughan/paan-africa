import { Icon } from "@iconify/react";

const Tier1 = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-none hover:translate-y-[-5px] transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="bg-[#F26522] text-white text-center py-6 rounded-t-lg">
        <h3 className="text-xl font-semibold ">Full Members</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-normal mb-6">
        Perfect for established agencies seeking collaborative growth
        </p>

        {/* List of Benefits */}
        <ul className="space-y-4">
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F26522] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Access to co-bidding opportunities
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F26522] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Participate in PAAN training programs
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F26522] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Eligible for PAAN certification
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F26522] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Collaborate on regional and global projects
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F26522] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
            Connect with partner agencies and clients
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tier1;
