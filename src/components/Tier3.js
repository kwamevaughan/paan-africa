import { Icon } from "@iconify/react";
import Image from "next/image";

const Tier3 = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-none hover:translate-y-[-5px] transition-all duration-300 ease-in-out relative">
      {/* Badge */}
      <div className="absolute -top-3 sm:-top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-md flex items-center justify-center">
        <Image
          src="/assets/images/associate-member-badge.png"
          width={24}
          height={24}
          alt="badge"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      </div>
      
      {/* Header */}
      <div className="bg-[#C0614D] text-white text-center py-4 sm:py-6 rounded-t-lg">
        <h3 className="text-lg sm:text-xl font-semibold">Associate Members</h3>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <p className="font-normal mb-4 sm:mb-6 text-sm sm:text-base">
          Tailored for Small to medium agencies
        </p>

        {/* List of Benefits */}
        <ul className="space-y-3 sm:space-y-4">
          <li className="flex items-start gap-2 sm:gap-3 border-b border-dashed border-gray-300 pb-3 sm:pb-4">
            <Icon
              icon="mdi:check-circle"
              width="20"
              height="20"
              className="text-[#C0614D] flex-shrink-0 mt-0.5"
            />
            <p className="text-xs sm:text-sm leading-tight">
              Access to PAAN-certified freelancers
            </p>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 border-b border-dashed border-gray-300 pb-3 sm:pb-4">
            <Icon
              icon="mdi:check-circle"
              width="20"
              height="20"
              className="text-[#C0614D] flex-shrink-0 mt-0.5"
            />
            <p className="text-xs sm:text-sm leading-tight">
              Pan African Media Rate Cards
            </p>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 border-b border-dashed border-gray-300 pb-3 sm:pb-4">
            <Icon
              icon="mdi:check-circle"
              width="20"
              height="20"
              className="text-[#C0614D] flex-shrink-0 mt-0.5"
            />
            <p className="text-xs sm:text-sm leading-tight">
              Knowledge transfer from larger agency partners
            </p>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 border-b border-dashed border-gray-300 pb-3 sm:pb-4">
            <Icon
              icon="mdi:check-circle"
              width="20"
              height="20"
              className="text-[#C0614D] flex-shrink-0 mt-0.5"
            />
            <p className="text-xs sm:text-sm leading-tight">
              Subcontract on larger projects
            </p>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
            <Icon
              icon="mdi:check-circle"
              width="20"
              height="20"
              className="text-[#C0614D] flex-shrink-0 mt-0.5"
            />
            <p className="text-xs sm:text-sm leading-tight">
              Grow with a supportive and innovative network
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tier3;
