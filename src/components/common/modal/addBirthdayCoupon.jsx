import { IoCloseCircleOutline } from "react-icons/io5";
import Modal from '@/components/globals/Modal';

import BirthdayCouponForm from "../form/birthdayCouponForm";




const AddBirthdayCoupon = ({ handleCouponModal, addCoupon }) => {

    return (
        <Modal open={addCoupon} handleOpen={handleCouponModal} size={"sm"}>
            <div>
                <div className='bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-t-lg flex items-center justify-between p-4'>
                    <h4 className='text-base font-semibold text-black'>Add Coupon</h4>
                    <h5 className='cursor-pointer' onClick={handleCouponModal}><IoCloseCircleOutline className='w-8 h-8' /></h5>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    <BirthdayCouponForm handleCouponModal={handleCouponModal} />

                </div>
            </div>
        </Modal>
    )
}

export default AddBirthdayCoupon