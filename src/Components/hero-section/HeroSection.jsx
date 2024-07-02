import React, { useState } from 'react';
import './heroSection.css';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('my course');

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement the search logic here
        console.log('Search Query:', searchQuery);
        console.log('Filter:', filter);
        // You can add the actual search functionality here
    };

    return (
        <section className="w-full">
            <div className="w-full h-[320px] bg-[url('src/assets/logo1.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">

                <div>

                    {/* <div>
                    <h1 className="text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Discover Your New Home</h1>
                </div>
                <div className="w-full mx-auto">
                    <form onSubmit={handleSearch} className="relative flex">
                        <select 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white dark:bg-gray-800 h-10 px-5 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 dark:border-gray-600 border-r-1 cursor-pointer max-h-10 overflow-y-hidden"
                        >
                        
                            <option className="font-medium cursor-pointer" value="price"></option>
                            <option className="font-medium cursor-pointer" value="price">Price</option>
                            <option className="font-medium cursor-pointer" value="my course">My Course</option>
                            <option className="font-medium cursor-pointer" value="name">Name</option>
                        </select>
                        <input 
                            type="search" 
                            name="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="bg-white dark:bg-gray-800 h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 dark:border-gray-600"
                            autoComplete="off" 
                            spellCheck="false" 
                            required 
                            step="any" 
                            autoCapitalize="none" 
                            autoFocus
                        />
                        <button 
                            type="submit" 
                            className="absolute inset-y-0 right-0 mr-2 flex items-center px-2"
                        >
                            <svg 
                                className="h-4 w-4 fill-current dark:text-white" 
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                version="1.1" 
                                id="Capa_1" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 56.966 56.966" 
                                xmlSpace="preserve" 
                                width="512px" 
                                height="512px"
                            >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </form> */}
                </div>
            </div>
        </section>

    );
}



export default HeroSection;
