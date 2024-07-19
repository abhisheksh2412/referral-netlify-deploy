import { Check, Mail } from "lucide-react";
import GlobalInput from "../globals/globalInput";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSellerStores, SendInvitation } from "@/store/slices/seller";
import Swal from "sweetalert2";

export default function Invite({ handleModel, inviteModal }) {
  const user = useSelector((state) => state.auth.data);
  const stores = useSelector((state) => state.seller);
  const [email, setEmail] = useState("");
  const [selected, setSelcted] = useState(null);
  const dispatch = useDispatch();
  const getSellerStores = useCallback(() => {
    dispatch(GetSellerStores(user?.id));
  }, [dispatch, user?.id]);

  //   Get all stores of seller
  useEffect(() => {
    getSellerStores();
  }, [getSellerStores]);

  //   Send invitations function
  const handleInvitation = async (email, storeId) => {
    if (selected === null) {
      return Swal.fire({
        icon: "error",
        text: "Please select the Store",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    const formdata = {
      email: email,
      store_id: storeId,
    };
    await dispatch(SendInvitation(formdata));
    handleModel();
  };
  return (
    <div className="p-4">
      <span>
        <label htmlFor="email" className="text-xs font-semibold text-gray-700 ">
          Email Address
        </label>
        <GlobalInput
          type="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email address"
          parentClassName="border rounded-md p-2 flex gap-2"
          inputClassName="outline-none text-sm text-gray-700"
          leftIcon={<Mail className="text-gray-500" size={18} />}
        />
      </span>

      {/* Store List  */}

      <div className="flex flex-col gap-2 py-4 max-h-[60vh] overflow-auto">
        {/* store card */}
        {stores?.stores?.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex gap-2 p-2 border rounded-md hover:bg-pink-50 hover:shadow-md transition-all cursor-pointer",
              selected?.id === item?.id && "bg-green-50"
            )}
            onClick={() => {
              setSelcted(item);
            }}
          >
            <img
              className="w-20 h-20 rounded-md p-2 object-contain shadow-custom-inset bg-white"
              src={item?.stores?.qr_code_img_path}
              alt="qrcode"
            />
            <div className="flex flex-col gap-1 w-full">
              <span className="flex justify-between w-full">
                <h1 className="text-sm text-gray-800 font-semibold">
                  {item?.stores?.name}
                </h1>
                {selected?.id === item?.id && (
                  <Check size={18} className="text-green-700" />
                )}
              </span>
              <p className="pt-1 text-xs text-gray-800">
                {item?.stores?.description}
              </p>
              <p className="text-xs text-gray-800">
                {item?.stores?.street} , {item?.stores?.town},{" "}
                {item?.stores?.postal_code}
              </p>
              <p className="text-xs text-gray-800">
                {item?.stores?.mobile_number}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleInvitation(email, stores?.stores[0]?.stores?.id)}
        className="text-base p-2 px-3 w-full rounded-md bg-blush-red text-white hover:bg-pink-500 transition-colors"
      >
        Send Invitation
      </button>
    </div>
  );
}
