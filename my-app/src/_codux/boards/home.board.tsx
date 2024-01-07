import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'home ',
    Board: () => <div>
        <div>
            <header>
            </header>
            <div className="flex w-full flex-col space-y-8 bg">
                <div className="w-full bg-red-600 pb-60 relative">
                    <h1 className="text-6xl font-thin text-white absolute right-0 bottom-0 mb-8 mr-8 animate-fade-up animate-ease-in">
                        DLabs 3D Printing
                    </h1>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold">Testimonials</h2>
                    <p className="text-lg">
                        Helloed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo.
                    </p>
                    <p className="text-lg">
                        Paul Bratsed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                    </p>
                    <p className="text-lg">Kit Kat</p>
                </div>
                <div className="flex">
                    <div className="flex-grow">
                        <div className="flex flex-col space-y-4">
                            <p className="text-base md:text-lg pl-2 pr-2 pt-4">
                                Discover Next.js. The React Framework for Production: Explore
                                the future of web development with Next.js, the cutting-edge
                                React framework.
                            </p>
                            <div className="flex space-x-4 pl-2 pr-2">

                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="space-y-8"></div>

                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold">Join our community.</h2>
                    <p className="text-lg">
                        Doloribus consectetur quasi ipsa quo neque culpa blanditiis ducimus
                        recusandae a veritatis optio cumque, in harum ad nam!
                    </p>
                    <form>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-500 rounded-md"
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-500 rounded-md"
                            placeholder="Last Name"
                            required
                        />
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-500 rounded-md"
                            placeholder="Organization"
                            required
                        />
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-500 rounded-md"
                            placeholder="Email"
                            required
                        />
                        <textarea
                            className="w-full px-4 py-2 border border-gray-500 rounded-md"
                            placeholder="Message"
                            required
                            rows={4}
                        ></textarea>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-gray-500 rounded-md text-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                <div>Product 1</div>
                <div>Product 2</div>
                <div>Product 3</div>
                <div>Product 4</div>
            </div>
        </div>
    </div>,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 806,
        canvasHeight: 148,
        windowWidth: 1024
    }
});
