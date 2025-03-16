document.addEventListener('DOMContentLoaded',()=> {
    document.querySelectorAll('.addon-item').forEach(item =>{
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        })
    });
})

function getAddOnProduct() {
    const ids = [];
    document.querySelectorAll('.addon-item.selected').forEach(item=>{
        ids.push(item.getAttribute('product_id'));
    });
    return ids;
}