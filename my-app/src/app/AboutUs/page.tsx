import React from 'react';
import Header from '@/components/Header'
import Footer from '@/components/footer'
import Product from '@/components/product'

const AboutUsPage: React.FC = () => {
    return (
        <div >
            <Header />

            <div className="content">
                <div className="picture">
                    {/* Add your picture component here */}
                </div>

                <div className="text">
                <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl dark:text-white"  >We invest in the world’s potential</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
       
        </div>
    </div>
</section>
                </div>

                <div className="catalogue flex flex-wrap">
                    <h2 className="w-full">Catalogue of Available Products</h2>
                    <Product  />
                    <Product  />
                    <Product/>
                    {/* Add more Product components as needed */}
                </div>
                </div>

            <Footer />
        </div>
    );
};

export default AboutUsPage;
