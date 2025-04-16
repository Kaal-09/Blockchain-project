import React from "react";

export default function Card() {
    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Title of the event</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M11.1004 3.00208C7.4515 3.00864 5.54073 3.09822 4.31962 4.31931C3.00183 5.63706 3.00183 7.75796 3.00183 11.9997C3.00183 16.2415 3.00183 18.3624 4.31962 19.6801C5.6374 20.9979 7.75836 20.9979 12.0003 20.9979C16.2421 20.9979 18.3631 20.9979 19.6809 19.6801C20.902 18.4591 20.9916 16.5484 20.9982 12.8996" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20.4803 3.51751L14.931 9.0515M20.4803 3.51751C19.9863 3.023 16.6587 3.0691 15.9552 3.0791M20.4803 3.51751C20.9742 4.01202 20.9282 7.34329 20.9182 8.04754" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className="bg-neutral-400 h-0.5 w-full mb-5"></div>
            <div className="flex items-center gap-10 mb-4">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                    <p className="text-xl font-bold">Location: </p>
                </div>
                <div>
                    Lorem ipsum dolor
                </div>
            </div>
            <div className="flex items-center gap-10 mb-4">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                        <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p className="text-xl font-bold">Timings: </p>
                </div>
                <div>
                    7:30 PM IST - 10:30 PM IST
                </div>
            </div>
            <div className="bg-neutral-400 h-0.5 w-full mb-5"></div>
            <p className="text-sm mb-7"><span className="text-xl font-bold"> Description of the event: </span> Dolestiae ad, similique aliquam exercitationem magni fuga numquam, explicabo, sequi maiores laborum ex. Aliquam maiores molestiae quaerat et ratione? Earum, necessitatibus quis voluptates excepturi enim doloribus, accusantium, recusandae nam odio minima maiores dignissimos quidem tempora ducimus?</p>
        </div>
    );
}
