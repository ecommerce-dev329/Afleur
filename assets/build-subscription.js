document.addEventListener("DOMContentLoaded", () => {
  const pre_paid_increase = document.querySelectorAll(".pre-paid-increase-icon");
  const pre_paid_input = document.querySelector(".payment-plan-description-pre-paid input");
  const variant = document.querySelector(".main-product-form input[name='id']");
  const variant_item = document.querySelectorAll(".variant-size-item-wrapper");

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
  });
  variant_item.forEach(ele => {
    ele.addEventListener("click", (eve) => {
      if(eve.target.dataset.variant_id) {
        variant.value = eve.target.dataset.variant_id;
      }
    })
  });
  document.querySelectorAll('.section--build-subscription .radio-cover input').forEach(radio=>{
    radio.addEventListener('change',()=>{
      if(radio.closest('.delivery-freq-item')) {
        document.querySelector('.section--build-subscription .payment-plan-item:not(.one-time) input').checked = true;
      } else if(radio.closest('.payment-plan-item')) {
        if(radio.closest('.one-time')) {
          document.querySelector('.section--build-subscription .payment-plan-item:not(.one-time) input').checked = false;
        } else {
          document.querySelectorAll('.section--build-subscription .delivery-freq-item')[0].querySelector('input').checked = true;
        }
      }
    });
  });
});
