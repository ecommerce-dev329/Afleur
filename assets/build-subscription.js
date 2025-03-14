document.addEventListener("DOMContentLoaded", () => {
  const pre_paid_increase = document.querySelectorAll(".pre-paid-increase-icon");
  const pre_paid_input = document.querySelector(".payment-plan-description-pre-paid input");

  pre_paid_increase.forEach(ele => {
    ele.addEventListener("click", (event) => {
      let pre_paid_value = parseInt(pre_paid_input.value);
      if(pre_paid_value <= 0 || pre_paid_value > 100) {
        return;
      }
      if(event.target.classList.contains("pre-paid-minus")) {
        pre_paid_value --;
      } else {
        pre_paid_value ++;
      }
      pre_paid_input.value = pre_paid_value;
    });
  })
});


document.addEventListener('DOMContentLoaded', () => {
  const buyBox = document.querySelector('.buy-box');
  if (buyBox) {
    document.querySelector('.quick-buy-drawer')?.remove();
    const updateATCButton = (price,discountedPrice,quantity) => {
      const atcButton = document.querySelector('.shopify-section--featured-product .buy-buttons div');
      if(atcButton) {
        const fixedPrice = ((price / 100) * quantity).toFixed(2);
        if(discountedPrice) {
          const fixedDiscountPrice = ((discountedPrice / 100) * quantity).toFixed(2);
          atcButton.innerHTML = `Add to cart - <span>$${fixedPrice}</span> $${fixedDiscountPrice}`;
        } else {
          atcButton.innerHTML = `Add to cart - $${fixedPrice}`;
        }
      }
    }


    const quantitySelector = buyBox.querySelectorAll('.quantity');
    const quantityLabel = buyBox.querySelector('.quantity-label');
    const subscriptionRadios = buyBox.querySelectorAll('.subscription input');
    let quantityValue = 1;
    let message = '';
    const currentPrice = parseInt(buyBox.querySelector('.one-time-purchase .price').getAttribute('v'));
    const discountedPrice = parseInt(buyBox.querySelector('.subscription .price').getAttribute('v'));
    const subscriptionMainLabel = buyBox.querySelector('.subscription .main .label');
    updateATCButton(currentPrice,0,1);
    quantitySelector.forEach(quantity => {
      quantity.addEventListener('click', () => {
        if (quantity.classList.contains("max")) {
          quantityLabel.classList.add('show');
        } else {
          quantityLabel.classList.remove('show');
        }
        quantityValue = parseInt(quantity.getAttribute('v'));
        if(message !== '') {
          updateATCButton(currentPrice,discountedPrice,quantityValue);
        } else {
          updateATCButton(currentPrice,0,quantityValue);
        }
      });
    });
    buyBox.querySelectorAll('.purchase-option').forEach(radio=>{
      radio.closest('label')?.addEventListener('click',()=>{
        let isSubscriptionChecked = false;
        for (const subscriptionRadioItem of subscriptionRadios) {
          if(subscriptionRadioItem.checked) {
            message = subscriptionRadioItem.closest('label').innerText.trim();

            isSubscriptionChecked = true;
            updateATCButton(currentPrice,discountedPrice,quantityValue);
            break;
          }
        }
        if(!isSubscriptionChecked) {
          updateATCButton(currentPrice,0,quantityValue)
          message = '';
        }
      });
    });
    subscriptionMainLabel.addEventListener('click',()=>{
      if(message === '') {
        subscriptionRadios[0]?.click();
      }
    });
    if(performance && performance.navigation) {
      if(performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
        let hTime = setInterval(()=>{
          clearInterval(hTime);
          buyBox.querySelector('.quantity:has(input:checked)')?.click();
          buyBox.querySelector('input.purchase-option:checked')?.closest('label')?.click();
        },1000);
      } else {
        subscriptionMainLabel.click();
      }
    }
  }
});


const getQuantity = () => {
  const currentQuantity = parseInt(document.querySelector('.buy-box .quantity:has(input:checked)').getAttribute('v'));
  return isNaN(currentQuantity)?-1:currentQuantity;
}