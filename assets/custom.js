document.addEventListener('DOMContentLoaded',()=>{
    let hTime = setInterval(()=>{
        const deliveryLabel = document.querySelector('.odd_calender_heading');
        if(deliveryLabel) {
            clearInterval(hTime);
            deliveryLabel.style.display = 'none';
            deliveryLabel.innerHTML = 'abc';
            console.log(deliveryLabel);
            hTime = setInterval(() => {
                clearInterval(hTime);
                deliveryLabel.innerHTML = 'Delivery Date:';
                deliveryLabel.style.display = '';
            }, 600);
        }
    })
});