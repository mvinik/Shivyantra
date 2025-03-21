import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import './PriceRange.css';

const PriceRange = ({ onChange, onConfirm }) => {
  const [range, setRange] = useState([0, 200000]);

  const handleSliderChange = (values) => {
    setRange(values);
    onChange(values); // Send the values to the parent component
  };

  const handleReset = () => {
    const defaultRange = [0 , 200000];
    setRange(defaultRange);
    onChange(defaultRange); // Reset in the parent component
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(range); // Invoke the onConfirm function passed from the parent
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="price-range-picker">
        <div className="range-values">
          <input
            type="number"
            min={0}
            max={200000}
            value={range[0]}
            onChange={(e) => handleSliderChange([+e.target.value, range[1]])}
          />
          <span className='text-black font-bold mx-4'>To</span>
          <input
            type="number"
            min={0}
            max={200000}
            value={range[1]}
            onChange={(e) => handleSliderChange([range[0], +e.target.value])}
          />
        </div>
        <ReactSlider
          className="slider-container"
          thumbClassName="thumb"
          trackClassName="track"
          min={0}
          max={200000}
          step={100}
          value={range}
          onChange={handleSliderChange}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <div className='flex justify-between gap-5 mb-3'>
        <button
          className="bg-red rounded-lg text-white px-4 py-1 hover:bg-opacity-80 cursor-pointer transition"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="bg-black rounded-lg text-white px-4 py-1 hover:bg-opacity-80 cursor-pointer transition"
          onClick={handleConfirm}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default PriceRange;
