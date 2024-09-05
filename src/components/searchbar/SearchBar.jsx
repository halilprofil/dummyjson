import React from 'react'

export const SearchBar = ({ data, filteredData, setFilteredData }) => {


    function searchItem(e) {


        setTimeout(() => {
            const searchValue = e.target.value.toLowerCase();
            console.log(e.target.value);
            const searchedData = data.recipes.filter((x) =>
                x.name.toLowerCase().includes(searchValue)
            );
            console.log(searchedData);
            if (searchedData.length <= 0) {
                
                const messageObj = {
                    name: 'aradığınız ürün bulunamadı...'
                }
                searchedData.push(messageObj);
            }

            setFilteredData(searchedData);

            

            if (searchValue === '') {
                setFilteredData([]);
            }


        }, 3000)



    }

    return (
        <div>
            <input onChange={(e) => searchItem(e)} type='text' placeholder='arama için ürün ismi giriniz.' />
            <div>
                {filteredData ? (filteredData.map(
                    (x) => <div className="searchItem">
                        {x.name}
                    </div>
                )
                ) : <p>aradığınız ürün bulunamadı...</p>}
            </div>

        </div>
    )
}
