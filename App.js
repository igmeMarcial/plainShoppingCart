/*App create by Igme*/
const d = document;
const w = window;


const closeBtnCart = d.querySelector(".close-btn-cart");
const cartImageLogo = d.getElementById("cart-image-logo-header");
const cartDrawer = d.querySelector(".cartDrawer");

function openCartShopping (e){
    cartDrawer.classList.add("view-cartDrawer")
}
cartImageLogo.addEventListener("click",openCartShopping)
closeBtnCart.addEventListener("click",(e)=>{
    cartDrawer.classList.remove("view-cartDrawer")
})



let totalProducts=[];


//DAta base of products
function allProduct(name,description,quantity,price,url){

    let productAvailable = 
        {
            id:name.toLowerCase(),
            name:name,
            price:price,
            description:description,
            quantity:quantity,
            image:url
        }
        
    totalProducts.push(productAvailable);
    
}
//simulation of dataBase
allProduct("Apple","Presentación 1 kg aprox.",1,50,"./images/img1.png")
allProduct("Grape","Presentación 1 kg aprox.",1,100,"./images/img2.png")
allProduct("Lemon","Presentación 1 kg aprox.",1,40,"./images/img3.png")
allProduct("Tomato","Presentación 1 kg aprox.",1,70,"./images/img4.png")
allProduct("Cherry","Presentación 1 kg aprox.",1,30,"./images/img5.png")
allProduct("Orange","Presentación 1 kg aprox.",1,20,"./images/img7.png")

//console.log(totalProducts)

//Paint of prodcut to document xd
    const productDivContainer = d.getElementById("product-container-available");
    const templateProduct = d.getElementById("template-product-available");
    let producFragment = d.createDocumentFragment();


function paintProductsDocument(){
    totalProducts.forEach((item,index)=>{
        let cloneTemplateProduct = templateProduct.content.cloneNode(true);
        cloneTemplateProduct.querySelector("picture img").setAttribute("src",item.image);
        cloneTemplateProduct.querySelector("picture img").setAttribute("alt",item.name);
        cloneTemplateProduct.querySelector(".product-detail-content .nameProduct").textContent = item.name;
        cloneTemplateProduct.querySelector(".product-detail-content .priceProduct").textContent = item.price + " $";
        cloneTemplateProduct.querySelector(".product-info-content div p").textContent = item.description;
        cloneTemplateProduct.querySelector(".product-item").dataset.fruit=item.id;
        cloneTemplateProduct.querySelector(".add-cart-btn button").dataset.fruitCart=item.id;

        producFragment.appendChild(cloneTemplateProduct);
    })
    productDivContainer.appendChild(producFragment);
}
paintProductsDocument();

//Add to cart shoppping

d.addEventListener("click",(e)=>{
    //console.log(e.target)
    if(e.target.matches(".add-cart-btn button")){
        addProductToCart(e);
    }
    if(e.target.matches(".sub-prod-btn")){

        subtractProduct(e)
    }
    if(e.target.matches(".add-prod-btn")){

        addProduct(e);
    }
    if(e.target.matches(".remove-item-content-cart div")){
        removeProduct(e);
        
    }
})

let addedProducts = [];
function addProductToCart(e){
    
    let productObject =  totalProducts.find(item=>item.id===e.target.dataset.fruitCart);
    let indexProductSelect = addedProducts.findIndex(item=>item.id===e.target.dataset.fruitCart)
    if(indexProductSelect === -1){
        addedProducts.push(productObject)
        cartDrawer.classList.add("view-cartDrawer");
    }else{
        addedProducts[indexProductSelect].quantity++;
        cartDrawer.classList.add("view-cartDrawer");
    }
    paintShoppingCart();
    
    console.log(addedProducts)
}
    const templateAddedProducts = d.getElementById("templateAddedProducts");
    const addedProductsDiv = d.getElementById("articles-select-cart");
    const addedFragement = d.createDocumentFragment();
    const infoNotArticles = d.querySelector(".text-info-not-articles"); 
function paintShoppingCart(){
    addedProductsDiv.textContent="";
    addedProducts.forEach((item)=>{
        //console.log(item)
        infoNotArticles.classList.add("hideDivInfo");
        let cloneTemplateAdded = templateAddedProducts.content.cloneNode(true);
        cloneTemplateAdded.querySelector(".img-content-cart img").setAttribute("src",item.image);
        cloneTemplateAdded.querySelector(".description .name-selected-cart").textContent=item.name;
        cloneTemplateAdded.querySelector(".add-subtract-content  .quantityProduct").textContent=item.quantity;
        cloneTemplateAdded.querySelector(".price-item-cart .priceAll-product").textContent=item.price * item.quantity;

        cloneTemplateAdded.querySelector("#subtractProduct").dataset.id = item.id;
        cloneTemplateAdded.querySelector("#addProduct").dataset.id = item.id;
        cloneTemplateAdded.querySelector("#remove-item-cart").dataset.id = item.id;

        addedFragement.appendChild(cloneTemplateAdded);
        calculeTotalPrice();

    })
    addedProductsDiv.appendChild(addedFragement);
    
    
}
function calculeTotalPrice(){
    const totalPriceProducts = d.getElementById("totalPriceCalcule");
    const calculeTotalPrice = addedProducts.reduce((acc,current)=>acc + current.quantity * current.price,0)
    totalPriceProducts.textContent = calculeTotalPrice;
    
}
function validationShoppingCart(total){
    if(addedProducts.length ===0){
        infoNotArticles.classList.remove("hideDivInfo");
        console.log("no hay productos en el carrito")
        total.textContent = "0.00"
    }
}

function subtractProduct(e){
    let elementBtn = e.target;
    //console.log(elementBtn)
    addedProducts = addedProducts.filter((item)=>{
        if(item.id === e.target.dataset.id){
            if(item.quantity >0){
                item.quantity--;
                /*
                if(item.quantity === 1){
                    return;
                }
                */
                return item;
            }
        }else{
            return item;
        }
    })
    paintShoppingCart();
    //console.log(addedProducts)
}
function addProduct(e){
    let elementBtn = d.querySelector('button[data-id="' + e.target.dataset.id+ '"]');
    addedProducts = addedProducts.map((item)=>{
        if(item.id === e.target.dataset.id){       
            item.quantity ++;
        }
        return item;
    })
    paintShoppingCart();
}

function removeProduct(e){
    let indexProductSelect = addedProducts.findIndex(item=>item.id===e.target.dataset.id)
    addedProducts.splice(indexProductSelect,1)
    paintShoppingCart();   
}

//console.log(addedProducts.length)
const purchaseCompleted = d.getElementById("shoppingFinalized");
const modalView = d.querySelector(".modal-content");
const closeBtnModal =  d.querySelector(".modal-inset .close");

function allPurchaseCompleted(){
    purchaseCompleted.addEventListener("click",(e)=>{
        modalView.style.visibility ="visible"
        cartDrawer.classList.remove("view-cartDrawer")
        w.scrollTo({
            behavior:"smooth",
                top:0
        })
    })
    closeBtnModal.addEventListener("click",(e)=>{
        modalView.style.visibility ="hidden"
    })
}
allPurchaseCompleted();



