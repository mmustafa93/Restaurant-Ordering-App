import { menuArray } from "/data.js"

const mainEl = document.getElementById('menu')
const addItemBtn = document.getElementsByClassName('add-item')
const orderBtn = document.getElementById('complete-order')
const closeFormBtn = document.getElementById('close-form')
const form = document.getElementById('form')

let i = 0
let j = 0
let k = 0
let totalPrice = 0

document.addEventListener('click', addItem)
document.addEventListener('click', removeItem)
closeFormBtn.addEventListener('click', closeForm)
orderBtn.addEventListener('click', displayCardForm)


function getHtml(){
    let html = ''
    totalPrice = 0
    
    html = menuArray.map(menuItem => {
        return `<div class="item">
                    <img src="${menuItem.img}" />
                    <div class="item-info">
                        <h3 class="food-item">${menuItem.name}</h3>
                        <p class="ingredients">${menuItem.ingredients}</p>
                        <p class="price">$${menuItem.price}</p>
                    </div>
                    <button class="add-item" data-add=${menuItem.name}>+</button>
                </div>                
                `
    }).join('')
    
    mainEl.innerHTML = html
}

getHtml()

function addItem(e){
    if (e.target.dataset.add){
              
       const currentItem = menuArray.filter((menuItem) => {
           return menuItem.name === e.target.dataset.add
       })[0]
       
       totalPrice += currentItem.price
       
       
       
       document.getElementById('order-items').innerHTML += `
                                                        <div class="order-item ${currentItem.name}">
                                                            <div class="remove">
                                                                <h3>${currentItem.name}</h3>
                                                                <button data-remove=${currentItem.name}>remove</button>
                                                            </div>
                                                            <p>$${currentItem.price}</p>
                                                        </div>`
                                                        
                                                        
       
       document.getElementById('total-price').innerHTML = `<h3>Total Price:</h3>
       <p>$${totalPrice}</p>`
       
       document.getElementById('finalize-order').classList.remove('no-display')
       }
}

function removeItem(e){
    
    if (e.target.dataset.remove){
        console.log(e.target.dataset.remove)
        
        
        
       const currentItem = menuArray.filter((menuItem) => {
           return menuItem.name === e.target.dataset.remove
       })[0]
       
       
       if (currentItem.name === 'Pizza'){
           document.getElementsByClassName(`${currentItem.name}`)[i].innerHTML = ''
           i++
       } 
       else if (currentItem.name === 'Hamburger'){
           document.getElementsByClassName(`${currentItem.name}`)[j].innerHTML = ''
           j++
       }
       else if (currentItem.name === 'Beer'){
           document.getElementsByClassName(`${currentItem.name}`)[k].innerHTML = ''
           k++
       }
       
       if (totalPrice > 0){
           totalPrice -= currentItem.price
       }
       
       document.getElementById('total-price').innerHTML = `<h3>Total Price:</h3>
       <p>$${totalPrice}</p>`
    }
}



function closeForm(){
    document.getElementById('card-form').style.display = 'none'
}


function displayCardForm(){
    document.getElementById('card-form').style.display = 'block'
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const fullName = formData.get('fullName')
    closeForm()
    
    document.getElementById('order-items').innerHTML = ''
    document.getElementById('total-price').innerHTML = ''
    document.getElementById('finalize-order').classList.add('no-display')
    document.getElementById('post-order-message').innerHTML = `<p class="final-message">Thanks ${fullName}! Your order is on its way!</p>`
    setTimeout(placeAnotherOrder, 3000)
})


function placeAnotherOrder(){
    document.getElementById('post-order-message').innerHTML = ''
    getHtml()
}