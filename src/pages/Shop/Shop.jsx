

import React, { useEffect, useState, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card/Card';
import FilterBar from '../../components/FilterBar/FilterBar';
import Loading from '../../components/Loading/Loading';
import api from '../../Utils/api';
import TechError from '../Error/TechError';

const Shop = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryFromQuery = queryParams.get('category');
  const searchFromQuery = queryParams.get('search');

  const [selectedFilters, setSelectedFilters] = useState({
    material: '',
    price: '',
    category: '',
  });
  const [selectedSort, setSortCategory] = useState('Default');
  const itemsPerPage = 24;
  const observerRef = useRef(null);

  const fetchProducts = async ({ pageParam = 1 }) => {
    const filters = {
      ...(selectedFilters.material && { 'filters[Material]': selectedFilters.material }),
      ...(selectedFilters.category && { 'filters[category][CategoryName]': selectedFilters.category }),
      ...(selectedFilters.price && {
        'filters[Price][$gte]': selectedFilters.price[0],
        'filters[Price][$lte]': selectedFilters.price[1],
      }),
      ...(searchFromQuery && { 'filters[ProductName][$containsi]': searchFromQuery }),
    };

    const sorting = {
      'Price: Low to High': 'Price:asc',
      'Price: High to Low': 'Price:desc',
      'Alphabetically, A-Z': 'ProductName:asc',
      'Alphabetically, Z-A': 'ProductName:desc',
      'Latest': 'createdAt:desc',
    };

    const query = new URLSearchParams({
      ...filters,
      ...(selectedSort !== 'Default' && { sort: sorting[selectedSort] }),
      populate: '*',
      'pagination[page]': pageParam,
      'pagination[pageSize]': itemsPerPage,
    });

    const res = await api.get(`/api/Products?${query.toString()}`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(['Products', selectedFilters, selectedSort], fetchProducts, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage?.meta?.pagination?.page + 1;
      return nextPage <= lastPage?.meta?.pagination?.pageCount ? nextPage : undefined;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        category: categoryFromQuery,
      }));
    }
    if (searchFromQuery) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        search: searchFromQuery,
      }));
    }
  }, [categoryFromQuery, searchFromQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;
  if (isError) return <TechError />;

  return (
    <section>
      <FilterBar
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectedSort={selectedSort}
        setSortCategory={setSortCategory}
      />
      {data?.pages?.[0]?.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-2 sm:gap-3 p-3 lg:px-10">
            {data.pages.flatMap((page) =>
              page.data.map((product) => (
                <div className="sm:p-2" key={product.id}>
                  <Card product={product} />
                </div>
              ))
            )}
          </div>
          <div ref={observerRef} className="h-10" />
        </>
      ) : (
        <div className="text-center p-16">
          <h2 className="text-gray font-bold text-2xl">No products found matching your filters</h2>
        </div>
      )}
    </section>
  );
};

export default Shop;
