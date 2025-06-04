import { Icon } from "@iconify/react";
import Image from "next/image";

const Tier1 = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-none hover:translate-y-[-5px] transition-all duration-300 ease-in-out relative">
      {/* Badge */}
      <div className="absolute -top-4 left-4 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center">
        <Image
          src="/assets/images/associate-member-badge.png"
          width={28}
          height={28}
          alt="badge"
        />
      </div>
      
      {/* Header */}
      <div className="bg-[#C0614D] text-white text-center py-6 rounded-t-lg">
        <h3 className="text-xl font-semibold ">Associate Members</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-normal mb-6">
          Tailored for Small to medium agencies
        </p>

        {/* List of Benefits */}
        <ul className="space-y-4">
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#C0614D] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
               Access to PAAN-certified freelancers
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#C0614D] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Pan African Media Rate Cards
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#C0614D] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Knowledge transfer from larger agency partners
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#C0614D] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Suncontract on larger projects
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#C0614D] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
               Grow with a supportive and innovative network
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tier1;
