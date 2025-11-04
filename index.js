const new_item_form = document.getElementById("add-item-form")
const shopping_list = document.getElementById("shopping-list")
const cart_total = document.getElementById("cart-total")
const shopping_cart = document.getElementById("shopping-cart")

let item_id = 1
cart_total_sum = 0

cart_total.innerHTML = `$ ${cart_total_sum}`

new_item_form.addEventListener('submit' , function(event){
    event.preventDefault()
    const new_item = document.getElementById("new-item").value
    const new_item_price = document.getElementById("new-item-price").value 

    if(new_item !== '' && new_item_price !==''){

        const newProduct = document.createElement('li');
        newProduct.dataset.id = item_id
        newProduct.dataset.value = new_item
        newProduct.dataset.price = new_item_price
        newProduct.dataset.quantity = 1
        newProduct.classList.add('list-item')
        
        
        newProduct.innerHTML = `<p># ${item_id} </p> \
                            <p> ${new_item} </p> \
                            <div class="quantity--wrapper"> \
                            <input id="item-${item_id}-quantity-int" type="number" min="1" max="10" value=${1} placeholder=${1}>.qty \
                            <button type="click" id="add-item-to-cart--btn" class="add-to-cart">Add to cart </button> \
                            </div>`
   
                            shopping_list.appendChild(newProduct);
                            item_id++
    }else(
        alert("Please add a complete item list!")
    )
})

shopping_list.addEventListener('click' , function(event){
    if(event.target.classList.contains('add-to-cart')){

        const product = event.target.closest('li').dataset;
        const newProduct_inCart = document.createElement('li');
        
        cart_total_sum += product.price * product.quantity
        newProduct_inCart.dataset.id = product.id
        newProduct_inCart.dataset.value = product.value
        newProduct_inCart.dataset.price = product.price
        newProduct_inCart.dataset.quantity = product.quantity
        newProduct_inCart.dataset.currprice = (product.price * product.quantity).toFixed(2)
        newProduct_inCart.classList.add('list-item')
        
   
        
        newProduct_inCart.innerHTML = `<div> ${product.value} </div> \
        <div class="list-item cart-item"> \
        count: ${product.quantity} \
        <div id="edit-${newProduct_inCart.dataset.id}-qty--wrapper" class="edit-wrapper">
        <button type="submit" class="edit-wrapper">
        
        edit qty
        </button>
        </div>
        <div id="price-${newProduct_inCart.dataset.id}" >
         total $ : ${product.price * product.quantity}
        </div>
        </div>`
        shopping_cart.appendChild(newProduct_inCart);
        cart_total.innerHTML = `$ ${cart_total_sum.toFixed(2)}`
    }
    
    
})

shopping_list.addEventListener('change' , function(event){
    const product = event.target.closest('li');
    product.dataset.quantity = event.target.value
})

shopping_cart.addEventListener('click', function(event){
    if(event.target.classList.contains('edit-wrapper')){
        const curr_product = event.target.closest('li');
        const edit_qty_wrapper = document.getElementById(`edit-${curr_product.dataset.id}-qty--wrapper`)
        const newContent = document.createElement('div');
        
        const edit_price_wrapper = document.getElementById(`price-${curr_product.dataset.id}`)
        const pricePH = document.createElement('div');
        
        cart_total_sum -= curr_product.dataset.currprice
        curr_product.dataset.currprice -= curr_product.dataset.currprice
        
        cart_total.innerHTML = `$ ${cart_total_sum.toFixed(2)}`
        newContent.innerHTML = `<div class="quantity--wrapper"> \
        <input id="item-${curr_product.dataset.id}-quantity-int" type="number" min="0" max="10" value=${curr_product.dataset.quantity} placeholder=${curr_product.dataset.quantity}>.qty \
        <button type="click" id="add-item-to-cart--btn" class="update-cart">Update cart </button> \
        </div>`;
        
        
        pricePH.innerHTML = `<div id="price-${curr_product.dataset.id}" >
        total $ : --.--
        </div>`
        
        edit_qty_wrapper.replaceWith(newContent)
        edit_price_wrapper.replaceWith(pricePH)
        
    }
    if(event.target.classList.contains('update-cart')){
        const curr_product = event.target.closest('li');
        
        console.log(curr_product.dataset)
        curr_product.dataset.currprice += (curr_product.dataset.quantity * curr_product.dataset.price).toFixed(2)
        if(curr_product.dataset.quantity == 0){
            curr_product.remove()
        }else if(curr_product.dataset.quantity > 0){
    
        
        const copy_product = curr_product.cloneNode(true)
        copy_product.dataset.quantity = curr_product.dataset.quantity
        
        cart_total_sum += copy_product.dataset.price * copy_product.dataset.quantity
        cart_total.innerHTML = `$ ${cart_total_sum.toFixed(2)}`

        const updatedProduct_inCart = copy_product;
        updatedProduct_inCart.innerHTML = `<div> ${copy_product.dataset.value} </div> \
        <div> \
        count: ${copy_product.dataset.quantity} \
        <div id="edit-${updatedProduct_inCart.dataset.id}-qty--wrapper" class="edit-wrapper">
        <button type="submit" class="edit-wrapper">
        
        edit qty
        </button>
        </div>
        <div id="price-${updatedProduct_inCart.dataset.id}" >
        total $ : ${(copy_product.dataset.price * copy_product.dataset.quantity).toFixed(2)}
        </div>
        </div>`
        shopping_cart.appendChild(updatedProduct_inCart);
        curr_product.remove()

                
        }

    }

    
})

shopping_cart.addEventListener('change' , function(event){
    const product = event.target.closest('li');
    product.dataset.quantity = event.target.value
})
