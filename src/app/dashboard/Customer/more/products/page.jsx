"use client"
import CustomerHeader from '@/components/customerdashboard/header/customerHeader'
import ProductsCard from '@/components/customerdashboard/more/productsCard'
import TabFiltter from '@/components/customerdashboard/more/tabFiltter'
import DashboardFooter from '@/components/dashboard/dashboardfooter/page'
import Modal from '@/components/globals/Modal'
import Container from '@/components/globals/container'
import TopHeader from '@/components/home/homeHeader/topheader'
import InnerBanner from '@/components/innerpagebanner/page'
import ProductDetails from '@/components/managerdashboard/products/ProductDetails'
import React, { useState } from 'react'

function MoreProduct() {
    const [selectedData, setSelectedData] = useState(null);
    const [detailsModal, setDetialsModal] = useState(null);
    const handleViewModal = (data) => {
        setDetialsModal(!detailsModal);
        setSelectedData(data);
    };


    const [showProduct, setShowProduct] = useState(false)
    const handleShowProduct = () => setShowProduct(!showProduct)


    const filterData = [{ name: "All", id: "1" }, { name: "Photography", id: "2" }, { name: "Photography", id: "3" }]
    const [active, setActive] = useState("1")
    return (
        <div>
            <TopHeader />
            <CustomerHeader />
            <InnerBanner title={"Products"} />
            <div className="p-28 px-12 mobile:py-6 mobile:p-4 bg-gray-100">
                <Container>
                    <TabFiltter tabs={filterData} active={active} setActive={setActive} />

                    <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">

                    <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>

                        <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                            <div onClick={handleShowProduct}>
                            <ProductsCard />
                            </div>
                        </div>


                    </div>

                </Container>

                <Modal  open={showProduct} handleOpen={handleShowProduct}>
                    <div>
                        <ProductDetails data={dummyData} />
                    </div>
                </Modal>
            </div>

            <DashboardFooter />
        </div>
    )
}

export default MoreProduct


const dummyData = {
    name: "Sample Product",
    quantity: 10,
    weight: 500, // assuming the weight is in grams
    path: "/images/sample-product.jpg", // path to the product image
    description: "This is a sample product used for demonstration purposes. It has a sleek design and is made from high-quality materials.",
    points: "Redeem Now",
};
