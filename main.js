const model = {
    Drink: function (name, price){
        this.name = name
        this.price = price
    },
    drinkSort : ['Black Tea' , 'Oolong Tea' , 'Baozong Tea' , 'Green Tea' , 'Bubble Milk Tea' , 'Black Tea Latte' , 'Lemon Green' , 'Matcha Latte' ],
    price : [10,20,30,40,50,60,70,80]
}

const view = {
    btnSelect : document.querySelectorAll('#btnSelect'),
    orders : document.querySelector('#orders'),
    index : 1,
    // 飲料html
    renderDrink : function(){
        const drinks = document.querySelector('#drinks')
        const data = controller.CreateData(model.drinkSort, model.price)
        let contents = ''
        data.forEach((drink,index) => {
            contents += 
            `<div>
                <div id="drink" class="card">
                    <div id="drinkCardBody" class="card-body text-center">
                        <p id="drinkName" class="card-text">
                            ${drink.name}
                        </p>
                        <p id="drinkPrice">
                            $${drink.price}
                        </p>
                        <button id="btnSelect" type="button" class="btn btn-circle" data-id="${index}" data-price="${drink.price}"></button>
                    </div>
                </div>
            </div>`
        })
        drinks.innerHTML = contents
    },

    // 選飲料的btn效果
    selectDrink : function(target){
        if (!btnSelect.length){
            target.classList.add('btn-primary')
            return
        }
        
        for (let i = 0; i < btnSelect.length; i++){
            btnSelect[i].classList.remove('btn-primary')
        }
        target.classList.toggle('btn-primary')
    },
    
    //  點飲料
    addOrder : function(){
        const btnIce = document.querySelectorAll('.btnIce')
        const btnSugar = document.querySelectorAll('.btnSugar')

        let drink;
        if (!btnSelect.length) {
            drink = btnSelect
        }else{
            for (let i = 0; i < btnSelect.length; i++) {
                if (btnSelect[i].classList.contains('btn-primary')) {
                    drink = btnSelect[i]
                }
            }
        }
        
        if(!drink){
            alert('請至少選擇一種飲料!')
            return
        }

        let ice;
        for (let i = 0; i < btnIce.length; i++){
            if (btnIce[i].checked) {
                ice = btnIce[i].nextElementSibling.innerHTML
            }
        }
        
        let sugar;
        for (let i = 0; i < btnSugar.length; i++) {
            if (btnSugar[i].checked) {
                sugar = btnSugar[i].nextElementSibling.innerHTML
            }
        }
        
        let orderContents =
            `<div id="order${this.index}" class="order" data-price="${drink.dataset.price}">
                <div id="order" class="card">
                    <div id="orderCardBody" class="card-body">
                        <div>
                            <button id="btnCloseOrder" type="button" class="btn-close" aria-label="Close" data-id="${this.index}"></button>
                        </div>
                        <p class="card-text">
                            <span id="orderName"">${drink.previousElementSibling.previousElementSibling.innerHTML}</span> <br />
                            ${ice} Ice<br />
                            ${sugar} Sugar
                        </p>
                    </div>
                    <div id="orderCardFooter" class="card-footer">
                        $${drink.dataset.price}
                    </div>
                </div>
            </div>`
        this.index ++ ;
        orders.innerHTML += orderContents
    },

    // 刪除訂單
    removeOrder : function(index){
        const order = document.querySelector(`#order${index}`)
        order.remove()
    },

    // 結算訂單
    countOrder : function(){
        const order = document.querySelectorAll('.order')
        let result = 0
        order.forEach(item => result += Number(item.dataset.price))
        alert(`Total amount of drinks：${result}`)
        this.index = 1
        orders.innerHTML = ``
    }
}

const controller = {
    // 建構飲料資料
    CreateData: function (name, price){
        let result = [];
        for (let i = 0; i < name.length; i++) {
            result.push(new model.Drink(name[i], price[i]))
        }
        return result
    },

    // 渲染飲料列表
    showDrink : function(){
        view.renderDrink()
    },

    // 選飲料的btn效果
    addSelectDrink: function (target){
        view.selectDrink(target)
    },

    // 渲染訂單
    showOrder : function(){
        view.addOrder()
    },

    // 刪除訂單
    deleteOrder: function (index){
        view.removeOrder(index)
    },

    // 結算訂單
    showMoney : function(){
        view.countOrder()
    }
}


controller.showDrink()

const section = document.querySelector('#section')
section.addEventListener('click', function (event){
    if (event.target.id === 'drinkCardBody'){
        controller.addSelectDrink(event.target.lastElementChild)
    } else if (event.target.id === 'drinkPrice'){
        controller.addSelectDrink(event.target.nextElementSibling)
    } else if (event.target.id === 'drinkName'){
        controller.addSelectDrink(event.target.nextElementSibling.nextElementSibling)
    } else if (event.target.id === 'btnSelect') {
        controller.addSelectDrink(event.target)
    } else if (event.target.id === 'btnAdd'){
        controller.showOrder()
    } else if (event.target.id === 'btnCloseOrder'){
        controller.deleteOrder(event.target.dataset.id)
    } else if (event.target.id === 'btnCheckOut'){
        controller.showMoney()
    }
})
