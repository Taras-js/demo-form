// document.querySelector('.company__name');
// const dataList = document.getElementById('json-datalist');
// const input = document.getElementById('ajax');
// const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
// const token = "d5b380a8f91d1902eb4b50b39a1e7111a459d70f";
// input.addEventListener('keyup', () => {
//     const options = {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": "Token " + token
//         },
//         body: JSON.stringify({
//             query: input.value,
//             count: 20})
//     }
//     fetch(url, options)
//         .then(response => response.json())
//         .then((result) => {
//             console.log(result)
//             console.log(input.value)
//             let cloneResult = JSON.parse(JSON.stringify(result.suggestions));
//             const option = document.createElement('option')
//
//             cloneResult.forEach(item => {
//
//                 option.value = item.value
//                 dataList.appendChild(option)
//                 input.placeholder = "e.g. datalist"
//                 input.placeholder = "Loading options..."
//             })
//             if(input.value === option.value) {
//                 const briefliCompany = document.querySelector('.company__briefly');
//                 const completeCompany = document.querySelector('.company__complete');
//                 const companyINN =  document.querySelector('.company__INN');
//                 const companyAddress =document.querySelector('.company__address');
//                 const [{...currentCompany}] = cloneResult;
//                 briefliCompany.value = currentCompany.data.name.short_with_opf;
//                 completeCompany.value = currentCompany.data.name.full_with_opf;
//                 companyINN.value = `${currentCompany.data.inn}/${!currentCompany.data.kpp ? 'не имеет' : currentCompany.data.kpp}`;
//                 companyAddress.value = currentCompany.data.address.unrestricted_value;
//
//             }
//             }
//         )
//         .catch(error => console.log("error", error));
// })
//



