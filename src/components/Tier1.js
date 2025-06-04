import { Icon } from "@iconify/react";
import Image from "next/image";

const Tier1 = () => {
  return (
    <div className="relative bg-white rounded-lg shadow-md hover:shadow-none hover:translate-y-[-5px] transition-all duration-300 ease-in-out">
     
      {/* Badge */}
      <div className="absolute -top-4 left-4 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center">
        <Image
          src="/assets/images/gold-member.png"
          width={28}
          height={28}
          alt="badge"
        />
      </div>

      {/* Header */}
      <div className="bg-[#F2B706] text-white text-center py-6 rounded-t-lg">
        <h3 className="text-xl font-semibold ">Gold Members</h3>
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
              className="text-[#F2B706] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Access to exclusive RFPs/Tenders/RFQs 
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F2B706] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Co-bidding opportunities
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F2B706] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Tech Reseller Program
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F2B706] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Cross-Border Client Match-Making
            </p>
          </li>
          <li className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-4">
            <Icon
              icon="mdi:check-circle"
              width="24"
              height="24"
              className="text-[#F2B706] flex-shrink-0"
            />
            <p className=" text-sm leading-tight">
                Market insights & Data for Africa
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tier1;
