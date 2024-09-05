import React from 'react'

export const SearchBar = ({ data, filteredData,setFilteredData,setLoading }) => {
    


    function searchItem(e) {
setLoading(true)
        setTimeout(() => {
            const searchValue = e.target.value.toLowerCase();
            console.log(e.target.value);
            
            const searchedData = data.filter((x) =>
                x.name.toLowerCase().includes(searchValue)
            );
            setFilteredData([...searchedData]);

            if (searchValue === '') {
                setFilteredData([...data]);
            }
            setLoading(false)

        }, 1000)


    }

    return (
        <div className='searchbar-container'>
          <p><input onChange={(e) => searchItem(e)} type='text' placeholder='arama için ürün ismi giriniz.' /></p>  


        </div>
    )
}
