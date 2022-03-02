class MyForm extends HTMLElement {
    // constructor() {
    //     super();
    //     // элемент создан
    // }
    render(){
        this.innerHTML = `
        <form class="demo-form">
        <fieldset class="wrapper">
            <legend><strong>Подсказки по организациям</strong></legend>
        <label><strong>Компания или ИП</strong> <br>
            <input type="text" id="ajax" list="json-datalist" class="company__name" placeholder="введите название организации" autofocus>
            <datalist id="json-datalist"></datalist>
            Организация (LEGAL)
        </label>
        <hr>
        <label>Краткое наименование<br>
            <input type="text" class="company__briefly" >
        </label>
        <hr>
        <label>Полное наименование<br>
            <input type="text" class="company__complete">
        </label>
        <hr>
        <label>ИНН/КПП<br>
            <input type="text" class="company__INN">
        </label>
        <hr>
        <label>Адрес<br>
            <input type="text" class="company__address">
        </label>
        </fieldset>
    </form>
        `

    }
    connectedCallback() {
        if(!this.rendered){
            this.render();
            this.companySearch()
            this.rendered = true;
        }
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    // static get observedAttributes() {
    //     return [/* массив имён атрибутов для отслеживания их изменений */];
    // }

    attributeChangedCallback(name, oldValue, newValue) {
        // вызывается при изменении одного из перечисленных выше атрибутов
    }
    companySearch() {
        document.querySelector('.company__name');
        const dataList = document.getElementById('json-datalist');
        const input = document.getElementById('ajax');
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
        const token = "d5b380a8f91d1902eb4b50b39a1e7111a459d70f";
        input.addEventListener('keyup', () => {
            const options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({
                    query: input.value,
                    count: 20})
            }
            fetch(url, options)
                .then(response => response.json())
                .then((result) => {


                        let cloneResult = JSON.parse(JSON.stringify(result.suggestions));
                        const newArray = cloneResult.map(item=> item.unrestricted_value)

                        console.log(newArray)
                        newArray.forEach(item => {
                            const option = document.createElement('option')
                            option.value = item
                            dataList.appendChild(option)
                            input.placeholder = "e.g. datalist"
                            input.placeholder = "Loading options..."
                            if(input.value === option.value) {
                                const briefliCompany = document.querySelector('.company__briefly');
                                const completeCompany = document.querySelector('.company__complete');
                                const companyINN =  document.querySelector('.company__INN');
                                const companyAddress =document.querySelector('.company__address');
                                const [{...currentCompany}] = cloneResult;
                                briefliCompany.value = currentCompany.data.name.short_with_opf;
                                completeCompany.value = currentCompany.data.name.full_with_opf;
                                companyINN.value = `${currentCompany.data.inn}/${!currentCompany.data.kpp ? 'не имеет' : currentCompany.data.kpp}`;
                                companyAddress.value = currentCompany.data.address.unrestricted_value;
                                return  option.closest
                            }

                        })

                    }
                )
                .catch(error => console.log("error", error));
        })

    }

}

customElements.define("my-form", MyForm);