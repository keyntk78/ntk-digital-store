import React from 'react'

const SectionHeader = ({ title, arrTitle, isTab, activeTab, setActiveTab }) => {
  return (
    <>
      {isTab ? (
        <div className='flex text-[20px] font-semibold pb-4 uppercase gap-8 border-b-2 border-main mb-4'>
          {arrTitle.map((e) => {
            return (
              <span
                key={e.id}
                className={`cursor-pointer ${
                  activeTab === e.id ? 'text-black' : 'opacity-50'
                }`}
                onClick={() => setActiveTab(e.id)}
              >
                {e.name}
              </span>
            )
          })}
        </div>
      ) : (
        <h3 className='text-[20px] font-semibold pb-4 uppercase gap-8 border-b-2 border-main mb-4'>
          {title}
        </h3>
      )}
    </>
  )
}

export default SectionHeader
