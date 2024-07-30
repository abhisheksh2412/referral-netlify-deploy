import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { BithdayCouponFormValidation } from "@/validators/comboValidation";
import { useStateManager } from '@/providers/useStateManager';
import Image from 'next/image'




export default function BirthdayCouponForm({ handleCouponModal }) {
    const [previewImage, setPreviewImage]  = useState(null)
    const { couponList, setCouponList } = useStateManager()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("coupon_image", file);
        if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
          } else {
            setPreviewImage(null);
          }
    };
    const formik = useFormik({
        initialValues: {
            coupon_name: '',
            points: '',
            validity: '',
            coupon_image: null
        },
        enableReinitialize: true,
        validationSchema: BithdayCouponFormValidation,
        onSubmit: async (values) => {
            await setCouponList([...couponList, values])
            handleCouponModal()

        }
    })


    return (
        <div>
            <div className='p-4'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-0 w-full">
                        <p className="text-base font-semibold mb-2 text-black">Upload Attachment</p>
                        <label htmlFor="coupon-upload" className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="coupon-upload" type="file" onChange={handleFileChange} name="coupon_image" className="hidden" />
                        </label>
                        {formik.touched.coupon_image && formik.errors.coupon_image ? (
                            <p className="text-xs text-red-500 p-1">
                                {formik.errors.coupon_image}
                            </p>
                        ) : null}
                        {previewImage && (
                           

                        <Image
                        src={previewImage}
                        width={500}
                        height={500}
                         alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: 200 }}
                      />

                        )}
                    </div>

                    <div className="mt-6 w-full">
                        <p className="text-base font-semibold mb-2 text-black">Coupon Name</p>
                        <input type="text" id="coupon_name" name="coupon_name" className="bg-gray-50 border  text-gray-900 text-sm rounded  block w-full p-2.5" placeholder="Enter Coupon Name" onChange={formik.handleChange}
                            value={formik.values.coupon_name} />
                        {formik.touched.coupon_name && formik.errors.coupon_name ? (
                            <p className="text-xs text-red-500 p-1">{formik.errors.coupon_name}</p>
                        ) : null}
                    </div>


                    <div className="mt-6 w-full">
                        <p className="text-base font-semibold mb-2 text-black">Points/Percentages</p>
                        <input type="text" id="points" name="points" className="bg-gray-50 border  text-gray-900 text-sm rounded  block w-full p-2.5" placeholder="Enter Points/Percentages" onChange={formik.handleChange}
                            value={formik.values.points} />
                        {formik.touched.points && formik.errors.points ? (
                            <p className="text-xs text-red-500 p-1">{formik.errors.points}</p>
                        ) : null}
                    </div>

                    <div className="mt-6 w-full">
                        <p className="text-base font-semibold mb-2 text-black">Validity Period of the Coupon</p>
                        <input type="date" id="validity" name="validity" className="bg-gray-50 border  text-gray-900 text-sm rounded  block w-full p-2.5" onChange={formik.handleChange} value={formik.values.validity} />
                        {formik.touched.validity && formik.errors.validity ? (
                            <p className="text-xs text-red-500 p-1">{formik.errors.validity}</p>
                        ) : null}
                    </div>

                    <div className="mt-8 w-full">
                        <button type="submit" className="text-white w-full bg-blush-red font-medium rounded-lg text-sm px-5 py-4 mb-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
