const myFormat = document.createElement('my-format');
document.body.insertAdjacentElement('afterbegin', myFormat);

customElements.define("my-format", class MyFormat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = `
        <form id="formShadow" class="demo-form">
            <fieldset class="wrapper">
                <legend><strong>Подсказки по организациям</strong></legend>
                <label><strong>Компания или ИП</strong> <br>
                    <input onclick="this.value=''" type="text" id="ajax" list="json-datalist" class="company__name" placeholder="введите название организации" autofocus>
                    <datalist id="json-datalist">
                        <slot id="option" name="option"></slot>
                    </datalist>
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
        <style>
        .demo-form {
            max-width: 600px;
            min-width: 320px;
            margin: 0 auto;
            background-color: aqua;
            border-radius: 5px;
        }
        .wrapper {
            display: grid;
            font-size: 30px;
        }
        input {
            display: block;
            height: 40px;
            min-width: 450px;
            border-radius: 5px;
            background-color: yellow;
            color: black;
            font-size: 20px;
        }
        ::placeholder{
            color: black;
            font-size: 16px;
        }
        legend:hover, label:hover{
            color: red;
            font-weight: bold;
        }
        @media screen and (min-width: 320px) and (max-width: 500px) {
            input {
                min-width: 250px;
            }
        }
        </style>`
    }
        connectedCallback() {
            this.shadowRoot.innerHTML
            if(!this.rendered){
                this.companySearch()
                this.rendered = true;
            }
        }
        companySearch() {
                const input = this.shadowRoot.getElementById('ajax')
                input.addEventListener('keyup', () => {
                const dataList = this.shadowRoot.getElementById('json-datalist');
                const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
                const token = "d5b380a8f91d1902eb4b50b39a1e7111a459d70f";
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
                            newArray.forEach(item => {
                                const option = document.createElement('option')
                                option.setAttribute("slot", "option");
                                option.value = item
                                dataList.appendChild(option)
                                input.placeholder = "Название компании"
                                input.placeholder = "Загрузка..."
                                if(input.value === option.value) {
                                    const briefliCompany = this.shadowRoot.querySelector('.company__briefly');
                                    const completeCompany = this.shadowRoot.querySelector('.company__complete');
                                    const companyINN =  this.shadowRoot.querySelector('.company__INN');
                                    const companyAddress = this.shadowRoot.querySelector('.company__address');
                                    const [{...currentCompany}] = cloneResult;
                                    briefliCompany.value = currentCompany.data.name.short_with_opf;
                                    completeCompany.value = currentCompany.data.name.full_with_opf;
                                    companyINN.value = `${currentCompany.data.inn}/${!currentCompany.data.kpp ? 'не имеет' : currentCompany.data.kpp}`;
                                    companyAddress.value = currentCompany.data.address.unrestricted_value;
                                    this.connectedCallback()
                                }
                            })
                        }
                    )
                    .catch(error => console.log("error", error));
            })
        }
    }
);

